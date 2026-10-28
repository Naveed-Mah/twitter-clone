
"use client";

import { useState } from "react";

export default function Home() {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState([
    {
      name: "Alex Morgan",
      username: "@alexmorgan",
      text: "Welcome to my Twitter Clone! 👋 Happy to connect with everyone.",
      time: "2 min ago",
    },
    {
      name: "Sarah Lee",
      username: "@sarahlee",
      text: "Learning, building, and growing every day! 🚀",
      time: "10 min ago",
    },
    {
      name: "David Chen",
      username: "@davidchen",
      text: "What are you working on today? Let's share ideas! 💻",
      time: "25 min ago",
    },
  ]);

  function handlePost() {
    if (!newPost.trim()) return;

    setPosts([
      {
        name: "You",
        username: "@you",
        text: newPost.trim(),
        time: "Just now",
      },
      ...posts,
    ]);

    setNewPost("");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-gray-900">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-blue-500">
          Twitter Clone
        </h1>

        <p className="mb-8 text-gray-600">
          Connect with people and share what's happening.
        </p>

        <div className="mb-6 rounded-xl bg-white p-5 shadow">
          <h2 className="mb-3 text-xl font-bold">What's happening?</h2>

          <textarea
            value={newPost}
            onChange={(event) => setNewPost(event.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3"
            placeholder="Share your thoughts with the world..."
            rows={3}
          />

          <button
            type="button"
            onClick={handlePost}
            className="mt-3 rounded-full bg-blue-500 px-6 py-2 font-bold text-white hover:bg-blue-600"
          >
            Post
          </button>
        </div>

        <h2 className="mb-4 text-xl font-bold">Latest Posts</h2>

        <div className="space-y-4">
          {posts.map((post, index) => (
            <article
              key={`${post.username}-${index}`}
              className="rounded-xl bg-white p-5 shadow"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                  {post.name[0]}
                </div>

                <div>
                  <p className="font-bold">{post.name}</p>
                  <p className="text-sm text-gray-500">
                    {post.username} · {post.time}
                  </p>
                </div>
              </div>

              <p className="leading-7">{post.text}</p>

              <div className="mt-4 flex justify-between border-t pt-3 text-sm text-gray-500">
                <span>♡ Like</span>
                <span>💬 Comment</span>
                <span>↗ Share</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
