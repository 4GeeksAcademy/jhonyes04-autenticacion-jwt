import { Link } from "react-router-dom"
import { register } from "../services/api"
import { useState } from "react"
import { toast } from 'react-toastify'

export const Register = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (inputs.password !== inputs.passwordConfirm)
            return toast.error("Las contraseñas no coinciden", { position: 'top-center' })


        const usuarioGuardado = await register({ email: inputs.email, password: inputs.password })

        if (usuarioGuardado) {
            toast.success(
                <>
                    <span>¡Registro completado!</span>
                    <br />
                    <Link to={'/login'} className="btn btn-sm btn-light mt-2">Ir al Login</Link>
                </>,
                {
                    position: 'top-center',
                    autoClose: false,
                    closeOnClick: true
                }
            )
            setInputs({
                email: '',
                password: '',
                passwordConfirm: ''
            })
        }
    }

    return (
        <div className="container mt-5">
            <div className="card col-12 col-md-8 col-lg-5 mx-auto">
                <div className="card-header">
                    <div className="card-title">
                        <h3>Regístrate</h3>
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
                        <div className="form-group">
                            <label htmlFor="password-confirm" className="form-label fw-bold">Confirmar contraseña</label>
                            <input
                                type="password"
                                name="passwordConfirm"
                                className="form-control"
                                required
                                value={inputs.passwordConfirm}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                            <button type="submit" className="col-12 btn btn-primary">Regístrate</button>
                        </div>
                        <p className="text-center text-muted m-0 mt-3">Tienes cuenta? Haz click <Link to='/login' className="fw-bold">aquí</Link> para acceder</p>
                    </div>
                </form>
            </div>

        </div>
    )
}
