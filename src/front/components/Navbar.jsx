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
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">JWT jhonyes04</span>
				</Link>
				<div className="ml-auto">
					{logueado ? (
						<button onClick={handleClickLogout} className="btn btn-danger">Cerrar sesión</button>
					) : (
						<div className="d-flex gap-2">
							<Link to={'/login'} className="btn btn-outline-dark">Iniciar sesión</Link>
							<Link to={'/register'} className="btn btn-primary">Regístrate</Link>
						</div>
					)}

				</div>
			</div>
		</nav>
	);
};