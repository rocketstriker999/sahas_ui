
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { setCurrentUser, removeCurrentUser } from '../../redux/sliceAuth';

import { useDispatch } from 'react-redux';

export default function Login() {

    const dispatch = useDispatch();

    //const userData = useSelector((state) => state.authState.user);

    return <Card title="Login">
        <p className="m-0">
            Login Card
        </p>
        <Button onClick={() => {
            dispatch(setCurrentUser({ name: "U1", groups: ["USER"] }))
        }} label='login as user'></Button>
        <Button onClick={() => {
            dispatch(setCurrentUser({ name: "U2", groups: ["USER","FADMIN"]}))
        }} label='login as fadmin'></Button>
        <Button onClick={() => {
            dispatch(setCurrentUser({ name: "U2", groups: ["USER","FADMIN","HADMIN"] }))
        }} label='login as hadmin'></Button>

    </Card>
}