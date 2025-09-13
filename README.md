# 🌊 Float Chat - Oceanographic AI Assistant

A modern React-based chat application specialized in oceanographic float data analysis, featuring voice recognition, AI-powered conversations, and data visualization capabilities.

## ✨ Features

- 🤖 **AI-Powered Chat**: Direct integration with Google Gemini AI for intelligent conversations
- 🎤 **Voice Recognition**: Speech-to-text functionality with auto-submit capability
- 🌊 **Oceanographic Focus**: Specialized in ARGO float data, CTD profiles, and ocean measurements
- 📊 **Data Visualization**: Interactive charts and analytics for ocean data
- 🎨 **Clean Blue Theme**: Professional, minimalist design focused on readability
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- 🔄 **Real-time Chat**: Smooth auto-scrolling chat interface
- 🚀 **Fast Performance**: Built with Vite for lightning-fast development and builds

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Integration**: Google Gemini API
- **Speech**: Web Speech API for voice recognition
- **Animations**: Framer Motion
- **Routing**: React Router DOM

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd blue-insight-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create a .env file in the root directory
   cp .env.example .env
   ```
   
   Add your Google Gemini API key to the `.env` file:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## 🔑 Getting a Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Add it to your `.env` file as `VITE_GEMINI_API_KEY`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ChatInterface.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ScrollToTop.tsx
├── pages/              # Route components
│   ├── Homepage.tsx
│   ├── ChatPage.tsx
│   ├── AnalyticsPage.tsx
│   └── NotFound.tsx
├── services/           # API and external services
│   └── api.ts
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## 🌐 Available Routes

- `/` - Homepage with application overview
- `/chat` - Main chat interface with AI assistant
- `/analytics` - Data visualization and analytics
- `/home` - Alternative homepage route

## 🎯 Usage

### Chat Interface
1. Navigate to the `/chat` page
2. Type your message or click the microphone icon for voice input
3. Ask questions about oceanographic data, ARGO floats, or ocean measurements
4. The AI will respond with specialized knowledge about ocean science

### Voice Features
- Click the microphone icon to start voice recognition
- Speak your question clearly
- The system will auto-submit after 3 seconds of silence
- Click the microphone again to stop listening

### Example Queries
- "What is ARGO float data and how is it collected?"
- "Explain temperature and salinity profiles in ocean measurements"
- "How do oceanographic floats monitor deep sea conditions?"
- "Show me the latest trends in global ocean temperature data"

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

## 🔒 Environment Variables

Create a `.env` file with:

```env
# Required: Google Gemini AI API Key
VITE_GEMINI_API_KEY=your_api_key_here

# Optional: Custom API endpoints
# VITE_API_BASE_URL=https://api.example.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Chat not responding**
- Check your Gemini API key in `.env`
- Verify internet connection
- Check browser console for errors

**Voice recognition not working**
- Ensure you're using HTTPS or localhost
- Allow microphone permissions in browser
- Check if browser supports Web Speech API

**Build errors**
- Delete `node_modules` and run `npm install`
- Check Node.js version (18+ required)
- Verify all dependencies are installed

### Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your API key is correctly configured
3. Ensure all dependencies are installed
4. Check the GitHub issues page

---

Built with ❤️ for ocean science and AI-powered conversations
