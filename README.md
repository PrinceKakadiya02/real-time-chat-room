# 💬 Real-Time Chat Room

A full-stack real-time chat application built with **Next.js**, **TypeScript**, **WebSockets (`ws`)**, **NextAuth**, **Prisma**, and **PostgreSQL**. Users can authenticate with Google, create chat rooms, join existing rooms, and exchange messages instantly through a dedicated WebSocket server.

---

# ✨ Features

* 🔐 Google Authentication with NextAuth
* 👤 Secure user authentication and sessions
* 🏠 Create chat rooms
* 🚪 Join existing chat rooms
* 💬 Real-time messaging using WebSockets (`ws`)
* 👥 Multiple users can chat in the same room simultaneously
* 📡 Dedicated WebSocket server for low-latency communication
* 💾 Persistent data storage with Prisma & PostgreSQL
* 🎨 Responsive user interface built with Next.js

---

# 🛠️ Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS

### Backend

* Next.js Route Handlers
* WebSocket (`ws`)
* NextAuth
* Prisma ORM

### Database

* PostgreSQL

---

# 📂 Project Structure

```text
real-time-chat-room/
│
├── app/                # Next.js App Router
├── components/         # Reusable UI components
├── lib/                # Utility functions
├── prisma/             # Prisma schema and configuration
├── public/             # Static assets
├── types/              # Shared TypeScript types
├── ws/                 # Standalone WebSocket server
│
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🏗️ Architecture

```text
                ┌─────────────────────────┐
                │        Browser          │
                └────────────┬────────────┘
                             │
                     HTTP / HTTPS
                             │
                ┌────────────▼────────────┐
                │       Next.js App       │
                │                         │
                │ • Authentication        │
                │ • Room APIs             │
                │ • Prisma                │
                └────────────┬────────────┘
                             │
                      PostgreSQL Database
                             │
                ┌────────────▼────────────┐
                │      Prisma ORM         │
                └─────────────────────────┘


                WebSocket Connection
                       ws://
                         │
                         ▼
             ┌─────────────────────────┐
             │   Standalone ws Server  │
             │                         │
             │ • Room Management       │
             │ • Message Broadcast     │
             │ • Client Connections    │
             └─────────────────────────┘
```

---

# ⚙️ Environment Variables

Create a `.env` file using the provided `.env.example`.

```env
DATABASE_URL=

NEXTAUTH_URL=
NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

WS_URL=
```

---

# 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/PrinceKakadiya02/real-time-chat-room.git
```

Move into the project:

```bash
cd real-time-chat-room
```

Install dependencies:

```bash
npm install
```

Generate the Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

---

# ▶️ Running the Project

Start the Next.js application:

```bash
npm run dev
```

Start the WebSocket server:

```bash
cd ws
npm install
npm run dev
```

> Make sure both the Next.js application and the WebSocket server are running to enable real-time communication.

---

# 📡 WebSocket Workflow

1. User signs in using Google.
2. User creates or joins a chat room.
3. The client establishes a WebSocket connection.
4. Messages are sent to the standalone WebSocket server.
5. The server broadcasts each message to every connected client in the same room.
6. All users receive new messages instantly without refreshing the page.

---

# 🔐 Authentication

Authentication is implemented using **NextAuth** with the **Google Provider**.

Authenticated users can:

* Create chat rooms
* Join chat rooms
* Exchange messages in real time

---

# 🗄️ Database

Prisma ORM is used to communicate with PostgreSQL.

The database stores:

* Users
* OAuth Accounts
* Sessions
* Chat Rooms
* Messages

---

# 🔮 Future Improvements

* Message history
* Typing indicators
* Online user presence
* Read receipts
* File and image sharing
* Emoji reactions
* Private messaging
* Chat search
* Room management (delete/edit)
