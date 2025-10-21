import { Sidebar } from "primereact/sidebar";
import { MultiSelect } from "primereact/multiselect";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { useState } from "react";
import NoContent from "../../common/NoContent";
import { getFilterNameFormalized } from "../../../utils";
import { TITLE_TEXT, TEXT_SIZE_SMALL } from "../../../style";

export default function FiltersDrawer({ filtersDrawerVisibility, setFiltersDrawerVisibility, filters, setSearchQuery }) {
    const [selectedFilters, setSelectedFilters] = useState();

    return (
        <Sidebar visible={filtersDrawerVisibility} onHide={() => setFiltersDrawerVisibility(false)}>
            <h2 className={`${TITLE_TEXT} mb-5`}>Filters</h2>
            {filters ? (
                Object.keys(filters)
                    .filter((key) => filters[key]?.length)
                    .map((key) => (
                        <FloatLabel className="w-full mb-5" key={key}>
                            <MultiSelect
                                value={selectedFilters?.[key]}
                                onChange={(e) => setSelectedFilters((prev) => ({ ...prev, [key]: e.value }))}
                                options={filters[key]}
                                optionLabel="title"
                                maxSelectedLabels={3}
                                className="w-full"
                                pt={{
                                    label: { className: TEXT_SIZE_SMALL },
                                    item: { className: TEXT_SIZE_SMALL },
                                }}
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
                    disabled={selectedFilters && Object.keys(selectedFilters)?.length === 0}
                    onClick={() => setSelectedFilters()}
                    severity="danger"
                    icon="pi pi-times"
                    pt={{
                        label: { className: TEXT_SIZE_SMALL },
                    }}
                />
                <Button
                    label="Apply"
                    disabled={selectedFilters && Object.keys(selectedFilters)?.length === 0}
                    onClick={() => {
                        setFiltersDrawerVisibility(false);

                        setSearchQuery((prev) => {
                            //remove previous set of filters
                            if (filters)
                                Object.keys(filters).forEach((key) => {
                                    delete prev[key];
                                });

                            if (selectedFilters)
                                Object.keys(selectedFilters).forEach((key) => {
                                    prev[key] = selectedFilters[key].map((selectedFilter) => selectedFilter.id).join(",");
                                });

                            //put new values
                            return { ...prev };
                        });
                    }}
                    severity="warning"
                    icon="pi pi-check"
                    pt={{
                        label: { className: TEXT_SIZE_SMALL },
                    }}
                />
            </div>
        </Sidebar>
    );
}
