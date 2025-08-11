export default function Forbidden() {
    return (
        <div className="text-center p-2">
            <img src="/images/forbidden.png" alt="forbidden" className="w-6rem lg:w-8rem" />
            <p className="font-bold">Access Restricted - Forbidden</p>
            <p className="text-xs text-color-secondary">OOPS ! You Don't Have Authority To Access The Resource</p>
        </div>
    );
}
