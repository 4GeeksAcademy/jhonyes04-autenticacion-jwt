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
            <div className="card col-12 col-md-8 col-lg-5 mx-auto border-0">
                <div className="card-header bg-dark text-white border-0 py-3">
                    <h5 className="card-title m-0 d-flex align-items-center">
                        <i className="fa-solid fa-user-gear me-2"></i>
                        Perfil de Usuario
                    </h5>
                </div>

                <div className="card-body d-flex flex-column gap-2 p-4">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pb-2">
                        <span className="fw-bold text-muted small text-uppercase">
                            <i className="fa-solid fa-fingerprint me-2"></i>Id de usuario
                        </span>
                        <p className="bg-dark text-white rounded-pill px-4 py-1 m-0">{perfil.id}</p>
                    </div>

                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pb-2">
                        <span className="fw-bold text-muted small text-uppercase">
                            <i className="fa-solid fa-envelope me-2"></i>Email
                        </span>
                        <p className="bg-dark text-white rounded-pill px-4 py-1 m-0">{perfil.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
