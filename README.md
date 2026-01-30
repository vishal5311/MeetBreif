# 🎥 MeetBrief: AI Meeting Recap Video Generator

MeetBrief is a production-ready SaaS starter that transforms meeting transcripts into beautifully animated recap videos using **Next.js 14**, **Remotion**, and **Supabase**.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/MeetBrief)

## ✨ Features

- 🔐 **Authentication**: Secure email-based login via Supabase Auth.
- 📁 **Transcript Processing**: Intelligent parsing of meeting logs (with or without timestamps).
- 🎬 **Video Generation**: Programmatic video creation using Remotion.
- ☁️ **Storage**: Videos are hosted securely on Supabase Storage (Free tier).
- 📱 **Dashboard**: Sleek, responsive UI for managing and viewing your recaps.
- 🎨 **Styling**: Modern, premium design with Tailwind CSS and Framer Motion.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Video Engine**: [Remotion](https://www.remotion.dev/)
- **Database/Auth**: [Supabase](https://supabase.com/)
- **Storage**: [Supabase Storage](https://supabase.com/storage)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Deployment**: [Netlify](https://www.netlify.com/)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/MeetBrief.git
cd MeetBrief
npm install
```

### 2. Environment Setup
Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Database Schema
Run this SQL in your Supabase SQL Editor to set up the `videos` table:

```sql
-- Create videos table
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  transcript TEXT NOT NULL,
  url TEXT,
  status TEXT DEFAULT 'pending', -- pending, rendering, completed, failed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own videos
CREATE POLICY "Users can view own videos" ON videos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own videos" ON videos
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 4. Storage Bucket
1. Go to **Supabase Storage**.
2. Create a new bucket named `videos`.
3. Set the bucket to **Public**.

---

## 🌐 Deployment to Netlify

This project is optimized for Netlify using the included `netlify.toml`.

### 1. Deployment Settings
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: `20`

### 2. Environment Variables
Add your `.env.local` keys to the Netlify Dashboard (**Site Settings > Environment Variables**).

### 3. Authentication Redirects
Add your Netlify site URL to the "Redirect URLs" list in **Supabase > Authentication > URL Configuration**.

---

## 🏗️ Development

```bash
npm run dev
```

To preview the video composition in Remotion:
```bash
npm run remotion:preview
```

---

## 📜 License
MIT
