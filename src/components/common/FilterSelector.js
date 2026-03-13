import { FloatLabel } from "primereact/floatlabel";
import { MultiSelect } from "primereact/multiselect";
import { TEXT_SIZE_SMALL } from "../../style";
import { getFilterNameFormalized } from "../../utils";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { classNames } from "primereact/utils";
import moment from "moment";

export default function FilterSelector({ selectedFilters, setSelectedFilters, filter }) {
    if (filter?.type === "DROP_DOWN")
        return (
            <FloatLabel className="w-full mb-5">
                <Dropdown
                    value={selectedFilters?.[filter?.key]}
                    onChange={(e) => setSelectedFilters((prev) => ({ ...prev, [filter?.key]: e.value }))}
                    options={filter?.options}
                    optionLabel="title"
                    className="w-full"
                    pt={{
                        label: { className: TEXT_SIZE_SMALL },
                        item: { className: TEXT_SIZE_SMALL },
                    }}
                />
                <label>{getFilterNameFormalized(filter?.title)}</label>
            </FloatLabel>
        );

    if (filter?.type === "MULTI_SELECT")
        return (
            <FloatLabel className="w-full mb-5">
                <MultiSelect
                    value={selectedFilters?.[filter?.key]}
                    onChange={(e) => setSelectedFilters((prev) => ({ ...prev, [filter?.key]: e.value }))}
                    options={filter?.options}
                    optionLabel="title"
                    maxSelectedLabels={3}
                    className="w-full"
                    pt={{
                        label: { className: TEXT_SIZE_SMALL },
                        item: { className: TEXT_SIZE_SMALL },
                    }}
                />
                <label>{getFilterNameFormalized(filter?.title)}</label>
            </FloatLabel>
        );

    if (filter?.type === "DATE_RANGE_PICKER") {
        console.log([selectedFilters?.[`${filter?.key}_start`], selectedFilters?.[`${filter?.key}_end`]]);

        return (
            <FloatLabel className="w-full mb-5">
                <Calendar
                    className="w-full"
                    value={selectedFilters?.[filter?.key]}
                    onChange={(e) => setSelectedFilters((prev) => ({ ...prev, [filter?.key]: e.value }))}
                    selectionMode="range"
                    readOnlyInput
                    hideOnRangeSelection
                    dateFormat="dd/mm/yy"
                />
                <label>{getFilterNameFormalized(filter?.title)}</label>
            </FloatLabel>
        );
    }
}
