import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchCategory, setSearchCategory] = useState("todo")
    const [showFilters, setShowFilters] = useState(false)
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}&category=${searchCategory}`)
            setSearchTerm("")
        }
    }

    const categories = [
        { value: "todo", label: "Todo", icon: "🔍" },
        { value: "marca", label: "Marca", icon: "🏷️" },
        { value: "tipo", label: "Tipo", icon: "👟" },
        { value: "sexo", label: "Sexo", icon: "🚻" }
    ]

    const currentCategory = categories.find(c => c.value === searchCategory)

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                
                <Link to="/" className="navbar-brand">
                    <img 
                        src="/images/Logo Stepwise2.png"
                        alt="StepWise Logo"
                        style={{ height: "60px" }}
                    />
                </Link>
                
                {/* Buscador con dropdown de filtros */}
                <div className="d-flex flex-grow-1 justify-content-center mx-3">
                    <form className="d-flex w-100" style={{ maxWidth: "600px" }} onSubmit={handleSearch}>
                        <div className="input-group">
                            {/* Botón de filtros */}
                            <div className="dropdown">
                                <button
                                    className="btn btn-outline-secondary dropdown-toggle"
                                    type="button"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    {currentCategory?.icon} {currentCategory?.label}
                                </button>
                                
                                {showFilters && (
                                    <div className="dropdown-menu show" style={{ display: 'block', marginTop: '5px' }}>
                                        {categories.map(cat => (
                                            <button
                                                key={cat.value}
                                                type="button"
                                                className="dropdown-item"
                                                onClick={() => {
                                                    setSearchCategory(cat.value)
                                                    setShowFilters(false)
                                                }}
                                            >
                                                <span className="me-2">{cat.icon}</span>
                                                {cat.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <input 
                                className="form-control" 
                                type="search" 
                                placeholder={`Buscar por ${(currentCategory?.label || 'todo').toLowerCase()}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            
                            <button className="btn btn-primary" type="submit">
                                Buscar
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="d-none d-sm-block">
                    <Link to="/loginSignup" className="btn btn-primary">
                        Accede
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
