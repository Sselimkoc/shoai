# ShoAI Video Generator

## Overview
ShoAI Video Generator is a modern web application that leverages artificial intelligence to create customized video content. The application allows users to generate video scripts, transform them into voice narrations, and create AI-generated visuals for each scene.

## Key Features
- 🎬 AI-Powered Video Script Generation
- 🎨 Multiple Video Style Options:
  - Realistic
  - Cartoon
  - Anime
  - Pixel Art
  - GTA Style
- ⏱️ Flexible Video Durations:
  - 15 seconds
  - 30 seconds
  - 1 minute
- 🗣️ Text-to-Speech Capabilities
- 🎭 Scene-by-Scene Generation
- 📝 Custom Topic Input
- 🖼️ AI Image Generation for Each Scene

## Technology Stack
- **Frontend:**
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  - Radix UI Components
- **AI Services:**
  - Google Generative AI (Gemini)
- **Styling:**
  - Tailwind CSS
  - CSS Modules
- **Database:**
  - PostgreSQL (with Drizzle ORM)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shoaivideo.git
cd shoaivideo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_postgresql_connection_string
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure
```
shoaivideo/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── ...               # Other app routes
├── components/            # Reusable React components
├── configs/              # Configuration files
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/              # Static assets
```

## Features in Detail

### Video Script Generation
- Custom topic selection
- Multiple style options
- Duration customization
- Scene-by-scene script generation

### AI Integration
- Powered by Google's Gemini AI
- Intelligent script generation
- Scene visualization prompts
- Natural language processing

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linting

### Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Built with [Next.js](https://nextjs.org/)
- AI powered by [Google Generative AI](https://ai.google.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
