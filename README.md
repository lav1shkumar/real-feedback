# Real Feedback

Real Feedback is an anonymous messaging platform that enables users to receive honest, constructive feedback from their peers. Built with **Next.js 14** and **AI-powered** by Google's Gemini, it provides a secure and engaging environment for open communication.

## 🚀 Features

- **Anonymous Messaging**: Users can send messages without revealing their identity, encouraging honest feedback.
- **AI-Powered Suggestions**: Integrated with **Google Gemini AI** to suggest conversation starters and constructive feedback messages.
- **User Dashboard**: A personal dashboard for users to manage their messages and account settings.
- **Message Control**: Users can toggle their availability to accept or reject new messages.
- **Secure Authentication**: Robust authentication system using **NextAuth.js** with email verification.
- **Responsive Design**: A modern, mobile-first UI built with **Tailwind CSS** and **Radix UI**.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **AI Integration**: [Google Generative AI (Gemini)](https://ai.google.dev/)
- **Email Service**: [Resend](https://resend.com/) & [React Email](https://react.email/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🏁 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm
- MongoDB Database (Local or Atlas)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/lav1shkumar/real-feedback.git
    cd real-feedback
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables**

    Create a `.env` file in the root directory and add the following variables:

    ```env
    NEXTAUTH_SECRET=your_nextauth_secret
    MONGODB_URI=your_mongodb_connection_string
    RESEND_API_KEY=your_resend_api_key
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5.  **Open the app**

    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
src/
├── app/              # Next.js App Router pages and API routes
├── components/       # Reusable UI components
├── lib/              # Utility functions and database connection
├── model/            # Mongoose models (User, Message)
├── schemas/          # Zod validation schemas
├── types/            # TypeScript type definitions
└── helpers/          # Helper functions (e.g., email sending)
```
