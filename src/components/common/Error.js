export default function Error({ className, error = "There Was Some Error !" }) {
  return (
    <div className={`flex  align-items-center text-red-500 gap-2 ${className}`}>
      <i className="pi pi-exclamation-circle"></i>
      <span className=" text-xs ">{error}</span>
    </div>
  );
}
