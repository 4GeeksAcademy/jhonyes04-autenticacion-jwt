import { Link, useNavigate } from "react-router-dom"
import { register } from "../services/api"
import { useState } from "react"
import { toast } from 'react-toastify'

export const Register = () => {
    const datosIniciales = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirm: ''
    }
    const navigate = useNavigate()
    const [cargando, setCargando] = useState(false)
    const [inputs, setInputs] = useState(datosIniciales)

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

        setCargando(true)

        try {
            const usuarioGuardado = await register(inputs)

            if (usuarioGuardado) {
                navigate('/login')
                setInputs(datosIniciales)
            } else {
                setCargando(false)
            }
        } catch (error) {
            setCargando(false)
            toast.error("Hubo un error en el registro", {
                position: 'top-center',
                autoClose: 2000,
                closeOnClick: true
            })
        }

    }

    return (
        <div className="container my-2">
            <div className="card col-12 col-md-8 col-lg-5 mx-auto">
                <div className="card-header">
                    <div className="card-title">
                        <h3>Regístrate</h3>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body d-flex flex-column gap-3">
                        <div className="form-floating">
                            <input
                                type="text"
                                name="firstname"
                                className="form-control"
                                placeholder="Nombre"
                                required
                                value={inputs.firstname}
                                onChange={handleChange}
                            />
                            <label htmlFor="firstname">Nombre</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="text"
                                name="lastname"
                                className="form-control"
                                placeholder="Nombre"
                                required
                                value={inputs.lastname}
                                onChange={handleChange}
                            />
                            <label htmlFor="lastname">Apellidos</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="email"
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
                        <div className="form-floating">
                            <input
                                type="password"
                                name="passwordConfirm"
                                className="form-control"
                                placeholder="Confirmar contraseña"
                                required
                                value={inputs.passwordConfirm}
                                onChange={handleChange}
                            />
                            <label htmlFor="password-confirm">Confirmar contraseña</label>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex flex-column flex-md-row justify-content-center">
                            <button
                                type="submit"
                                className="col-12 btn btn-primary"
                                disabled={cargando}
                            >
                                {cargando ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">
                                        </span>
                                        Registrando...
                                    </>
                                ) : ("Regístrate")}
                            </button>
                        </div>
                        <p className="text-center text-muted m-0 mt-3">Tienes cuenta? Haz click <Link to='/login' className="fw-bold">aquí</Link> para acceder</p>
                    </div>
                </form>
            </div>

        </div>
    )
}
