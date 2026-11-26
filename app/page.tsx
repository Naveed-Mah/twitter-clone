
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Tweet = {
  _id: string;
  content: string;
  author: string;
  upvotes: number;
  downvotes: number;
};

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function getTweets() {
    try {
      const response = await fetch("/api/tweets");

      if (!response.ok) {
        throw new Error("Could not load tweets");
      }

      const data = await response.json();
      setTweets(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void getTweets();
  }, []);

  async function createTweet() {
    if (!content.trim()) return;

    setSaving(true);

    try {
      const response = await fetch("/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          author: "Test User",
        }),
      });

      if (!response.ok) {
        throw new Error("Could not create tweet");
      }

      setContent("");
      await getTweets();
    } catch (error) {
      console.error(error);
      alert("Could not save your tweet. Check the terminal.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-2xl border-x">
      <header className="border-b p-5">
        <h1 className="text-2xl font-bold">Twitter Clone</h1>
        <p className="text-sm text-gray-500">Your daily feed</p>
      </header>

      <section className="border-b p-5">
        <h2 className="mb-3 font-bold">Create a tweet</h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
          className="w-full rounded-lg border p-3"
          rows={3}
        />

        <button
          onClick={createTweet}
          disabled={saving || !content.trim()}
          className="mt-3 rounded-full bg-blue-500 px-5 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Posting..." : "Post Tweet"}
        </button>
      </section>

      {loading && <p className="p-5">Loading tweets...</p>}

      {!loading && tweets.length === 0 && (
        <p className="p-5">No tweets found. Create your first tweet!</p>
      )}

      {tweets.map((tweet) => (
        <article key={tweet._id} className="border-b p-5">
          <p className="mb-2 text-sm text-gray-500">
            {tweet.author}
          </p>

          <p className="my-3">{tweet.content}</p>

          <p className="mb-3 text-sm text-gray-500">
            👍 {tweet.upvotes} | 👎 {tweet.downvotes}
          </p>

          <Link
            href={`/tweet/${tweet._id}`}
            className="text-blue-500 hover:underline"
          >
            View post
          </Link>
        </article>
      ))}
    </main>
  );
}
