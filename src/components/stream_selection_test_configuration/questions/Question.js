import { Chip } from "primereact/chip";
import { Button } from "primereact/button";
import { useCallback, useState } from "react";
import { useAppContext } from "../../../providers/ProviderAppContainer";
import HasRequiredAuthority from "../../dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../../../constants";
import ProgressiveControl from "../../common/ProgressiveControl";

export default function Question({ id, question, options, setQuestions, setDialogEditQuestion }) {
    const [loading, setLoading] = useState();
    const { requestAPI, showToast } = useAppContext();

    const deletePolicy = useCallback(() => {
        requestAPI({
            requestPath: `stream-selection-questions/${id}`,
            requestMethod: "DELETE",
            setLoading,
            parseResponseBody: false,
            onResponseReceieved: (_, responseCode) => {
                if (responseCode === 204) {
                    showToast({ severity: "success", summary: "Deleted", detail: "Stream Selection Question Deleted", life: 1000 });
                    setQuestions((prev) => prev?.filter((question) => question?.id !== id));
                } else {
                    showToast({ severity: "error", summary: "Failed", detail: "Failed To Delete Stream Selection Question !", life: 2000 });
                }
            },
        });
    }, [id, requestAPI, setQuestions, showToast]);

    return (
        <div className="border-1 p-2 gap-2 flex flex-column border-gray-300 border-round">
            <div className="flex gap-1">
                <span className="font-semibold flex-1">
                    {id}.{question}
                </span>
                <HasRequiredAuthority requiredAuthority={AUTHORITIES.UPDATE_POLICY}>
                    <ProgressiveControl
                        loading={loading}
                        control={
                            <Button
                                className="w-2rem h-2rem"
                                icon="pi pi-pencil"
                                rounded
                                severity="warning"
                                onClick={() =>
                                    setDialogEditQuestion((prev) => ({
                                        ...prev,
                                        visible: true,
                                        setQuestions,
                                        id,
                                        question,
                                        options,
                                    }))
                                }
                            />
                        }
                    />
                </HasRequiredAuthority>

                <HasRequiredAuthority requiredAuthority={AUTHORITIES.DELETE_POLICY}>
                    <ProgressiveControl
                        loading={loading}
                        control={<Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" onClick={deletePolicy} />}
                    />
                </HasRequiredAuthority>
            </div>

            <div className="card flex flex-wrap gap-2">
                {options?.map(({ option }) => (
                    <Chip key={option} label={option} />
                ))}
            </div>
        </div>
    );
}
