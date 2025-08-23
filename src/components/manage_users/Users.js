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
import { useSelector } from "react-redux";

export default function Users() {
    const { requestAPI } = useAppContext();

    const { roles = [] } = useSelector((state) => state.stateTemplateConfig?.global);
    const { courses = [] } = useSelector((state) => state.stateTemplateConfig?.global);
    const { branches = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const [loading, setLoading] = useState();
    const [users, setUsers] = useState();
    const [error, setError] = useState();

    const [filters, setFilters] = useState({
        roles,
        courses,
        branches,
    });
    const [filtersDrawerVisibility, setFiltersDrawerVisibility] = useState();

    const limit = useMemo(() => 7, []);

    const [searchQuery, setSearchQuery] = useState({ limit, offSet: 0 });

    //Initially We need to fetch all the filters
    useEffect(() => {
        requestAPI({
            requestMethod: "GET",
            requestPath: `filters/users`,
            setLoading: setLoading,
            onResponseReceieved: (filters, responseCode) => {
                if (filters && responseCode === 200) {
                    return setFilters((prev) => ({ ...prev, ...filters }));
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
        <div className="flex flex-column h-full overflow-hidden">
            <HasRequiredAuthority requiredAuthority="USE_FEATURE_USERS_SEARCH">
                <SearchBar
                    countAppliedFilters={countAppliedFilters}
                    disable={loading}
                    setFiltersDrawerVisibility={setFiltersDrawerVisibility}
                    setSearchQuery={setSearchQuery}
                />
            </HasRequiredAuthority>

            <div className="flex-1 min-h-0 overflow-hidden overflow-y-scroll p-2 bg-gray-100">
                {loading ? (
                    <Loading />
                ) : error || !users?.dataSet?.length ? (
                    <NoContent error="No Users Found" />
                ) : (
                    users?.dataSet?.map((user) => <User key={user?.id} {...user} />)
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
