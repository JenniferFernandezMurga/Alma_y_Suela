// import React, { useState } from "react"
// import { Link, Navigate, useNavigate } from "react-router-dom"

// const Navbar = () => {
//     const [searchTerm, setSearchTerm] = useState("")
//     const [searchCategory, setSearchCategory] = useState("todo")
//     const navigate  = useNavigate()

//     const  handleSearch = (e) => {
//         e.preventDefault()

//         if (searchTerm.trim()) {
//             navigate(`/search?q=${encodeURIComponent(searchTerm)}&category=${searchCategory}`)
//             setSearchTerm("")
//         }
//     }



//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">

//                 {/* IZQUIERDA: Logo que lleva al Home */}
//                 <Link to="/" className="navbar-brand">

//                 <img
//                     src="/images/Logo Stepwise2.png"
//                     alt="StepWise Logo"
//                     style={{
//                         height: "60px",
//                         paddingLeft: "5px"
//                     }}
//                 />
//             </Link>

//                 <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>

//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">

//                     {/* CENTRO: Buscador */}
//                     <form className="d-flex mx-auto" style={{ width: "500px"}} onSubmit={handleSearch}>
//                      {  /*selector categoría*/}

//                        <select
//                             className="form-select"
//                             style={{ maxWidth: "150px"}}
//                             value={searchCategory}
//                             onChange={(e) => setSearchCategory(e.target.value)}
//                             >
//                                 <option value="todo">Todo</option>
//                                 <option value="marca">Marca</option>
//                                 <option value="talla">Talla</option>
//                                 <option value="genero">Género</option>
//                                 <option value="deporte">Deporte</option>
//                                 <option value="ofertas">Ofertas</option>

//                                 </select>


//                         <input
//                             className="form-control me-2"
//                             type="search"
//                             placeholder="Buscar zapatillas..."
//                             aria-label="Search"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <button className="btn btn-outline-primary" type="submit">
//                             🔍
//                         </button>
//                     </form>

//                     {/* DERECHA: Navegación + Login */}
//                     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//                         {/* <li className="nav-item">
//                             <Link to="/" className="nav-link">Inicio</Link>
//                         </li> */}
//                         {/* <li className="nav-item">
//                             <Link to="/recommend" className="nav-link">Encuentra tu zapatilla</Link>
//                         </li> */}
//                         {/* <li className="nav-item">
//                             <Link to="/about" className="nav-link">Cómo funciona</Link>
//                         </li> */}

//                         {/* Login/Registro */}
//                         <li className="nav-item">
//                             <Link to="/loginSignup" className="btn btn-primary ms-2">Accede</Link>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     )
// }

// export default Navbar

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
                                placeholder={`Buscar por ${currentCategory?.label.toLowerCase()}...`}
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