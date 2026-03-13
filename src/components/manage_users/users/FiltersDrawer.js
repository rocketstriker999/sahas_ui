import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useState } from "react";
import NoContent from "../../common/NoContent";
import { TITLE_TEXT, TEXT_SIZE_SMALL } from "../../../style";
import FilterSelector from "../../common/FilterSelector";

export default function FiltersDrawer({ filtersDrawerVisibility, setFiltersDrawerVisibility, filters, setSearchQuery }) {
    const [selectedFilters, setSelectedFilters] = useState();

    return (
        <Sidebar visible={filtersDrawerVisibility} onHide={() => setFiltersDrawerVisibility(false)}>
            <h2 className={`${TITLE_TEXT} mb-5`}>Filters</h2>
            {filters?.length ? (
                filters.map((filter) => (
                    <FilterSelector key={filter?.key} filter={filter} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
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
                            filters?.forEach((filter) => delete prev[filter?.key]);

                            if (selectedFilters)
                                Object.keys(selectedFilters).forEach((key) => {
                                    //multiple objects
                                    if (Array.isArray(selectedFilters[key])) {
                                        return (prev[key] = selectedFilters[key].map((selectedFilter) => selectedFilter?.id || selectedFilter).join(","));
                                    }

                                    //single object
                                    prev[key] = selectedFilters[key]?.id;
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
