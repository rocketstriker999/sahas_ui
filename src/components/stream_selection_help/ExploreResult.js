import { useNavigate } from "react-router-dom";
import { TEXT_NORMAL, TEXT_SMALL } from "../../style";
import { Button } from "primereact/button";

export default function ExploreResult() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-column align-items-center justify-content-center p-2 text-center">
            <img src="/images/form_submit.png" alt="forbidden" className="w-6rem lg:w-8rem" />
            <p className={`${TEXT_NORMAL} font-bold`}>Psychometric Test Already Given</p>
            <p className={`${TEXT_SMALL} text-color-secondary text-center px-4`}>
                Your Result For Psychometric Test is already published Or You Are Not Allowed To Attend Test
            </p>
            <Button icon="pi pi-clipboard" label="Explore Result" severity="warning"  onClick={() => navigate("../result")} />
        </div>
    );
}
