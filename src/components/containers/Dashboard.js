import { Fragment, useEffect, useState } from "react";
import CarouselHeader from "../dashboard/CarouselHeader";
import { requestAPI } from "../../utils/utils";
import ContainerSkeleton from "../common/Skeletons/Container";

export default function Dashboard() {
    return (
        <Fragment>
            <CarouselHeader />
        </Fragment>
    );
}
