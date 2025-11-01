# Setup Guide

This guide will walk you through setting up this Next.js Supabase starter from scratch. Follow each step carefully!

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Supabase Setup](#supabase-setup)
4. [Environment Configuration](#environment-configuration)
5. [Run the Application](#run-the-application)
6. [Verify Everything Works](#verify-everything-works)
7. [Next Steps](#next-steps)

---

## Prerequisites

Make sure you have these installed before starting:

- **Node.js 18 or higher**
  - Check your version: `node --version`
  - Download from: https://nodejs.org/

- **npm, yarn, pnpm, or bun**
  - npm comes with Node.js
  - Check your version: `npm --version`

- **A Supabase account**
  - Sign up for free at: https://supabase.com/
  - You'll need to verify your email

- **Git** (optional, for cloning)
  - Check your version: `git --version`
  - Download from: https://git-scm.com/

---

## Project Setup

### Step 1: Get the Code

**Option A: Clone the repository**
```bash
git clone <your-repo-url>
cd nextjs-shadcn-supabase-starter
```

**Option B: Download as ZIP**
1. Download the project ZIP file
2. Extract it to your desired location
3. Open terminal/command prompt in that folder

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages. It may take a few minutes.

**Troubleshooting:**
- If you get errors, try deleting `node_modules` and `package-lock.json`, then run `npm install` again
- Make sure you're using Node.js 18 or higher

---

## Supabase Setup

### Step 1: Create a Supabase Project

1. Go to https://supabase.com/ and **sign in**

2. Click the **"New Project"** button

3. **Fill in your project details:**

   ![Create Project Screen](https://supabase.com/docs/img/guides/getting-started/new-project.png)

   - **Name**: Choose any name (e.g., "my-app-auth")
   - **Database Password**: Create a strong password
     - **IMPORTANT:** Save this password somewhere safe!
     - You'll need it if you ever want to connect directly to the database
   - **Region**: Choose the region closest to your users
     - For USA: `East US (North Virginia)` or `West US (Oregon)`
     - For Europe: `Europe (Frankfurt)` or `Europe (London)`
     - For Asia: `Southeast Asia (Singapore)` or `Northeast Asia (Tokyo)`
   - **Pricing Plan**: Free (perfect for development and small projects)

4. Click **"Create new project"**

5. **Wait for setup to complete** (1-2 minutes)
   - You'll see a loading screen
   - When done, you'll be redirected to your project dashboard

### Step 2: Run the Database Migration

Now we need to create the database tables for authentication.

1. In your Supabase project dashboard, look at the **left sidebar**

2. Click on **"SQL Editor"** (it has a database icon)

3. Click **"New query"** button in the top right

4. **Open the migration file** from this project:
   - File location: `supabase/migrations/001_initial_setup.sql`
   - Open it in any text editor (VS Code, Notepad, etc.)

5. **Copy the entire contents** of the file (Ctrl+A, then Ctrl+C)

6. **Paste it into the SQL Editor** in Supabase (Ctrl+V)

7. **Run the query:**
   - Click the **"Run"** button in the bottom right, OR
   - Press `Ctrl+Enter` (Windows/Linux) or `Cmd+Enter` (Mac)

8. **Verify success:**
   - You should see a message: **"Success. No rows returned"**
   - This is perfect! It means the tables were created

**What did this do?**
- Created a `profiles` table to store user information
- Set up Row Level Security (RLS) for data protection
- Created automatic triggers to:
  - Create a profile when a user signs up
  - Update timestamps when profiles are modified

**Troubleshooting:**
- If you get errors about "already exists", the tables are already created - that's fine!
- If you get permission errors, make sure you're logged in to Supabase

### Step 3: Get Your API Keys

1. In the left sidebar, click the **gear icon** (⚙️) at the bottom

2. Click **"API"** in the settings menu

3. **Copy your Project URL:**
   - Look for the section "Project URL"
   - It looks like: `https://abcdefgh12345678.supabase.co`
   - Click the **copy icon** or select and copy the text

4. **Copy your Anonymous (anon) key:**
   - Scroll down to "Project API keys"
   - Find the key labeled **"anon" "public"**
   - Click the **copy icon** to copy the key
   - **Note:** This key is safe to use in the browser

5. **(Optional) Copy your Service Role key:**
   - In the same "Project API keys" section
   - Find the key labeled **"service_role" "secret"**
   - Click **"Reveal"** then copy the key
   - **⚠️ WARNING:** Keep this key secret! Never share it or commit it to Git

### Step 4: Configure Email Settings (Optional but Recommended)

By default, Supabase uses a rate-limited email service. For production, you should set up your own email provider.

**For development, you can use the default settings.**

**For production:**
1. Go to **Authentication** → **Providers** → **Email**
2. Enable "Confirm email" (users must verify their email)
3. Set up a custom SMTP server (optional):
   - Go to **Project Settings** → **Auth**
   - Scroll to "SMTP Settings"
   - Add your email provider credentials (Gmail, SendGrid, etc.)

---

## Environment Configuration

### Step 1: Create Your Environment File

1. **Copy the example file:**

   **Windows (Command Prompt):**
   ```cmd
   copy .env.example .env.local
   ```

   **Mac/Linux (Terminal):**
   ```bash
   cp .env.example .env.local
   ```

   **Or manually:**
   - Open `.env.example` in a text editor
   - Save it as `.env.local` in the same folder

### Step 2: Fill in Your Supabase Credentials

1. **Open `.env.local`** in a text editor

2. **Replace the placeholder values** with your actual Supabase credentials:

   ```env
   # Replace with your actual Project URL (from Step 3 above)
   NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh12345678.supabase.co

   # Replace with your actual anon public key (from Step 3 above)
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   # (Optional) Replace with your service role key if you copied it
   SUPABASE_SECRET_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

   # Keep this as is for development
   NEXT_PUBLIC_META_URL=http://localhost:3000
   ```

3. **Save the file**

**Important Notes:**
- Never commit `.env.local` to Git (it's already in `.gitignore`)
- The `NEXT_PUBLIC_` prefix means these variables are accessible in the browser
- Variables without the prefix are server-only

---

## Run the Application

### Step 1: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
  ▲ Next.js 16.0.1
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.3s
```

### Step 2: Open in Browser

1. Open your browser
2. Go to: **http://localhost:3000**
3. You should see the home page!

**Troubleshooting:**
- **Port already in use?** Change the port: `npm run dev -- -p 3001`
- **Module not found errors?** Run `npm install` again
- **Environment variable errors?** Make sure `.env.local` exists and has correct values
- **Can't connect to Supabase?** Verify your environment variables are correct

---

## Verify Everything Works

Let's test the authentication flow!

### Test 1: Sign Up

1. Click **"Sign Up"** on the home page
2. Fill in the form:
   - **Full Name:** Your name
   - **Email:** Your actual email address
   - **Password:** At least 6 characters
3. Click **"Sign up"**
4. You should see a success message!

### Test 2: Email Confirmation

1. **Check your email** (including spam/junk folder)
2. Look for an email from Supabase
3. Click the **confirmation link**
4. You'll be redirected back to your app
5. You should be automatically logged in!

**Troubleshooting:**
- **No email received?**
  - Check spam/junk folder
  - Wait a few minutes (sometimes it's delayed)
  - Check Supabase Dashboard → Authentication → Users to see if the user was created
  - Try with a different email address

- **Email link doesn't work?**
  - Make sure `NEXT_PUBLIC_META_URL` in `.env.local` matches your app URL
  - In Supabase Dashboard → Authentication → URL Configuration, verify the redirect URLs

### Test 3: Profile Page

1. After logging in, you should see a navigation bar
2. Click **"Profile"**
3. You should see your user information:
   - Email address
   - Full name (if you entered it)
   - Created date

### Test 4: Logout

1. Click **"Logout"** in the navigation
2. You should be redirected to the home page
3. Try accessing `/profile` directly - you should be redirected to `/login`

### Test 5: Login

1. Click **"Login"**
2. Enter your email and password
3. Click **"Login"**
4. You should be logged back in!

**If all tests pass, congratulations! Your setup is complete!**

---

## Next Steps

Now that your authentication is working, you can:

### 1. Customize the Theme

Edit `app/globals.css` to change colors:
```css
@theme {
  --color-primary: oklch(0.7 0.2 250);
}
```

### 2. Add More Pages

Create new protected pages in `app/(root)/(protected)/`:
```tsx
// app/(root)/(protected)/dashboard/page.tsx
export default function DashboardPage() {
  return <h1>Dashboard</h1>;
}
```

### 3. Add More Database Tables

Create new migration files and run them in Supabase SQL Editor.

### 4. Customize User Profiles

Edit the `profiles` table schema:
- Add more fields (bio, phone, address, etc.)
- Update the `updateProfile` function in `utils/data-access/auth.ts`
- Update the profile page UI

### 5. Deploy to Production

See the [Deployment section in README.md](README.md#deployment) for instructions on deploying to Vercel.

---

## Common Issues

### "Invalid login credentials"
- Make sure you confirmed your email first
- Check if you're using the correct password
- Try signing up again with a different email

### "Failed to fetch"
- Verify your Supabase URL and keys in `.env.local`
- Make sure your Supabase project is active (not paused)
- Check your internet connection

### Profile page shows empty data
- Make sure the database trigger was created (Step 2 of Supabase Setup)
- Try signing up again
- Check Supabase Dashboard → Database → Tables → profiles

### Changes to `.env.local` not taking effect
- Stop the dev server (Ctrl+C)
- Restart it: `npm run dev`

---

## Need More Help?

- **Check the main [README.md](README.md)** for more detailed information
- **Review the code** - it's well-organized and commented
- **Check Supabase docs**: https://supabase.com/docs
- **Check Next.js docs**: https://nextjs.org/docs

---

**Happy coding! You're all set to build amazing things!**
