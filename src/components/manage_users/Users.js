import { useEffect, useMemo, useState } from "react";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { Paginator } from "primereact/paginator";
import SearchBar from "./users/SearchBar";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import HasRequiredAuthority from "../dependencies/HasRequiredAuthority";
import FiltersDrawer from "./users/FiltersDrawer";
import User from "./users/User";
import { Button } from "primereact/button";

export default function Users() {
    const { requestAPI } = useAppContext();

    const [loading, setLoading] = useState();
    const [users, setUsers] = useState();
    const [error, setError] = useState();

    const [filters, setFilters] = useState();
    const [filtersDrawerVisibility, setFiltersDrawerVisibility] = useState();

    const limit = useMemo(() => 5, []);

    const [searchQuery, setSearchQuery] = useState({ limit, offSet: 0 });

    //Initially We need to fetch all the filters
    useEffect(() => {
        requestAPI({
            requestMethod: "GET",
            requestPath: `filters/users`,
            setLoading: setLoading,
            onResponseReceieved: (filters, responseCode) => {
                if (filters && responseCode === 200) {
                    return setFilters(filters);
                }
                setError("Failed to Fetch Filters");
            },
        });
    }, [requestAPI]);

    //Fetch The Users
    useEffect(() => {
        requestAPI({
            requestMethod: "GET",
            requestPath: `users`,
            requestGetQuery: searchQuery,
            onRequestStart: setUsers,
            setLoading: setLoading,
            onResponseReceieved: (users, responseCode) => {
                if (users?.dataSet?.length && responseCode === 200) {
                    return setUsers(users);
                }
            },
        });
    }, [requestAPI, searchQuery]);

    const countAppliedFilters = useMemo(() => {
        const { search, limit, offSet, ...appliedFilters } = searchQuery;

        return Object.keys(appliedFilters).length;
    }, [searchQuery]);

    return (
        <>
            <HasRequiredAuthority requiredAuthority="USE_FEATURE_USERS_SEARCH">
                <SearchBar
                    countAppliedFilters={countAppliedFilters}
                    disable={loading}
                    setFiltersDrawerVisibility={setFiltersDrawerVisibility}
                    setSearchQuery={setSearchQuery}
                />
            </HasRequiredAuthority>

            <div className="flex-grow-1 p-2 ">
                {loading ? (
                    <Loading />
                ) : error || !users?.dataSet?.length ? (
                    <NoContent error="No Users Found" />
                ) : (
                    users?.dataSet?.map((user) => <User key={user?.id} {...user} />)
                )}
            </div>

            <Button className="shadow-3 align-self-end mx-2" icon="pi pi-plus" rounded severity="warning" aria-label="Cancel" />

            {!loading && (
                <Paginator
                    first={searchQuery?.offSet}
                    rows={limit}
                    totalRecords={users?.recordsCount}
                    onPageChange={(e) => {
                        setSearchQuery((prev) => ({ ...prev, offSet: e.first }));
                    }}
                    template={{
                        layout: "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
                        CurrentPageReport: (options) => (
                            <span className="text-center text-sm w-8rem">
                                {options.first} - {options.last} of {options.totalRecords}
                            </span>
                        ),
                    }}
                />
            )}

            <FiltersDrawer
                filtersDrawerVisibility={filtersDrawerVisibility}
                setFiltersDrawerVisibility={setFiltersDrawerVisibility}
                filters={filters}
                setSearchQuery={setSearchQuery}
            />
        </>
    );
}
