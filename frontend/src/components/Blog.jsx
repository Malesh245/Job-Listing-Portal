import React from "react";

const Blog = () => {
  const blogPosts = [
    {
      title: "Post 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Post 2",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    // Add more blog posts here
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <div className="space-y-6">
        {blogPosts.map((post, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
