import { useEffect } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useDispatch, useSelector } from "react-redux";
import { setProductsCatelogue } from "../../redux/sliceProductsCatelogue";

export default function RequiresProductsCatelogue({ children }) {
    const { requestAPI, setApplicationError, setApplicationLoading, applicationLoading } = useAppContext();

    const productsCatelogue = useSelector((state) => state.stateProductsCatelogue);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!productsCatelogue && !applicationLoading)
            requestAPI({
                requestPath: "catelogue",
                setLoading: (loading) => setApplicationLoading(loading ? { message: "Loading Products Catelogue..." } : loading),
                onRequestFailure: (error) =>
                    setApplicationError({
                        title: "No Products Catelogue",
                        message: `Unable To Load Products Catelogue - ${error}`,
                    }),
                onResponseReceieved: (productsCatelogue, responseCode) => {
                    if (productsCatelogue && responseCode === 200) {
                        return dispatch(setProductsCatelogue(productsCatelogue));
                    }
                    throw new Error("Invalid Products Catelogue Response");
                },
            });
    }, [productsCatelogue, requestAPI, setApplicationError, applicationLoading, setApplicationLoading, dispatch]);

    if (productsCatelogue) return children;
}
