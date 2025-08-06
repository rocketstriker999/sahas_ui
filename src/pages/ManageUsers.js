import { useCallback, useEffect, useMemo, useState } from "react";
import PageTitle from "../components/common/PageTitle";
import { useAppContext } from "../providers/ProviderAppContainer";
import { Paginator } from "primereact/paginator";

// import Users from "../components/manage_users.js/Users";
// import FiltersDrawer from "../components/manage_users.js/FiltersDrawer";
import SearchBar from "../components/manage_users/SearchBar";
import FiltersDrawer from "../components/manage_users/FiltersDrawer";
import User from "../components/manage_users/User";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import AppliedFilters from "../components/manage_users/AppliedFilters";

export default function ManageUsers() {
    const title = useMemo(() => "Manage Users", []);
    const { requestAPI } = useAppContext();

    const [loading, setLoading] = useState();
    const [users, setUsers] = useState();
    const [error, setError] = useState();

    const [filters, setFilters] = useState();
    const [filtersDrawerVisibility, setFiltersDrawerVisibility] = useState();

    const [appliedFilters, setAppliedFilters] = useState();

    const limit = useMemo(() => 6, []);

    const [searchQuery, setSearchQuery] = useState({ limit, offSet: 0 });

    const applySearchQuery = useCallback(() => {
        const generatedSearchQuery = { limit };

        if (appliedFilters) {
            Object.keys(appliedFilters).forEach((key) => {
                generatedSearchQuery[key] = appliedFilters[key].map((selectedFilter) => selectedFilter.id).join(",");
            });
        }

        setSearchQuery((prev) => ({ ...prev, ...generatedSearchQuery }));
    }, [appliedFilters, limit]);

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

    return (
        <div className="flex flex-column h-screen">
            <PageTitle title={title} />
            <SearchBar disable={loading} setFiltersDrawerVisibility={setFiltersDrawerVisibility} setSearchQuery={setSearchQuery} />

            {searchQuery?.appliedFilters && <AppliedFilters appliedFilters={searchQuery.appliedFilters} />}

            <div className="flex-grow-1 p-2 ">
                {loading ? (
                    <Loading />
                ) : error || !users?.dataSet?.length ? (
                    <NoContent error="No Users Found" />
                ) : (
                    users?.dataSet?.map((user) => <User {...user} />)
                )}
            </div>

            <Paginator
                first={searchQuery?.offSet}
                rows={limit}
                totalRecords={users?.recordsCount}
                onPageChange={(e) => {
                    setSearchQuery((prev) => ({ ...prev, offSet: e.first }));
                }}
                template={{ layout: "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" }}
            />

            <FiltersDrawer
                filtersDrawerVisibility={filtersDrawerVisibility}
                setFiltersDrawerVisibility={setFiltersDrawerVisibility}
                filters={filters}
                appliedFilters={appliedFilters}
                setAppliedFilters={setAppliedFilters}
                applySearchQuery={applySearchQuery}
            />
        </div>
    );
}
