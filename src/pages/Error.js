export default function Error({ icon = "images/error.png", title = "OOPS ! There is an error", message = "There was some error" }) {
    return (
        <div className="text-center p-2">
            <img src={icon} alt="icon" className="w-6rem lg:w-8rem" />
            <p className="font-bold">{title}</p>
            <p className="text-xs text-color-secondary	">{message}</p>
        </div>
    );
}
