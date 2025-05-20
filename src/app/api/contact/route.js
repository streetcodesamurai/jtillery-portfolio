import { NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(request) {
  const { name, email, message } = await request.json();

  const htmlBody = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0;">
      <h2 style="color: #222; font-size: 24px; margin-bottom: 16px;">📬 New Contact Form Submission</h2>
      <p style="font-size: 16px; line-height: 1.5;"><strong>Name:</strong> ${name}</p>
      <p style="font-size: 16px; line-height: 1.5;"><strong>Email:</strong> ${email}</p>
      <p style="font-size: 16px; line-height: 1.5; margin-top: 24px;"><strong>Message:</strong></p>
      <blockquote style="font-size: 16px; line-height: 1.6; color: #444; border-left: 4px solid #ccc; padding-left: 12px; margin: 8px 0;">
        ${message.replace(/\n/g, '<br>')}
      </blockquote>
      <footer style="margin-top: 32px; font-size: 13px; color: #999;">
        Sent from your portfolio contact form.
      </footer>
    </div>
  `;

  const params = {
    Destination: {
      ToAddresses: [process.env.SES_TO_EMAIL],
    },
    Message: {
      Body: {
        Html: { Charset: 'UTF-8', Data: htmlBody },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `New Contact from ${name}`,
      },
    },
    Source: process.env.SES_FROM_EMAIL,
    ReplyToAddresses: [email],
  };

  try {
    await ses.send(new SendEmailCommand(params));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('SES Email Error:', error);
    return NextResponse.json(
      { success: false, error: 'Email failed to send' },
      { status: 500 }
    );
  }
}