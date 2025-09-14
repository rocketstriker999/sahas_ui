import { useDispatch, useSelector } from "react-redux";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useEffect } from "react";
import { setTemplateConfig } from "../../redux/sliceTemplateConfig";

export default function RequiresTemplateConfiguration({ children }) {
    const { requestAPI, setApplicationError, setApplicationLoading, applicationLoading } = useAppContext();

    const templateConfig = useSelector((state) => state.stateTemplateConfig);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!templateConfig && !applicationLoading) {
            requestAPI({
                requestPath: "template-configs",
                setLoading: (loading) => setApplicationLoading(loading ? { message: "Loading Template Configuration..." } : loading),
                onRequestFailure: (error) =>
                    setApplicationError({
                        title: "No Template Configuration",
                        message: `Unable To Load Template Configuration - ${error}`,
                    }),
                onResponseReceieved: (templateConfig, responseCode) => {
                    if (templateConfig && responseCode === 200) {
                        return dispatch(setTemplateConfig(templateConfig));
                    }

                    throw new Error("Invalid Template Configuration Response");
                },
            });
        }
    }, [dispatch, requestAPI, setApplicationError, applicationLoading, setApplicationLoading, templateConfig]);

    if (templateConfig) {
        return children;
    }
}
