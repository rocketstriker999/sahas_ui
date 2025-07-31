export default function NotFound() {
    return (
        <div className="text-center p-2">
            <img src="images/404-error.png" alt="forbidden" className="w-6rem lg:w-8rem" />
            <p className="font-bold">OOPS , Resource Not Found !</p>
            <p className="text-xs text-color-secondary">We Didn't Find the Resource/Page You Are Looking For</p>
        </div>
    );
}
