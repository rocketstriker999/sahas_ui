import { useSelector } from "react-redux";
import Operations from "../components/dashboard/Operations";
import { useAppContext } from "../providers/ProviderAppContainer";
import { Badge } from "primereact/badge";
import CarouselImages from "../components/dashboard/CarouselImages";
import { TEXT_SIZE_NORMAL } from "../style";

export default function Dashboard() {
  const { isDevelopmentBuild, deviceFingerPrint } = useAppContext();

  const pageConfig = useSelector(
    (state) => state.stateTemplateConfig?.dash_board
  );

  return (
    <div className="flex flex-column h-full overflow-hidden">
      <div className="bg-blue-800 shadow-3 text-white flex align-items-center justify-content-between p-2 lg:px-8 ">
        <div className="w-8">
          <p
            className={`text-base sm:text-lg md:text-lg lg:text-2xl m-0 font-semibold`}
          >
            Welcome To Sahas Smart Studies
          </p>
          {isDevelopmentBuild && (
            <div
              className={`text-xs sm:text-sm md:sm lg:text-lg mt-1 bg-blue-800 text-white white-space-nowrap text-overflow-ellipsis overflow-hidden`}
            >
              Device ID - {deviceFingerPrint}
            </div>
          )}
        </div>
        <div>
          <i className={`pi pi-bell p-overlay-badge mr-2 ${TEXT_SIZE_NORMAL} `}>
            <Badge value="2" severity="warning"></Badge>
          </i>
          <i
            className={`pi pi-send p-overlay-badge mr-2 mx-5 ${TEXT_SIZE_NORMAL} `}
          >
            <Badge value="2" severity="warning"></Badge>
          </i>
        </div>
      </div>

      <CarouselImages
        className={"mb-2 lg:px-8 "}
        images={pageConfig?.carousel_images}
      />
      <Operations
        className={"mx-2 mt-2 lg:px-8 flex-1 min-h-0 overflow-scroll"}
      />
    </div>
  );
}
