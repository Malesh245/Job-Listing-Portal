import React from "react";

const FAQs = () => {
  const faqs = [
    {
      question: "How to post a job?",
      answer:
        "To post a job, go to the 'Post a Job' page and fill out the necessary details.",
    },
    {
      question: "How to apply for a job?",
      answer:
        "To apply for a job, browse through the job listings and click on the 'Apply' button for the job you're interested in.",
    },
    // Add more FAQs here
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
