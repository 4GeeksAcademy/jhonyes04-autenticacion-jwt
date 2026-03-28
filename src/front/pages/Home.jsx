import { Link, useLocation, useNavigate } from "react-router-dom";
import { tokenValido } from '../services/validarToken'
import { useState, useEffect } from "react";

export const Home = () => {
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
		<div className="container mt-5">
			<div className="card col-8 mx-auto">
				<div className="card-body text-center">
					<h1>Bienvenid@</h1>
					{logueado ? (
						<button onClick={handleClickLogout} className="btn btn-danger">Cerrar sesión</button>
					) : (
						<div className="container d-flex">
							<div className="col-6">
								<Link to={'/login'} className="btn btn-dark">Inicia sesión</Link>
							</div>
							<div className="col-6">
								<Link to={'/register'} className="btn btn-primary">Regístrate</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}; 