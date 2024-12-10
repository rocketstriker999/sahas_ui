import { Fragment } from "react";
import CarouselHeader from "../components/dashboard/CarouselHeader";
import Catelogue from "../components/dashboard/Catelogue";

export default function Dashboard() {
    return (
        <Fragment>
            <CarouselHeader />
            <Catelogue />
        </Fragment>
    );
}
