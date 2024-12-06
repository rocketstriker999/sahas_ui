import { Skeleton } from "primereact/skeleton";

export default function ButtonSkeleton() {
    return (
        <div className="w-full">
            <Skeleton
                shape="rectangle"
                width="100%"
                height="2.5rem"
                className="border-round"
            />
        </div>
    );
};
