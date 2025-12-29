# Supportability Training Website + AI Assistant

A comprehensive training platform for client-facing technical teams with an integrated AI-powered comment assistant for support case communications.

## 🎯 Purpose

This platform provides:

### 📚 Training Content
- **Communication Principles**: Building trust, ownership, and clarity in client interactions
- **Best Practices**: Active listening, empathy, and effective problem-solving techniques
- **Real-world Examples**: Practical scenarios and communication templates
- **Quick References**: Checklists and do's/don'ts for immediate application

### 🤖 AI Assistant
An intelligent tool that helps you write better support case comments:
- **Input**: Customer's question + your rough technical notes
- **Output**: Professional, well-structured response ready to paste into cases
- **Features**: 
  - Data sanitization (automatically replaces sensitive info with placeholders)
  - Technical solution finder (searches documentation via Google AI)
  - Professional tone and formatting
  - Personalized with your name
  - Bilingual support (English/Hebrew)

**Perfect for**: Support engineers, TAMs, and anyone writing client-facing technical communications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- **AWS Bedrock Access** (for AI Assistant)
- **Google AI API Key** (optional, for technical solution search)

### Installation

```bash
# Install dependencies
npm install
```

### Configuration

#### Option 1: Environment Variables (Development)
Create a `.env.local` file in the root directory:

```bash
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_SESSION_TOKEN=your_session_token_here  # Optional
AWS_REGION=us-east-1
GOOGLE_AI_API_KEY=your_google_api_key_here  # Optional
```

#### Option 2: User Settings (Production/Shared Deployment)
1. Deploy the application
2. Each user configures their own credentials via Settings (⚙️ icon)
3. Credentials stored locally in browser (never shared or committed to git)

**Important**: The AI Assistant API routes only work locally (`npm run dev`). For production deployments on GitHub Pages or similar static hosts, users must run locally and configure their own credentials.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
npm run build
npm start
```

## 📚 Content Structure

The website includes the following sections:

### Training Pages
- **Home**: Overview and key topics
- **Introduction**: What is supportability and why it matters
- **Core Principles**: 7 foundational principles for effective communication
- **Best Practices**: Practical techniques for handling client interactions
- **Examples**: Workshop notes and real-world insights
- **Resources**: Quick reference guides, checklists, and practice scenarios

### AI Assistant
- **Location**: `/ai-assistant` page
- **How to Use**:
  1. Paste customer's question/comment
  2. Add your technical analysis or rough notes
  3. (Optional) Enable "Find Technical Solutions" to search documentation
  4. Click "Preview & Sanitize Data" to review
  5. Click "Analyze" to generate professional response
  6. Copy the formatted response directly into your support case

**Privacy Features**:
- Automatically sanitizes: vault names, account names, IP addresses, domains, safe names, app IDs
- Shows preview before sending to AI
- Editable sanitization map
- Name restoration in final output

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **AI Models**: 
  - AWS Bedrock Claude Sonnet 4.5 (primary analysis)
  - Google Gemini 1.5 Flash (technical documentation search)
- **State Management**: React Context API
- **Storage**: Browser localStorage (for user credentials)
- **Deployment**: GitHub Pages (static export) or local development

## 📝 Customization

### Training Content
To update training content:
1. Navigate to `src/app/[page-name]/page.tsx`
2. Edit the content directly in the React components
3. Changes will hot-reload in development mode

### AI Assistant Settings
Each user can configure:
- **User Name**: Appears in AI-generated responses
- **AWS Credentials**: Access Key, Secret Key, Session Token (optional), Region
- **Google AI API Key**: For technical documentation search (optional)

Access Settings via the ⚙️ icon in the top navigation.

## 🎓 Use Cases

**Training Website**:
- Onboarding new support engineers
- Refresher courses on communication best practices
- Reference material during case work

**AI Assistant**:
- Formatting technical responses for customers
- Improving clarity of complex explanations
- Ensuring consistent professional tone
- Learning by example (see how AI structures responses)

## 🤝 Sharing with Colleagues

To share this tool:

1. **Push to GitHub**:
```bash
git add .
git commit -m "feat: AI assistant for support case comments"
git push origin main
```

2. **Share the repository link** with colleagues

3. **Each user must**:
   - Clone the repository
   - Run `npm install`
   - Run `npm run dev`
   - Configure their own AWS/Google credentials via Settings (⚙️)

## 📋 Example Workflow

1. Open a support case (e.g., in ServiceNow, Salesforce)
2. Copy customer's question
3. Navigate to `/ai-assistant` in the app
4. Paste customer question
5. Add your technical notes/findings
6. Click "Preview & Sanitize Data" → Review → "Analyze"
7. Review AI-generated response
8. Copy formatted response
9. Paste into support case

**Result**: Saves time, improves quality, maintains professional standards.

## 🌐 Deployment

### Local Development (Recommended for AI Assistant)

```bash
npm run dev
```

The AI Assistant requires API routes, which only work in development mode. Users can configure their credentials via Settings (⚙️).

### Deploy as Static Site (GitHub Pages)

```bash
npm run build
```

Training content will be fully accessible. Users who clone and run locally can use the AI Assistant with their own credentials.

### Security Notes

- ⚠️ Never commit `.env.local` to git (already in `.gitignore`)
- ⚠️ Credentials configured via Settings are stored in browser localStorage only
- ⚠️ Each user must configure their own AWS Bedrock access
- ✅ No sensitive data is ever committed to the repository

## 📄 License

Internal training resource for team use.

---

Built with ❤️ for technical support excellence

