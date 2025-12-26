import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchCategory, setSearchCategory] = useState("todo")
    const [showFilters, setShowFilters] = useState(false)
    const navigate = useNavigate()

// Estilos inline para mantener la coherencia
const navbarStyle = {
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fff8 100%)',
    borderBottom: '3px solid #d2b48c',
    boxShadow: '0 4px 6px rgba(139, 69, 19, 0.1)',
    padding: '0.5rem 0'
}

const searchGroupStyle = {
    borderRadius: '50px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(46, 139, 87, 0.2)'
}

const filterButtonStyle = {
    background: 'linear-gradient(135deg, #8fbc8f, #2e8b57)',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    fontWeight: '600',
    borderRadius: '50px 0 0 50px'
}

const searchInputStyle = {
    border: 'none',
    borderLeft: '2px solid #d2b48c',
    padding: '12px 20px',
    background: '#f8fff8'
}

const searchButtonStyle = {
    background: 'linear-gradient(135deg, #d2b48c, #a0522d)',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    fontWeight: '600',
    borderRadius: '0 50px 50px 0'
}

const loginButtonStyle = {
    background: 'linear-gradient(135deg, #2e8b57, #228b22)',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '50px',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(46, 139, 87, 0.3)'
}

const dropdownMenuStyle = {
    display: 'block',
    marginTop: '5px',
    border: 'none',
    borderRadius: '15px',
    boxShadow: '0 8px 25px rgba(46, 139, 87, 0.2)',
    overflow: 'hidden'
}

const dropdownItemStyle = {
    padding: '12px 20px',
    borderBottom: '1px solid rgba(143, 188, 143, 0.2)',
    transition: 'all 0.3s ease'
}

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
        <nav className="navbar" style={navbarStyle}>
            <div className="container-fluid">
                
                <Link to="/" className="navbar-brand">
                    <img 
                        src="/images/logonuevo19.png" 
                        alt="Logo" 
                        style={{ 
                            height: "150px",
                            width: "150px",
                            filter: "drop-shadow(0 2px 4px rgba(47, 79, 79, 0.3))"
                        }} 
                    />
                </Link>
                
                {/* Buscador con nuevo estilo */}
                <div className="d-flex flex-grow-1 justify-content-center mx-3">
                    <form className="d-flex w-100" style={{ maxWidth: "600px" }} onSubmit={handleSearch}>
                        <div className="input-group" style={searchGroupStyle}>
                            {/* Botón de filtros mejorado */}
                            <div className="dropdown">
                                <button
                                    className="btn"
                                    style={filterButtonStyle}
                                    type="button"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <span className="me-2">{currentCategory?.icon}</span>
                                    {currentCategory?.label}
                                    <span className="ms-2">▼</span>
                                </button>
                                
                                {showFilters && (
                                    <div className="dropdown-menu show" style={dropdownMenuStyle}>
                                        {categories.map(cat => (
                                            <button
                                                key={cat.value}
                                                type="button"
                                                className="dropdown-item"
                                                style={dropdownItemStyle}
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
                                style={searchInputStyle}
                                type="search" 
                                placeholder={`Buscar por ${currentCategory?.label.toLowerCase()}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            
                            <button className="btn" style={searchButtonStyle} type="submit">
                                🔍 Buscar
                            </button>
                        </div>
                    </form>
                </div>
                
                <div className="d-none d-sm-block">
                    <Link to="/login" className="btn" style={loginButtonStyle}>
                        👤 Accede
                    </Link>
                </div>
            </div>
        </nav>
    )
}



//     return (
//         <nav className="navbar navbar-light bg-light">
//             <div className="container-fluid">
                
//                 <Link to="/" className="navbar-brand">
//                     <img 
//                         src="/images/logonavbar1.png" 
//                         alt="Logo" 
//                         style={{ height: "100px" ,
//                             filter: "drop-shadow(0 2px 4px rgba(47, 79, 79, 0.3))"
//                         }} 
//                     />
//                 </Link>
                
//                 {/* Buscador con dropdown de filtros */}
//                 <div className="d-flex flex-grow-1 justify-content-center mx-3">
//                     <form className="d-flex w-100" style={{ maxWidth: "600px" }} onSubmit={handleSearch}>
//                         <div className="input-group">
//                             {/* Botón de filtros */}
//                             <div className="dropdown">
//                                 <button
//                                     className="btn btn-outline-secondary dropdown-toggle"
//                                     type="button"
//                                     onClick={() => setShowFilters(!showFilters)}
//                                 >
//                                     {currentCategory?.icon} {currentCategory?.label}
//                                 </button>
                                
//                                 {showFilters && (
//                                     <div className="dropdown-menu show" style={{ display: 'block', marginTop: '5px' }}>
//                                         {categories.map(cat => (
//                                             <button
//                                                 key={cat.value}
//                                                 type="button"
//                                                 className="dropdown-item"
//                                                 onClick={() => {
//                                                     setSearchCategory(cat.value)
//                                                     setShowFilters(false)
//                                                 }}
//                                             >
//                                                 <span className="me-2">{cat.icon}</span>
//                                                 {cat.label}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 )}
//                             </div>
                            
//                             <input 
//                                 className="form-control" 
//                                 type="search" 
//                                 placeholder={`Buscar por ${currentCategory?.label.toLowerCase()}...`}
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
                            
//                             <button className="btn btn-primary" type="submit">
//                                 Buscar
//                             </button>
//                         </div>
//                     </form>
//                 </div>
                
//                 <div className="d-none d-sm-block">
//                     <Link to="/login" className="btn btn-primary">
//                         Accede
//                     </Link>
//                 </div>
                
//             </div>
//         </nav>
//     )
// }

export default Navbar