import NoContent from "../common/NoContent";

export default function Operations({ operationsSections }) {
    return operationsSections?.length ? (
        <div className="px-2 mt-3">
            {operationsSections?.map((section) => {
                return (
                    <div className=" border-round bg-gray-100 border-1 border-gray-300">
                        <p className="m-0 py-3 px-2  font-semibold">{section?.title}</p>

                        <div className="grid grid-nogutter	 ">
                            {section?.operations?.map((operation) => {
                                return (
                                    <div className="col-3  flex flex-column gap-1 align-items-center p-2  ">
                                        <i className={`pi ${operation?.icon} border-circle bg-gray-800	p-3 text-white`} style={{ fontSize: "1.25rem" }}></i>
                                        <p className="p-0 m-0 text-xs ">{operation?.title}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    ) : (
        <NoContent error="No Operations Found" />
    );
}
