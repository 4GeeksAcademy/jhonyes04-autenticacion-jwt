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
        <div className="container mt-5">
            <div className="card col-3 mx-auto">
                <div className="card-header">
                    <h5 className="card-text">Perfil de usuario</h5>
                </div>
                <div className="card-body d-flex flex-column gap-2">
                    <div className="d-flex">
                        <span className="fw-bold">Id de usuario</span>
                        <p className="ms-auto m-0">{perfil.id}</p>
                    </div>
                    <div className="d-flex">
                        <span className="fw-bold">Email</span>
                        <p className="ms-auto m-0">{perfil.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
