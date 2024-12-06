import { Skeleton } from "primereact/skeleton";
import FooterSkeleton from "./FooterSkeleton";

export default function ContainerSkeleton() {
    return (
        <div className="flex flex-column align-items-center w-full">
            {/* <div className="w-10 md:w-8 mb-4">
                <Skeleton height="50px" width="100%" />
            </div> */}
            <div className="w-10 md:w-8 flex flex-column md:flex-row mb-4 p-3 gap-3">
                <div className="flex flex-column mr-3 gap-2 flex-1">
                    <Skeleton height="20px" width="100%" />
                    <Skeleton height="20px" width="90%" />
                    <Skeleton height="20px" width="80%" />
                </div>
                <div className="flex flex-1">
                    <Skeleton height="200px" width="100%" />
                </div>
            </div>
            <div className="w-10 md:w-8 mb-4 p-3">
                <Skeleton height="30px" width="70%" className="mb-4" />
                <div className="flex flex-wrap gap-3 justify-content-between">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="mb-3 w-12rem md:w-8rem">
                            <Skeleton height="150px" width="100%" className="mb-2" />
                            <Skeleton height="20px" width="80%" className="mb-1" />
                            <Skeleton height="20px" width="60%" />
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="w-10 md:w-8 mb-4 p-3">
                    <Skeleton height="100px" width="100%" />
                </div> */}
        </div>
    )
}