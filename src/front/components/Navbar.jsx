import { Link, useLocation, useNavigate } from "react-router-dom";
import { tokenValido } from '../services/validarToken'
import { useEffect, useState } from "react";

export const Navbar = () => {
	const [logueado, setLogueado] = useState(false)
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		setLogueado(tokenValido())
	}, [location])

	const handleClickLogout = () => {
		sessionStorage.removeItem('token')
		sessionStorage.removeItem('token_expires_at')
		navigate('/')
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
			<div className="container">
				<Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
					<span className="fw-bold fs-3">JWT</span> <span className="text-primary">jhonyes04</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto mt-2 mt-lg-0 align-items-lg-center">
						{logueado ? (
							<li className="nav-item dropdown">
								<button
									className="btn btn-dark dropdown-toggle w-100 d-flex align-items-center justify-content-center"
									type="button"
									id="dropdownMenu"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<i className="fa-solid fa-user-circle me-2"></i>
									Mi cuenta
								</button>
								<ul className="dropdown-menu dropdown-menu-end dropdown-menu-darke" aria-labelledby="dropdownMenu">
									<li>
										<Link to={'/profile'} className="dropdown-item d-flex align-items-center">
											<i className="fa-solid fa-user-gear me-2"></i>
											Ver perfil
										</Link>
									</li>
									<li><hr className="dropdown-divider" /></li>
									<li>
										<button onClick={handleClickLogout} className="dropdown-item text-danger fw-bold d-flex align-items-center">
											<i className="fa-solid fa-right-from-bracket me-2"></i>
											Cerrar sesión
										</button>
									</li>
								</ul>
							</li>
						) : (
							<li className="nav-item d-flex flex-column flex-lg-row gap-2">
								<Link to={'/login'} className="btn btn-dark d-flex align-items-center justify-content-center">
									<i className="fa-solid fa-right-to-bracket me-2"></i>
									Iniciar sesión
								</Link>
								<Link to={'/register'} className="btn btn-primary d-flex align-items-center justify-content-center">
									<i className="fa-solid fa-user-plus me-2"></i>
									Regístrate
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};