import { useNavigate } from "react-router-dom";
import { TEXT_NORMAL, TEXT_SMALL } from "../../style";
import { Button } from "primereact/button";

export default function ExploreResult() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-column align-items-center justify-content-center p-2 text-center">
            <img src="/images/form_submit.png" alt="forbidden" className="w-6rem lg:w-8rem" />
            <p className={`${TEXT_NORMAL} font-bold`}>C.S.A.T. Test Already Given</p>
            <p className={`${TEXT_SMALL} text-color-secondary text-center px-4`}>
                Your Result For C.S.A.T. is already published Or You Are Not Allowed To Attend Test
            </p>
            <Button icon="pi pi-clipboard" label="Explore Result" outlined onClick={() => navigate("../result")} />
        </div>
    );
}
