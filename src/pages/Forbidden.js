import { TEXT_SIZE_NORMAL, TEXT_SIZE_SMALL } from "../style";

export default function Forbidden() {
    return (
        <div className="flex flex-column align-items-center justify-content-center min-h-screen p-2 text-center">
            <img src="/images/forbidden.png" alt="forbidden" className="w-6rem lg:w-8rem" />
            <p className={`${TEXT_SIZE_NORMAL} font-bold`}>Access Restricted - Forbidden</p>
            <p className={`${TEXT_SIZE_SMALL} text-color-secondary`}>OOPS ! You Don't Have Authority To Access The Resource</p>
        </div>
    );
}
