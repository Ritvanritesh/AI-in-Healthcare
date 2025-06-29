import React, { useState } from "react";

const MedicalAIChat = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askMedicalAI = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a helpful and knowledgeable AI medical assistant. Give reliable and safe advice for medical concerns. Avoid diagnosing; always recommend seeing a doctor when needed.",
            },
            {
              role: "user",
              content: question,
            },
          ],
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "No answer found.";
      setAnswer(reply);
    } catch (err) {
      console.error(err);
      setAnswer("Error retrieving response. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-10 px-4 sm:px-8">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-900">AI Medical Assistant</h1>
      <div className="max-w-3xl mx-auto p-4 shadow-xl bg-white rounded-xl">
        <label className="block mb-2 text-lg font-medium text-gray-700">
          Enter your medical concern:
        </label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="e.g., I have a sore throat and fever for two days"
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
          onClick={askMedicalAI}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Get Advice"}
        </button>

        {answer && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-green-700 mb-2">AI Response:</h2>
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 whitespace-pre-wrap">
              {answer}
            </div>
          </div>
        )}
      </div>
      <p className="text-center text-sm text-gray-500 mt-8">
        ⚠️ This is not a substitute for professional medical advice.
      </p>
    </div>
  );
};

export default MedicalAIChat;
