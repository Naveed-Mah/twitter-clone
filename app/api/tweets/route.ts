
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Tweet from "@/models/Tweet";


// GET: Load all tweets from MongoDB
export async function GET() {
  try {
    await connectDB();

    const tweets = await Tweet.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(tweets);
  } catch (error) {
    console.error("GET tweets error:", error);
    return NextResponse.json(
      { message: "Could not load tweets" },
      { status: 500 }
    );
  }
}

// POST: Create and save a new tweet
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { content, author } = body;

    if (
      typeof content !== "string" ||
      content.trim().length === 0 ||
      typeof author !== "string" ||
      author.trim().length === 0
    ) {
      return NextResponse.json(
        { message: "Content and author are required" },
        { status: 400 }
      );
    }

    const tweet = await Tweet.create({
      content: content.trim(),
      author: author.trim(),
    });

    return NextResponse.json(tweet, { status: 201 });
  } catch (error) {
    console.error("POST tweet error:", error);
    return NextResponse.json(
      { message: "Could not create tweet" },
      { status: 500 }
    );
  }
}
