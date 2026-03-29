import { useEffect, useState } from "react"
import { rutaProtegida } from "../services/api"
import { toast } from 'react-toastify'

export const Profile = () => {
    const [perfil, setPerfil] = useState('')
    useEffect(() => {
        rutaProtegida().then((data) => {
            setPerfil(data)
        }).catch((error) => {
            toast.error(error.message, {
                position: 'top-center',
                autoClose: 2000,
                closeOnClick: true
            })
        })
    }, [])
    return (
        <div className="container mt-5 px-3">
            {/* Usamos col-12 para móvil, col-md-8 para tablets y col-lg-5 para escritorio */}
            <div className="card col-12 col-md-8 col-lg-5 mx-auto border-0">
                <div className="card-header py-3">
                    <h5 className="card-title m-0 d-flex align-items-center">
                        <i className="fa-solid fa-id-card me-2"></i>
                        Perfil de Usuario
                    </h5>
                </div>

                <div className="card-body d-flex flex-column gap-3 p-4">
                    {/* ID de Usuario */}
                    <div className="d-flex flex-column flex-sm-row align-items-sm-center pb-2">
                        <span className="fw-bold text-muted small text-uppercase">
                            <i className="fa-solid fa-fingerprint me-2"></i>Id de usuario
                        </span>
                        <p className="ms-sm-auto m-0 fw-medium text-break">{perfil.id}</p>
                    </div>

                    {/* Email */}
                    <div className="d-flex flex-column flex-sm-row align-items-sm-center pb-2">
                        <span className="fw-bold text-muted small text-uppercase">
                            <i className="fa-solid fa-envelope me-2"></i>Email
                        </span>
                        <p className="ms-sm-auto m-0 fw-medium text-break">{perfil.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
