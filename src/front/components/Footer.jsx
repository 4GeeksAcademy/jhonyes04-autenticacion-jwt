export const Footer = () => {
	const fecha = new Date().getFullYear()

	return (
		<div className="bg-dark">
			<footer className="container bg-dark text-white d-flex justify-content-between align-items-center py-3 px-5">
				<p className="m-0">Copyright &copy; {fecha}</p>
				<p className="m-0">Jhonyes04 ⭐</p>
			</footer>
		</div>
	)
};
