import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShoeProvider } from './context/ShoeStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import RecommendationForm from './pages/RecommendationForm';
import RecommendationResults from './pages/RecommendationResults';
// import About from './pages/About';
import './styles/App.css';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import { FavoritesProvider } from './context/FavoritesContext';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import RecommendationsHistory from './pages/RecommendationsHistory';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Legal from './pages/Legal';
import BlogHome from './pages/Blog/BlogHome';
import ComoMedirAnchoPie from './pages/Blog/ComoMedirAnchoPie';
import ComoMedirArcoPie from './pages/Blog/ComoMedirArcoPie';
import ComoSaberMiPisada from './pages/Blog/ComoSaberMiPisada';
import Catalogo from './pages/Catalogo';

function App() {
  return (
    <ShoeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recommend" element={<RecommendationForm />} />
                <Route path="/recommendation-results" element={<RecommendationResults />} />
                <Route path="/shoes/:id" element={<ProductDetail />} />
                {/* <Route path="/about" element={<About />} /> */}

                <Route path="/login" element={<LoginSignup />} />
                <Route path='/search' element={<SearchResults />} />
                <Route path='/cart' element={<Cart />} />

                <Route path="/profile" element={<Profile />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/recommendations" element={<RecommendationsHistory />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/privacidad" element={<Privacy />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/aviso-legal" element={<Legal />} />
                <Route path="/legal" element={<Legal />} />

                <Route path="/blog" element={<BlogHome />} />
                <Route path="/blog/como-medir-ancho-pie" element={<ComoMedirAnchoPie />} />
                <Route path="/blog/como-medir-arco-pie" element={<ComoMedirArcoPie />} />
                <Route path="/blog/como-saber-mi-pisada" element={<ComoSaberMiPisada />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </ShoeProvider>
  )
}

export default App