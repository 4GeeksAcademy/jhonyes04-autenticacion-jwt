import { useEffect, useState } from "react"
import { rutaProtegida } from "../services/api"
import { toast } from 'react-toastify'

export const Profile = () => {
    const [perfil, setPerfil] = useState(null) // Inicializamos en null para manejo de carga

    useEffect(() => {
        rutaProtegida()
            .then((data) => setPerfil(data))
            .catch((error) => {
                toast.error(error.message, { position: 'top-center', autoClose: 2000 });
            })
    }, [])

    if (!perfil) return <div className="text-center mt-5"><span className="spinner-border"></span></div>

    return (
        <div className="container mt-5 px-3">
            <div className="card col-12 col-md-10 col-lg-6 mx-auto border-0 shadow-lg">
                <div className="card-header bg-dark text-white border-0 py-3 text-center">
                    <h5 className="card-title m-0">
                        Perfil de Usuario
                    </h5>
                </div>

                <div className="card-body p-4 bg-light">
                    {/* Fila: ID */}
                    <div className="row align-items-center mb-3">
                        <div className="col-12 col-sm-4 text-muted small text-uppercase fw-bold">
                            <i className="fa-solid fa-fingerprint me-2 text-dark"></i>ID Usuario
                        </div>
                        <div className="col-12 col-sm-8">
                            <span className="bg-white border rounded px-3 py-1 w-100 d-block text-dark fw-semibold shadow-sm text-truncate">
                                {perfil.id}
                            </span>
                        </div>
                    </div>

                    {/* Fila: Nombre */}
                    <div className="row align-items-center mb-3">
                        <div className="col-12 col-sm-4 text-muted small text-uppercase fw-bold">
                            <i className="fa-solid fa-user me-2 text-dark"></i>Nombre
                        </div>
                        <div className="col-12 col-sm-8">
                            <span className="bg-white border rounded px-3 py-1 w-100 d-block text-dark fw-semibold shadow-sm">
                                {perfil.firstname}
                            </span>
                        </div>
                    </div>

                    {/* Fila: Apellidos */}
                    <div className="row align-items-center mb-3">
                        <div className="col-12 col-sm-4 text-muted small text-uppercase fw-bold">
                            <i className="fa-solid fa-id-card me-2 text-dark"></i>Apellidos
                        </div>
                        <div className="col-12 col-sm-8">
                            <span className="bg-white border rounded px-3 py-1 w-100 d-block text-dark fw-semibold shadow-sm">
                                {perfil.lastname}
                            </span>
                        </div>

                    </div>
                    <div className="row align-items-center mb-0">
                        <div className="col-12 col-sm-4 text-muted small text-uppercase fw-bold">
                            <i className="fa-solid fa-envelope me-2 text-dark"></i>Email
                        </div>
                        <div className="col-12 col-sm-8">
                            <span className="bg-white border rounded px-3 py-1 w-100 d-block text-dark fw-semibold shadow-sm text-truncate">
                                {perfil.email}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}