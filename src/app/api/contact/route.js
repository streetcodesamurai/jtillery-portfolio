import { NextResponse } from 'next/server';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request) {
  const { name, email, message } = await request.json();

  try {
    await sendgrid.send({
        to: process.env.SENDGRID_TO_EMAIL,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: `New Contact from ${name}`,
        html: `
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
        `,
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error.response?.body || error.message);
    return NextResponse.json(
      { success: false, error: 'Email failed to send' },
      { status: 500 }
    );
  }
}