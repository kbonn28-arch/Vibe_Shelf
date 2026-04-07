import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Home } from './components/Home'
import { Library } from './components/Library'
import { AddItem } from './components/AddItem'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/add" element={<AddItem />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
