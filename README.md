# VibeShelf

A modern, clean digital media library application for organizing and tracking your books, movies, and music collection.

## Features

- 📚 **Media Management**: Add and organize books, movies, and music
- 🎯 **Progress Tracking**: Track your reading/watching status
- 🔍 **Search & Filter**: Easily find items in your collection
- 📱 **Responsive Design**: Works beautifully on all devices
- 🎨 **Modern UI**: Clean, intuitive interface built with TailwindCSS

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom design system
- **Icons**: Lucide React
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd vibeshelf
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Navigation.tsx   # Main navigation
│   ├── Home.tsx         # Home page
│   ├── Library.tsx      # Library view
│   └── AddItem.tsx      # Add new item form
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] User authentication and accounts
- [ ] Cloud sync and backup
- [ ] Social features and sharing
- [ ] Advanced statistics and analytics
- [ ] Integration with external APIs (Goodreads, TMDB, etc.)
- [ ] Mobile app development
