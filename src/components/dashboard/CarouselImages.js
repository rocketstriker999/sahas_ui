import { Button } from "primereact/button";
import { useCallback, useState } from "react";
import DialogAddCarouselItem from "./DialogAddCarouselItems";
import Image from "./Carousel/Image";
import { Carousel } from "primereact/carousel";
import { classNames } from "primereact/utils";
import { TEXT_SIZE_NORMAL } from "../../style";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../constants";

export default function CarouselImages({ className, images }) {
  const [dialogAddCarouselItem, setDialogAddCarouselItem] = useState({
    visible: false,
  });

  const closeDialogAddCarouselItem = useCallback(() => {
    setDialogAddCarouselItem((prev) => ({ ...prev, visible: false }));
  }, []);

  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  return (
    <div
      className={`flex flex-column align-items-center justify-content-center border-bottom-3 border-purple-500 shadow-2 bg-white border-round-bottom-xl overflow-hidden ${className}`}
    >
      {!!images?.length && (
        <Carousel
          value={images}
          numVisible={2}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          className="w-full"
          circular
          autoplayInterval={3000}
          showNavigators={true}
          itemTemplate={Image}
          pt={{
            indicators: classNames("py-2"),
            nextButton: classNames("bg-gray-800 text-white border-circle mx-2"),
            previousButton: classNames(
              "bg-gray-800 text-white border-circle mx-2"
            ),
          }}
        />
      )}

      <HasRequiredAuthority
        requiredAuthority={AUTHORITIES.MANAGE_FEATURE_CAROUSEL}
      >
        <div className="p-2">
          <Button
            className="p-button-sm border-round-lg shadow-2"
            label="Add Slider Item"
            icon="pi pi-plus"
            severity="warning"
            onClick={() =>
              setDialogAddCarouselItem((prev) => ({
                ...prev,
                visible: true,
                closeDialog: closeDialogAddCarouselItem,
              }))
            }
            pt={{
              icon: { className: TEXT_SIZE_NORMAL },
            }}
          />
        </div>
      </HasRequiredAuthority>

      {dialogAddCarouselItem?.visible && (
        <HasRequiredAuthority
          requiredAuthority={AUTHORITIES.MANAGE_FEATURE_CAROUSEL}
        >
          <DialogAddCarouselItem {...dialogAddCarouselItem} />
        </HasRequiredAuthority>
      )}
    </div>
  );
}
