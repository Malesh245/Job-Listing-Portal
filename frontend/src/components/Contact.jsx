import React from "react";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-2">Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-2">Message</label>
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
