
import Link from "next/link";

type Tweet = {
  _id: string;
  content: string;
  author: string;
  upvotes?: number;
  downvotes?: number;
};

type TweetCardProps = {
  tweet: Tweet;
};

export default function TweetCard({ tweet }: TweetCardProps) {
  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <h3 className="mb-2 font-semibold">{tweet.author}</h3>

      <p className="mb-4">{tweet.content}</p>

      <div className="mb-3 flex gap-4 text-sm text-gray-600">
        <span>👍 {tweet.upvotes ?? 0}</span>
        <span>👎 {tweet.downvotes ?? 0}</span>
      </div>

      <Link
        href={`/tweet/${tweet._id}`}
        className="text-blue-600 hover:underline"
      >
        View Post
      </Link>
    </div>
  );
}
