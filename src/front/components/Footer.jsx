export const Footer = () => {
	const fecha = new Date().getFullYear()

	return (
		<footer className="container-fluid bg-dark text-white d-flex justify-content-between align-items-center py-3 px-5">
			<p className="m-0">Copyright &copy; {fecha}</p>
			<p className="m-0">Jhonyes04 </p>
		</footer>
	)
};
