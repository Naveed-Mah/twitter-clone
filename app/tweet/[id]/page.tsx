
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Tweet from "@/models/Tweet";
export const instant = false;
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function TweetPage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();

  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    notFound();
  }

  const tweet = await Tweet.findById(id).lean();

  if (!tweet) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Tweet Details</h1>

      <div className="rounded-lg border p-5 shadow-sm">
        <h2 className="mb-3 font-semibold">
          {tweet.author}
        </h2>

        <p className="mb-4">{tweet.content}</p>

        <div className="text-sm text-gray-500">
          👍 {tweet.upvotes ?? 0} 
          {" "} | {" "}
          👎 {tweet.downvotes ?? 0}
        </div>
      </div>
    </main>
  );
}
