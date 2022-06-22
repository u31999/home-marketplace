import {Navigate, Outlet} from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinners from './Spinners'

function PrivateRoute() {
    const {loggedIn, chekingStatus} = useAuthStatus()

    if(chekingStatus) {
        return <Spinners />
    }

  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PrivateRoute
