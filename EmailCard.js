import React from "react";

const EmailCard = ({ email }) => (
  <div className="card mb-2 shadow-sm p-3">
    <h5>{email.subject || "No Subject"}</h5>
    <p><strong>From:</strong> {email.from}</p>
    <p>{email.text?.slice(0, 100)}...</p>
  </div>
);

export default EmailCard;
