import React, { useEffect, useState } from "react";
import { fetchEmails } from "../apiService"; // FIXED path

function EmailList() {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmails()
      .then(setEmails)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Email List</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <ul>
        {emails.map((email, idx) => (
          <li key={idx}>{email.subject}</li>
        ))}
      </ul>
    </div>
  );
}

export default EmailList;
