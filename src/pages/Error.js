export default function Error({ icon = "images/error.png", title = "OOPS ! There is an error", message = "There was some error" }) {
    return (
        <div className="text-center ">
            <img src={icon} alt="icon" className="w-16rem" />
            <p className="font-bold">{title}</p>
            <p className="text-xs">{message}</p>
        </div>
    );
}
