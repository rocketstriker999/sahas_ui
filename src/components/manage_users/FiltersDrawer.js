import { Sidebar } from "primereact/sidebar";
import { getFilterNameFormalized } from "../../utils";
import { MultiSelect } from "primereact/multiselect";
import { FloatLabel } from "primereact/floatlabel";
import NoContent from "../common/NoContent";
import { Button } from "primereact/button";
export default function FiltersDrawer({ filtersDrawerVisibility, setFiltersDrawerVisibility, filters, appliedFilters, setAppliedFilters, applySearchQuery }) {
    return (
        <Sidebar visible={filtersDrawerVisibility} onHide={() => setFiltersDrawerVisibility(false)}>
            <h2 className="mb-5">Filters</h2>
            {filters ? (
                Object.keys(filters)
                    .filter((key) => filters[key]?.length)
                    .map((key) => (
                        <FloatLabel className="w-full mb-5" key={key}>
                            <MultiSelect
                                value={appliedFilters?.[key]}
                                onChange={(e) => setAppliedFilters((prev) => ({ ...prev, [key]: e.value }))}
                                options={filters[key]}
                                optionLabel="title"
                                maxSelectedLabels={3}
                                className="w-full"
                            />
                            <label htmlFor="ms-cities">{getFilterNameFormalized(key)}</label>
                        </FloatLabel>
                    ))
            ) : (
                <NoContent error="No Filters Found" />
            )}

            <div className="flex gap-2">
                <Button
                    label="Clear"
                    disabled={appliedFilters && Object.keys(appliedFilters)?.length === 0}
                    onClick={() => setAppliedFilters()}
                    severity="danger"
                    icon="pi pi-times"
                    size="small"
                />
                <Button
                    label="Apply"
                    disabled={appliedFilters && Object.keys(appliedFilters)?.length === 0}
                    onClick={() => {
                        setFiltersDrawerVisibility(false);
                        applySearchQuery();
                    }}
                    severity="warning"
                    icon="pi pi-check"
                    size="small"
                />
            </div>
        </Sidebar>
    );
}
