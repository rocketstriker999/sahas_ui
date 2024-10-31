import { useSelector } from 'react-redux';

export default function HasAuthority({ requiredAuthority, children }) {

    const userData = useSelector((state) => state.authState.user);

    if (userData && userData.authorities.includes(requiredAuthority)) {
        return children
    }

}