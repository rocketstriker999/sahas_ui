import { useEffect } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useDispatch, useSelector } from "react-redux";
import { setProductsCatelogue } from "../../redux/sliceProductsCatelogue";

export default function RequiresProductsCatelogue({ children }) {
    const { requestAPI, setApplicationError, setLoading, loading } = useAppContext();

    const productsCatelogue = useSelector((state) => state.stateProductsCatelogue);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!productsCatelogue && !loading)
            requestAPI({
                requestPath: "catelogue",
                setLoading: (loading) => setLoading(loading ? { message: "Loading Products Catelogue..." } : loading),
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
    }, [productsCatelogue, requestAPI, setApplicationError, loading, setLoading, dispatch]);

    if (productsCatelogue) return children;
}
