import { Link } from "react-router-dom";

export const Home = () => {
	return (
		<div className="container mt-5">
			<div className="card col-8 mx-auto">
				<div className="card-body text-center">
					<h1>Bienvenid@</h1>
					<div className="container d-flex">
						<div className="col-6">
							<Link to={'/login'} className="btn btn-dark">Inicia sesión</Link>
						</div>
						<div className="col-6">
							<Link to={'/register'} className="btn btn-primary">Regístrate</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}; 