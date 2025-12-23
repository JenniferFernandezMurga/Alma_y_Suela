import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ShoeProvider } from './context/ShoeStore'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LoginSingup from './pages/LoginSignup'
import RecommendationForm from './pages/RecommendationForm'
import RecommendationResults from './pages/RecommendationResults'
import About from './pages/About'
import './styles/App.css'
import SearchResults from './pages/SearchResults'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <ShoeProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recommend" element={<RecommendationForm />} />
              <Route path="/recommendation-results" element={<RecommendationResults />} />
              <Route path="/shoes/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
                <Route path="/login" element={<LoginSingup />} />
                <Route path='/search' element={<SearchResults />} />

            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ShoeProvider>
  )
}

export default App