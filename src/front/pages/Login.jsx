import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../services/api"
import { toast } from 'react-toastify'

export const Login = () => {
    const navigate = useNavigate()
    const [cargando, setCargando] = useState(false)
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setCargando(true)

        try {
            const data = await login(inputs)

            if (data)
                navigate('/profile')
            else
                setCargando(false)

        } catch (error) {
            setCargando(false)
            toast.error(
                <span className="fw-bold">{error.message || 'Error al iniciar sesión'}</span>,
                {
                    position: 'top-center',
                    autoClose: 2000,
                    closeOnClick: true
                }
            )
        }
    }

    return (
        <div className="container mt-5">
            <div className="card col-12 col-md-8 col-lg-5 mx-auto">
                <div className="card-header">
                    <div className="card-title">
                        <h3>Identifícate</h3>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body d-flex flex-column gap-3">
                        <div className="form-floating">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                required
                                value={inputs.email}
                                onChange={handleChange}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Contraseña"
                                required
                                value={inputs.password}
                                onChange={handleChange}
                            />
                            <label htmlFor="password">Contraseña</label>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                            <button
                                type="submit"
                                className="col-12 btn btn-dark"
                                disabled={cargando}
                            >
                                {cargando ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Iniciando sesión...
                                    </>
                                ) : ("Inciciar sesión")}
                            </button>
                        </div>
                        <p className="text-center text-muted m-0 mt-3">No tienes cuenta? Haz click <Link to='/register' className="fw-bold">aquí</Link> para registrarte</p>
                    </div>
                </form>
            </div>

        </div>
    )
}
