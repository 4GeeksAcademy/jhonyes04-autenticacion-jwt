import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../services/api"
import { toast } from 'react-toastify'

export const Login = () => {
    const navigate = useNavigate()
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

        try {
            const data = await login(inputs)

            if (data) navigate('/profile')

        } catch (error) {
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
                        <div className="form-group">
                            <label htmlFor="email" className="form-label fw-bold">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                required
                                value={inputs.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label fw-bold">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                required
                                value={inputs.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                            <button type="submit" className="col-12 btn btn-dark">Iniciar sesión</button>
                        </div>
                        <p className="text-center text-muted m-0 mt-3">No tienes cuenta? Haz click <Link to='/register' className="fw-bold">aquí</Link> para registrarte</p>
                    </div>
                </form>
            </div>

        </div>
    )
}
