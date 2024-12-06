import { Skeleton } from "primereact/skeleton";
import { Divider } from "primereact/divider";

export default function FooterSkeleton() {
    return (
        <div className="text-white bg-black-alpha-90">
            {/* Title */}
            <div className="p-4">
                <Skeleton width="200px" height="20px" className="mb-2" />
            </div>
            <Divider className="m-0 w-auto mx-4" />

            {/* Links Section */}
            <div className="flex flex-wrap justify-content-between gap-2 md:gap-6 px-5 py-2 md:px-8 md:py-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="p-2">
                        {/* Section Title */}
                        <Skeleton width="100px" height="16px" className="mb-3" />
                        {/* Links */}
                        <div className="flex flex-column gap-2">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex flex-row items-center gap-2"
                                >
                                    <Skeleton shape="circle" width="16px" height="16px" />
                                    <Skeleton width="100px" height="16px" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <Divider className="m-0 w-auto mx-4" />

            {/* Organization Branches */}
            <div className="flex flex-wrap gap-2 md:gap-5 justify-center px-2 py-2 md:px-6 md:py-4">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="md:flex-1 p-2 text-center">
                        <Skeleton width="120px" height="16px" className="mb-2" />
                        <Skeleton width="200px" height="16px" className="mb-1" />
                        <Skeleton width="150px" height="16px" />
                    </div>
                ))}
            </div>

            <Divider className="m-0 w-auto mx-4" />

            {/* Footer Bottom */}
            <div className="flex flex-column justify-content-between md:flex-row gap-1 sm:gap-0 px-6 py-2 md:px-6 md:py-4">
                <Skeleton width="180px" height="16px" className="mb-1" />
                <Skeleton width="150px" height="16px" className="mb-1" />
                <Skeleton width="200px" height="16px" className="mb-1" />
            </div>


            {/* <div className="w-10 md:w-8 mb-4 p-3">
                    <Skeleton height="100px" width="100%" />
                </div> */}
        </div>
    );
};
