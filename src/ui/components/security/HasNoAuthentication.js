import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function HasNoAuthentication({ children }) {

    const userData = useSelector((state) => state.stateAuth.user);

    return userData? <Navigate to='/' /> : children

}