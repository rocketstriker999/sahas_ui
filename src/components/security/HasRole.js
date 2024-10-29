import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

export default function HasRole({ requiredRole, children }) {

    const userData = useSelector((state) => state.authState.user);

    if(userData){
        
        return requiredRole.includes(userData.role) ? children : <Navigate to='/forbidden' />
    }
    else{
        //ask for login
        return <Navigate to='/login' />
    }
    
}