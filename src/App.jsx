import React, { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input) return;
    setLoading(true);
    setResponse("Thinking...");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are a helpful medical assistant. Be safe and always suggest seeing a doctor when necessary." },
            { role: "user", content: input }
          ]
        })
      });
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "No response";
      setResponse(text);
    } catch (e) {
      setResponse("Error getting response.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>AI Medical Assistant</h2>
      <textarea
        rows="4"
        style={{ width: "100%", marginBottom: 10 }}
        placeholder="Describe your medical problem..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Ask AI"}
      </button>
      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{response}</pre>
    </div>
  );
};

export default App;
