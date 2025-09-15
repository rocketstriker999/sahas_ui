export default function Category({ image, title, products_count }) {
    return (
        <div className="flex gap-2 align-items-center border-1 border-gray-300 border-round ">
            <img className="border-round-left" src={image} alt={title} />
            <div className="flex flex-column flex-1 gap-1">
                <span className="text-sm font-semibold">{title}</span>
                <div className="flex align-items-center gap-1 text-orange-800">
                    <i className="pi pi-book text-sm"></i>
                    <span className="m-0 p-0 text-xs">{`${products_count} Courses`}</span>
                </div>
            </div>

            <i className="pi pi-arrow-circle-right mr-3"></i>
        </div>
    );
}
