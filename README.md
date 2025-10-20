📬 ReachInbox Assignment (Backend + Partial Frontend)
🚀 Project Overview

This project is a simplified version of an email management and automation system, inspired by tools like ReachInbox.
It allows users to connect their email account, fetch messages via IMAP, and interact with OpenAI APIs to analyze or automate responses.

The backend has been built using Node.js, Express.js, and TypeScript, while Postman and cURL are used for API testing.
I also started developing a basic frontend to visualize the fetched emails, but it’s still in progress.

🎯 Objectives of the Assignment

Implement IMAP email fetching from Gmail.

Connect with OpenAI API for content processing.

Handle user authentication and routing using Express.

Test API functionality with Postman and cURL.

(Bonus) Begin frontend UI for future integration.

🧠 Key Features

✅ Fetch emails from Gmail via IMAP
✅ Process message data and organize it into a clean JSON format
✅ Secure environment variable configuration
✅ Postman and cURL tested endpoints
✅ Partial frontend setup for displaying fetched data

🏗️ Tech Stack Used
Category	Technology
Backend	Node.js, Express.js, TypeScript
Database	(Planned: SQLite or MongoDB)
Frontend	React (Partially built)
Testing Tools	Postman, cURL
External APIs	OpenAI GPT API
Email Integration	Gmail IMAP
⚙️ Environment Variables (.env)

Before running the server, create a .env file in your root directory:

IMAP_HOST=imap.gmail.com
IMAP_PORT=993
IMAP_USER=your_email@gmail.com
IMAP_PASSWORD=your_app_password

OPENAI_API_KEY=your_openai_api_key


Make sure you enable "App Password" in Gmail before using it here.

🧩 Folder Structure
reachinbox-assignment/
│
├── src/
│   ├── index.ts            # Entry point
│   ├── routes/
│   │   └── emailRoutes.ts  # API endpoints
│   ├── services/
│   │   └── imapService.ts  # Handles IMAP logic
│   ├── controllers/
│   │   └── emailController.ts # Request logic
│   ├── utils/
│   │   └── openaiUtils.ts  # OpenAI request handler
│   └── frontend/           # Partial React setup
│
├── package.json
├── tsconfig.json
├── .env
└── README.md

🔍 How to Run the Project
1️⃣ Install Dependencies
npm install

2️⃣ Run in Development Mode
npm run dev

3️⃣ Test with Postman or cURL

Example (Postman):

GET http://localhost:3000/api/emails


Example (cURL):

curl -X GET http://localhost:3000/api/emails

💻 Frontend (Partially Completed)

The frontend is designed with React + Vite and styled using Tailwind CSS.
Currently, it can:

Display fetched messages from the backend

Show loading states

Handle basic API calls

Future updates will include:

Authentication

Email categorization view

Reply composer with OpenAI suggestions

🧾 API Endpoints
Method	Endpoint	Description
GET	/api/emails	Fetch all emails
GET	/api/emails/:id	Fetch email by ID
POST	/api/analyze	Send message to OpenAI API
POST	/api/login	(Planned) Login using credentials
🧰 Tools & Dependencies

nodemon – Auto restarts the server during development

ts-node – Runs TypeScript directly

dotenv – For environment variable management

imap-simple – Fetching and parsing emails

openai – AI message processing

📽️ Project Demo (Video Explanation)

🎥 Video Title: “ReachInbox Assignment – Simplified AI-Integrated Email System”
In this 5-minute walkthrough, I explain:
The goal of the assignment

How IMAP and OpenAI are connected

Postman testing process

How environment variables secure the project

The current frontend progress and next steps

(Attach your recorded video here, e.g., YouTube link or .mp4 file in /demo folder.)

🤝 Conclusion

This project helped me understand backend integration, email fetching via IMAP, and how to securely use OpenAI APIs.
Although the frontend isn’t fully finished, the backend is fully functional and tested through Postman.
It’s a strong foundation to build a complete AI-assisted email management platform.



🧑‍💻 Author

Jagadeeshwara Reddy
B.Tech Student | MERN & AI Enthusiast
📧 [your_email@example.com
]
