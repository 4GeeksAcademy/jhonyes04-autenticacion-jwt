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
		<>
			<header className="bg-dark bg-gradient text-white">
				<div className="container px-5">
					<div className="row gx-5 align-items-center justify-content-center">
						<div className="col-lg-8 col-xl-7 col-xxl-6">
							<div className="my-5 text-center text-xl-start">
								<h1 className="display-5 fw-bolder mb-2">
									Bienvenido a JWT <span className="text-primary">jhonyes04</span>
								</h1>
								<p className="lead fw-normal text-white-50 mb-4">
									Una plataforma segura y rápida para gestionar tus datos con autenticación basada en tokens.
									{logueado ? " ¡Qué bueno verte de nuevo!" : " Únete a nuestra comunidad hoy mismo."}
								</p>
								<div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
									{logueado ? (
										<>
											<Link className="btn btn-primary btn-lg px-4 me-sm-3" to="/profile">
												<i className="fa-solid fa-user-gear me-2"></i>Ir a mi Perfil
											</Link>
											<button className="btn btn-lg btn-danger px-4 me-sm-3" onClick={handleClickLogout}>
												<i className="fa-solid fa-right-from-bracket me-2"></i>Cerrar sesión
											</button>
										</>

									) : (
										<>
											<Link className="btn btn-primary btn-lg px-4 me-sm-3" to="/register">
												<i className="fa-solid fa-user-plus me-2"></i>Empezar ahora
											</Link>
											<Link className="btn btn-light btn-lg px-4" to="/login">
												<i className="fa-solid fa-right-to-bracket me-2"></i>Iniciar sesión
											</Link>
										</>
									)}
								</div>
							</div>
						</div>
						<div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
							<i className="fa-solid fa-shield-halved text-primary" style={{ fontSize: "10rem" }}></i>
						</div>
					</div>
				</div>
			</header>

			<section>
				<div className="container px-5 py-4 text-center">
					<div className="row mt-4">
						<div className="col-lg-4 mb-5 mb-lg-0">
							<div className="bg-dark bg-gradient text-white rounded-4 p-4 d-inline-flex mb-2">
								<i className="fa-solid fa-lock fs-4"></i>
							</div>
							<h2 className="h4 fw-bolder">Seguridad JWT</h2>
						</div>
						<div className="col-lg-4 mb-5 mb-lg-0">
							<div className="bg-dark bg-gradient text-white rounded-4 p-4 d-inline-flex mb-2">
								<i className="fa-solid fa-bolt fs-4"></i>
							</div>
							<h2 className="h4 fw-bolder">Acceso Rápido</h2>
						</div>
						<div className="col-lg-4">
							<div className="bg-dark bg-gradient text-white rounded-4 p-4 d-inline-flex mb-2">
								<i className="fa-solid fa-laptop-code fs-4"></i>
							</div>
							<h2 className="h4 fw-bolder">API Moderna</h2>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}; 