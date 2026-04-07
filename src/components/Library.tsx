import { useState } from 'react'
import { Search, BookOpen, Film, Music } from 'lucide-react'

interface MediaItem {
  id: string
  title: string
  type: 'book' | 'movie' | 'music'
  author?: string
  year?: number
  rating?: number
  status: 'unread' | 'reading' | 'read' | 'unwatched' | 'watching' | 'watched'
}

export function Library() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'book' | 'movie' | 'music'>('all')

  const mockItems: MediaItem[] = []

  const getTypeIcon = (type: MediaItem['type']) => {
    switch (type) {
      case 'book':
        return <BookOpen className="h-4 w-4" />
      case 'movie':
        return <Film className="h-4 w-4" />
      case 'music':
        return <Music className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: MediaItem['status']) => {
    switch (status) {
      case 'read':
      case 'watched':
        return 'bg-green-100 text-green-800'
      case 'reading':
      case 'watching':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h1 className="text-3xl font-bold">My Library</h1>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Types</option>
            <option value="book">Books</option>
            <option value="movie">Movies</option>
            <option value="music">Music</option>
          </select>
        </div>
      </div>

      {mockItems.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your library is empty</h3>
          <p className="text-muted-foreground mb-4">
            Start building your collection by adding your first book, movie, or album.
          </p>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Add Your First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(item.type)}
                  <span className="text-sm text-muted-foreground capitalize">{item.type}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              {item.author && <p className="text-sm text-muted-foreground">by {item.author}</p>}
              {item.year && <p className="text-sm text-muted-foreground">{item.year}</p>}
              {item.rating && (
                <div className="flex items-center mt-2">
                  <span className="text-sm text-yellow-600">★ {item.rating}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
