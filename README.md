# Real-Time Chat Room Application

A modern real-time chat room application built with Next.js, TypeScript, Prisma, Neon PostgreSQL, NextAuth, and WebSockets (`ws`).

## Features

- Google Authentication (NextAuth)
- Secure user sessions
- Room creation with password protection
- Join existing rooms
- Default room capacity of 5 users
- Real-time messaging using WebSockets
- PostgreSQL database hosted on Neon
- Prisma ORM
- Responsive UI
- Protected routes

## Tech Stack

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- NextAuth v4
- Prisma ORM
- PostgreSQL (Neon)

### Real-Time Communication

- ws (WebSocket)

## Database

- User
- Account
- Session
- VerificationToken
- Room
- RoomMember
- Message

## Authentication

- Google OAuth
- Prisma Adapter
- Database Sessions

## Getting Started

### Clone

```bash
git clone <repository-url>
```

### Install

```bash
npm install
```

### Create Environment Variables

Create a `.env` file:

```env
DATABASE_URL=

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=

GOOGLE_CLIENT_ID=

GOOGLE_CLIENT_SECRET=
```

### Run Prisma

```bash
npx prisma migrate dev
npx prisma generate
```

### Start Development Server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

## Project Status

### Completed

- Next.js setup
- Prisma setup
- Neon PostgreSQL integration
- Google Authentication
- NextAuth configuration
- Database sessions
- User persistence

### In Progress

- Dashboard
- Room creation
- Join room
- Password-protected rooms
- WebSocket server
- Real-time chat
- Online users
- Chat history

## License

This project is for learning and portfolio purposes.