import { Outlet, Navigate } from 'react-router-dom'
import { tokenValido } from '../services/validarToken'

export const ProtectedRoute = () => {
    const autenticado = tokenValido()

    return autenticado ? <Outlet /> : <Navigate to='/login' replace />
}
