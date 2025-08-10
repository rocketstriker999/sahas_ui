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

export default function ManageUsers() {
    const title = useMemo(() => "Manage Users", []);
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
        <div className="flex flex-column h-screen">
            <PageTitle title={title} />
            <SearchBar
                countAppliedFilters={countAppliedFilters}
                disable={loading}
                setFiltersDrawerVisibility={setFiltersDrawerVisibility}
                setSearchQuery={setSearchQuery}
            />

            <div className="flex-grow-1 p-2 ">
                {loading ? (
                    <Loading />
                ) : error || !users?.dataSet?.length ? (
                    <NoContent error="No Users Found" />
                ) : (
                    users?.dataSet?.map((user) => <User {...user} />)
                )}
            </div>

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
        </div>
    );
}
