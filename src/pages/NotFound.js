import { TEXT_SIZE_NORMAL,TEXT_SIZE_SMALL } from "../styles";

export default function NotFound() {
    return (
        <div className="flex flex-column align-items-center justify-content-center min-h-screen p-2 text-center">
            <img src="images/404-error.png" alt="forbidden" className="w-6rem lg:w-8rem" />
            <p className={`${TEXT_SIZE_NORMAL} font-bold`}>OOPS , Resource Not Found !</p>
            <p className={`${TEXT_SIZE_SMALL} text-color-secondary`}>We Didn't Find the Resource/Page You Are Looking For</p>
        </div>
    );
}
