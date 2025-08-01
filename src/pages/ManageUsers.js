import { Fragment, useEffect, useMemo, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAppContext } from "../providers/ProviderAppContainer";
import NoContent from "../components/common/NoContent";
import { getFilterNameFormalized } from "../utils";
import { Sidebar } from "primereact/sidebar";
import { MultiSelect } from "primereact/multiselect";
import { FloatLabel } from "primereact/floatlabel";

export default function ManageUsers() {
    const title = useMemo(() => "Manage Users", []);

    const { requestAPI } = useAppContext();

    const [loadingFilters, setLoadingFilters] = useState();

    const [filters, setFilters] = useState();

    const [query, setQuery] = useState();

    //Initially We need to fetch all the roles which are avaialabale to seach into
    useEffect(() => {
        requestAPI({
            requestMethod: "GET",
            requestPath: `filters/`,
            setLoading: setLoadingFilters,
            onResponseReceieved: (filters, responseCode) => {
                if (filters && responseCode === 200) {
                    setFilters(filters);
                }
            },
        });
    }, [requestAPI]);

    return (
        <Fragment>
            <PageTitle title={title} />
            <div className="p-2">
                <div className="p-inputgroup flex-1">
                    <InputText value={query} placeholder="Search By Email, Name or Phone" onInput={(e) => setQuery(e.target.value)} disabled={loadingFilters} />
                    <Button icon="pi pi-search" className="p-button-warning" disabled={loadingFilters} />
                    <Button
                        icon="pi pi-filter-fill"
                        className="p-button-secondary"
                        onClick={() => setFilters((prev) => ({ ...prev, buffer: prev?.selection, visible: true }))}
                        disabled={loadingFilters}
                    />
                </div>
            </div>
            <Sidebar visible={filters?.visible} onHide={() => setFilters((prev) => ({ ...prev, visible: false }))}>
                <h2 className="mb-5">Filters</h2>
                {filters ? (
                    Object.keys(filters)
                        .filter((key) => filters[key]?.length)
                        .map((key) => (
                            <FloatLabel className="w-full mb-5">
                                <MultiSelect
                                    value={filters?.buffer?.[key]}
                                    onChange={(e) => setFilters((prev) => ({ ...prev, buffer: { ...prev?.buffer, [key]: e.value } }))}
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
                        disabled={Object.keys(filters?.selection || {})?.length === 0}
                        onClick={() => setFilters((prev) => ({ ...prev, selection: false, visible: false }))}
                        severity="danger"
                        icon="pi pi-times"
                        size="small"
                    />
                    <Button
                        label="Apply"
                        disabled={Object.keys(filters?.buffer || {})?.length === 0}
                        onClick={() => setFilters((prev) => ({ ...prev, selection: prev?.buffer, visible: false }))}
                        severity="warning"
                        icon="pi pi-check"
                        size="small"
                    />
                </div>
            </Sidebar>
        </Fragment>
    );
}
