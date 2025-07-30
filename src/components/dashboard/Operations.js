import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function Operations() {
    const { authorities = [] } = useSelector((state) => state.stateUser);

    const operationsSections = useMemo(() => {
        const configOperations = [
            {
                title: "Student's Corner",
                operations: [
                    {
                        title: "Courses",
                        icon: "pi-video",
                        required_authority: "USE_PAGE_COURSES",
                    },
                    {
                        title: "Devices",
                        icon: "pi-mobile",
                        required_authority: "A2",
                    },
                ],
            },
            {
                title: "Category 2",
                operations: [],
            },
        ];

        return configOperations.reduce((acc, item) => {
            const operations = item?.operations?.filter((operation) => authorities.includes(operation?.required_authority));
            if (operations?.length) {
                acc.push({ ...item, operations });
            }

            return acc;
        }, []);
    }, [authorities]);

    return (
        <div className="mt-3">
            {operationsSections?.map((section) => {
                return (
                    <div className=" border-round bg-gray-100 border-1 border-gray-300" key={section?.title}>
                        <p className="m-0 py-3 px-2  font-semibold">{section?.title}</p>

                        <div className="grid grid-nogutter">
                            {section?.operations?.map((operation) => {
                                return (
                                    <div className="col-3  flex flex-column gap-1 align-items-center p-2 " key={operation?.title}>
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
    );
}
