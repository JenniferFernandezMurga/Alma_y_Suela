import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import { shoesService } from "../services/api";
import "../styles/Catalogo.css";

const Catalogo = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para filtros
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [sortBy, setSortBy] = useState('popular'); // popular, priceAsc, priceDesc, newest, brandAsc, brandDesc

    // Obtener marcas únicas para el filtro
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [genders, setGenders] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFiltersAndSort();
    }, [products, selectedBrand, selectedCategory, selectedGender, priceRange, sortBy]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await shoesService.getAll();

            if (data.success) {
                setProducts(data.shoes);

                // Extraer valores únicos para filtros
                const uniqueBrands = [...new Set(data.shoes.map(p => p.brand))].sort();
                const uniqueCategories = [...new Set(data.shoes.map(p => p.category))].sort();
                const uniqueGenders = [...new Set(data.shoes.map(p => p.gender))].filter(Boolean).sort();

                setBrands(uniqueBrands);
                setCategories(uniqueCategories);
                setGenders(uniqueGenders);
            } else {
                setError('Error al cargar productos');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const applyFiltersAndSort = () => {
        let result = [...products];

        // Aplicar filtros
        if (selectedBrand) {
            result = result.filter(p => p.brand === selectedBrand);
        }

        if (selectedCategory) {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (selectedGender) {
            result = result.filter(p => p.gender === selectedGender);
        }

        // Filtro de precio
        result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

        // Aplicar ordenación
        switch (sortBy) {
            case 'priceAsc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
                break;
            case 'brandAsc':
                result.sort((a, b) => a.brand.localeCompare(b.brand));
                break;
            case 'brandDesc':
                result.sort((a, b) => b.brand.localeCompare(a.brand));
                break;
            case 'popular':
            default:
                // Por defecto: ordenar por relevancia (aquí puedes añadir lógica de popularidad)
                // De momento, ordenamos por precio ascendente como ejemplo
                result.sort((a, b) => a.price - b.price);
                break;
        }

        setFilteredProducts(result);
    };

    const clearFilters = () => {
        setSelectedBrand('');
        setSelectedCategory('');
        setSelectedGender('');
        setPriceRange({ min: 0, max: 1000 });
        setSortBy('popular');
    };

    if (loading) {
        return (
            <div className="catalogo-loading">
                <div className="spinner"></div>
                <p>Cargando catálogo...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="catalogo-error">
                <i className="fas fa-exclamation-triangle"></i>
                <p>{error}</p>
                <button onClick={fetchProducts} className="btn-retry">
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="catalogo-page">
            {/* Hero */}
            <div className="catalogo-hero">
                <h1>Catálogo de zapatillas</h1>
                <p>Descubre nuestra colección completa</p>
            </div>

            <div className="catalogo-container">
                {/* Barra de filtros y ordenación */}
                <div className="catalogo-toolbar">
                    <div className="filter-section">
                        <div className="filter-group">
                            <label>Marca:</label>
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">Todas las marcas</option>
                                {brands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Categoría:</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">Todas las categorías</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Género:</label>
                            <select
                                value={selectedGender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">Todos</option>
                                {genders.map(gender => (
                                    <option key={gender} value={gender}>
                                        {gender === 'male' ? 'Hombre' :
                                         gender === 'female' ? 'Mujer' : 'Unisex'}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Precio máx:</label>
                            <input
                                type="range"
                                min="0"
                                max="300"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                                className="price-range"
                            />
                            <span className="price-value">Hasta {priceRange.max}€</span>
                        </div>

                        {(selectedBrand || selectedCategory || selectedGender || priceRange.max < 1000) && (
                            <button onClick={clearFilters} className="clear-filters-btn">
                                <i className="fas fa-times"></i>
                                Limpiar filtros
                            </button>
                        )}
                    </div>

                    <div className="sort-section">
                        <label>Ordenar por:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="sort-select"
                        >
                            <option value="popular">Más populares</option>
                            <option value="priceAsc">Precio: menor a mayor</option>
                            <option value="priceDesc">Precio: mayor a menor</option>
                            <option value="newest">Novedades</option>
                            <option value="brandAsc">Marca (A-Z)</option>
                            <option value="brandDesc">Marca (Z-A)</option>
                        </select>
                    </div>
                </div>

                {/* Contador de resultados */}
                <div className="results-count">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                </div>

                {/* Grid de productos */}
                {filteredProducts.length > 0 ? (
                    <ProductGrid products={filteredProducts} />
                ) : (
                    <div className="no-results">
                        <i className="fas fa-search"></i>
                        <h3>No hay productos que coincidan</h3>
                        <p>Prueba con otros filtros o limpia la búsqueda</p>
                        <button onClick={clearFilters} className="btn-primary">
                            Limpiar filtros
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Catalogo;