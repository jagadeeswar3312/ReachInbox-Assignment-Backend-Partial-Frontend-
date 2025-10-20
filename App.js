import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import EmailList from "./components/EmailList";
import AnalyzePanel from "./components/AnalyzePanel";

function App() {
  return (
    <div className="App container mt-5">
      <h2 className="mb-4 text-center">AI-Powered Email Automation Dashboard</h2>
      <EmailList />
      <AnalyzePanel />
    </div>
  );
}

export default App;
