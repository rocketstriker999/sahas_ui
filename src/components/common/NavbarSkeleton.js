import { Skeleton } from "primereact/skeleton";

export default function NavbarSkeleton() {
    return (
        <div className="w-10 md:w-8 mb-4">
            <Skeleton height="50px" width="100%" />
        </div>
    );
};
