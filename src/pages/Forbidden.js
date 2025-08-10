export default function Forbidden() {
    return (
        <div className="flex flex-column align-items-center justify-content-center min-h-screen p-2 text-center">
            <img src="images/forbidden.png" alt="forbidden" className="w-6rem lg:w-8rem" />
            <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">Access Restricted - Forbidden</p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-color-secondary">OOPS ! You Don't Have Authority To Access The Resource</p>
        </div>
    );
}
