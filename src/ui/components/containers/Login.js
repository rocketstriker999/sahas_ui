
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
            dispatch(setCurrentUser({ name: "U1", role: "USER" }))
        }} label='login as user'></Button>
        <Button onClick={() => {
            dispatch(setCurrentUser({ name: "U2", role: "FADMIN", authorities: ["view_sec1", "view_sec2", "manage_firm", "manage_some_data"] }))
        }} label='login as fadmin'></Button>
        <Button onClick={() => {
            dispatch(setCurrentUser({ name: "U2", role: "HADMIN", authorities: ["view_sec1", "view_sec2", "manage_firm", "manage_some_data"] }))
        }} label='login as hadmin'></Button>

    </Card>
}