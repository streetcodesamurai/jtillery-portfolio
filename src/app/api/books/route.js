import clientPromise from "@/lib/mongodb";

export async function GET(){

    try {
        const client = await clientPromise;
        const db = client.db('Jay_Tillery_Portfolio');
        const books = await db.collection('books').find({}).toArray();

        return Response.json(books);
    
    } catch (error) {
        console.error('Error fetching books: ', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}