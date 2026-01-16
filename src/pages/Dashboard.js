import { useDispatch, useSelector } from "react-redux";
import Operations from "../components/dashboard/Operations";
import { useAppContext } from "../providers/ProviderAppContainer";
import { Badge } from "primereact/badge";
import CarouselImages from "../components/dashboard/CarouselImages";
import { TEXT_SIZE_NORMAL } from "../style";
import { TEXT_SIZE_SMALL, TITLE_TEXT } from "../style";
import HasRequiredAuthority from "../components/dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../constants";
import { DialogDashboard } from "../components/dashboard/DialogDashboard";
import { updateDashboardDialog } from "../redux/sliceTemplateConfig";

export default function Dashboard() {
  const { isDevelopmentBuild, deviceFingerPrint } = useAppContext();

  const pageConfig = useSelector(
    (state) => state.stateTemplateConfig?.dash_board
  );

    const dispatch = useDispatch();

    return (
        <div className="flex flex-column h-full overflow-hidden">
            <div className="bg-blue-800 shadow-3 text-white flex align-items-center gap-3 p-2">
                <div className="w-8 flex-1">
                    <p className={`${TITLE_TEXT} m-0 font-semibold`}>Welcome To Sahas Smart Studies</p>
                    {isDevelopmentBuild && (
                        <div className={`${TEXT_SIZE_SMALL} mt-1 bg-blue-800 text-white white-space-nowrap text-overflow-ellipsis overflow-hidden`}>
                            Device ID - {deviceFingerPrint}
                        </div>
                    )}
                </div>

                <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_DASHBOARD_DIALOG}>
                    <i
                        className="pi pi-pen-to-square p-overlay-badge"
                        style={{ fontSize: "1.5rem" }}
                        onClick={() => dispatch(updateDashboardDialog({ active: true }))}
                    />
                </HasRequiredAuthority>

                <i className="pi pi-bell p-overlay-badge mr-2" style={{ fontSize: "1.5rem" }}>
                    <Badge value="2" severity="warning"></Badge>
                </i>
            </div>

            <CarouselImages className={"mb-2"} images={pageConfig?.carousel_images} />
            <Operations className={"mx-2 mt-2 flex-1 min-h-0 overflow-scroll"} />

            <DialogDashboard dialogDashboard={pageConfig?.dialog} />
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
