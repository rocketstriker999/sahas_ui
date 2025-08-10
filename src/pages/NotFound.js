export default function NotFound() {
    return (
        <div className="flex flex-column align-items-center justify-content-center min-h-screen p-2 text-center">
            <img src="images/404-error.png" alt="forbidden" className="w-6rem lg:w-8rem" />
            <p className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">OOPS , Resource Not Found !</p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-color-secondary">We Didn't Find the Resource/Page You Are Looking For</p>
        </div>
    );
}
