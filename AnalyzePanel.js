import React, { useState } from "react";
import { analyzeEmails } from "../services/apiService";

const AnalyzePanel = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    const res = await analyzeEmails(webhookUrl);
    setResult(res.message);
  };

  return (
    <div className="p-4 bg-light border rounded mt-4">
      <h5>Email Analysis</h5>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Enter Webhook URL"
        value={webhookUrl}
        onChange={e => setWebhookUrl(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleAnalyze}>
        Analyze and Send
      </button>
      {result && <p className="text-success mt-3">{result}</p>}
    </div>
  );
};

export default AnalyzePanel;
