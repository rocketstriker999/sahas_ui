import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { TEXT_SIZE_SMALL } from "../../style";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Selection() {
    const { testCatalogue, testSelection, setTestSelection } = useOutletContext();

    const navigate = useNavigate();

    return (
        <div className="p-2">
            <span className="p-2 border-round text-sm text-gray-700 border-1 border-orange-300  bg-orange-100">Select Following To Continue Self Test</span>

            <FloatLabel className="mt-6">
                <Dropdown
                    value={testSelection?.course}
                    inputId="courses"
                    options={testCatalogue}
                    optionLabel="title"
                    className="w-full"
                    onChange={(e) => setTestSelection((prev) => ({ ...prev, course: e.value }))}
                    pt={{
                        label: { className: TEXT_SIZE_SMALL },
                        item: { className: TEXT_SIZE_SMALL },
                    }}
                />
                <label htmlFor="courses" className={`${TEXT_SIZE_SMALL}`}>
                    Course
                </label>
            </FloatLabel>

            {testSelection?.course && (
                <FloatLabel className="mt-5">
                    <Dropdown
                        value={testSelection?.subject}
                        inputId="courses"
                        options={testSelection?.course?.subjects}
                        optionLabel="title"
                        className="w-full"
                        onChange={(e) => setTestSelection((prev) => ({ ...prev, subject: e.value }))}
                        pt={{
                            label: { className: TEXT_SIZE_SMALL },
                            item: { className: TEXT_SIZE_SMALL },
                        }}
                    />
                    <label htmlFor="courses" className={`${TEXT_SIZE_SMALL}`}>
                        Subject
                    </label>
                </FloatLabel>
            )}

            {testSelection?.subject && (
                <FloatLabel className="mt-5">
                    <MultiSelect
                        value={testSelection?.chapters}
                        inputId="chapters"
                        options={testSelection?.subject?.chapters}
                        optionLabel="title"
                        className="w-full"
                        onChange={(e) => setTestSelection((prev) => ({ ...prev, chapters: e.value }))}
                        pt={{
                            label: { className: TEXT_SIZE_SMALL },
                            item: { className: TEXT_SIZE_SMALL },
                        }}
                    />
                    <label htmlFor="chapters" className={`${TEXT_SIZE_SMALL}`}>
                        Chapters
                    </label>
                </FloatLabel>
            )}

            {testSelection?.course && testSelection?.subject && testSelection?.chapters?.length && (
                <Button
                    onClick={() => {
                        navigate("../appear");
                    }}
                    className="mt-3 w-full"
                    label="Start Self Test"
                    icon="pi pi-arrow-right"
                    iconPos="right"
                />
            )}
        </div>
    );
}
