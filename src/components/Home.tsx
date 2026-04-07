import { Link } from 'react-router-dom'
import { BookOpen, Plus, TrendingUp } from 'lucide-react'

export function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to VibeShelf</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your personal digital library for organizing and discovering books, movies, music, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/library"
          className="group p-6 border rounded-lg hover:shadow-md transition-all hover:border-primary"
        >
          <BookOpen className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Browse Library</h3>
          <p className="text-muted-foreground">
            Explore your collection of books, movies, and music.
          </p>
        </Link>

        <Link
          to="/add"
          className="group p-6 border rounded-lg hover:shadow-md transition-all hover:border-primary"
        >
          <Plus className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Add New Item</h3>
          <p className="text-muted-foreground">
            Quickly add new books, movies, or music to your collection.
          </p>
        </Link>

        <div className="p-6 border rounded-lg">
          <TrendingUp className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
          <p className="text-muted-foreground">
            Monitor your reading and viewing habits over time.
          </p>
        </div>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm">No recent activity yet. Start by adding your first item!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
