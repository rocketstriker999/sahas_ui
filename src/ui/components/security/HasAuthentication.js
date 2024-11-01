import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function HasAuthentication({ children }) {

    const userData = useSelector((state) => state.stateAuth.user);

    return userData? children :<Navigate to='/login' />

}