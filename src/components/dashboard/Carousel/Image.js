import { Button } from "primereact/button";
import { useCallback, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import { useDispatch } from "react-redux";
import { removeCarouselImage } from "../../../redux/sliceTemplateConfig";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../constants";

export default function Image({ id, click_link, source }) {
  const { requestAPI, showToast } = useAppContext();
  const [deleting, setDeleting] = useState();
  const dispatch = useDispatch();

  const deleteCarouselImage = useCallback(() => {
    requestAPI({
      requestPath: `template-configs/dashboard/carousel-images/${id}`,
      requestMethod: "DELETE",
      setLoading: setDeleting,
      parseResponseBody: false,
      onResponseReceieved: (_, responseCode) => {
        if (responseCode === 200 || responseCode === 204) {
          showToast({
            severity: "success",
            summary: "Deleted",
            detail: "Image Removed",
            life: 1000,
          });
          dispatch(removeCarouselImage(id));
        }
      },
    });
  }, [dispatch, id, requestAPI, showToast]);
  return (
    <div className="relative w-full h-full bg-white border-round-xl overflow-hidden">
      <img
        onClick={() => click_link && window.open(click_link, "_blank")}
        src={source}
        alt="Carousel item"
        className="w-full h-full block cursor-pointer object-contain"
      />

      <HasRequiredAuthority
        requiredAuthority={AUTHORITIES.MANAGE_FEATURE_CAROUSEL}
      >
        <Button
          onClick={deleteCarouselImage}
          className="absolute top-0 right-0 m-3 shadow-2"
          icon="pi pi-trash"
          rounded
          severity="danger"
          loading={deleting}
          size="small"
        />
      </HasRequiredAuthority>
    </div>
  );
}
