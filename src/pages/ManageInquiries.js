import PageTitle from "../components/common/PageTitle";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../providers/ProviderAppContainer";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import HasRequiredAuthority from "../components/dependencies/HasRequiredAuthority";
import { AUTHORITIES } from "../constants";
import Download from "../components/manage_users/users/Dowload";
import Loading from "../components/common/Loading";
import NoContent from "../components/common/NoContent";
import { Paginator } from "primereact/paginator";
import { TEXT_SIZE_SMALL } from "../style";
import FiltersDrawer from "../components/manage_users/users/FiltersDrawer";
import SearchBar from "../components/common/SearchBar";
import InquiryCard from "../components/manage_inquiries/InquiryCard";

export default function ManageInquiries() {
    const { requestAPI } = useAppContext();

    const { courses = [] } = useSelector((state) => state.stateTemplateConfig?.global);
    const { branches = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const [loading, setLoading] = useState();
    const [inquiries, setInquiries] = useState();
    const [error, setError] = useState();

    const [filters, setFilters] = useState();
    const [filtersDrawerVisibility, setFiltersDrawerVisibility] = useState();

    //limit page size to 7
    const limit = useMemo(() => 5, []);

    const [searchQuery, setSearchQuery] = useState({ limit, offSet: 0 });

    //Initially We need to fetch all the filters
    useEffect(() => {
        if (!filters?.length)
            requestAPI({
                requestMethod: "GET",
                requestPath: `filters/inquiries`,
                setLoading: setLoading,
                onResponseReceieved: (filters, responseCode) => {
                    if (filters && responseCode === 200) {
                        return setFilters([
                            { title: "Inquired Courses", key: "courses", options: courses, type: "MULTI_SELECT" },
                            { title: "Inquired Branches", key: "branches", options: branches, type: "MULTI_SELECT" },
                            ...filters,
                        ]);
                    }
                    setError("Failed to Fetch Filters");
                },
            });
    }, [branches, courses, filters, requestAPI, inquiries]);

    //Fetch The Inquiries
    useEffect(() => {
        requestAPI({
            requestMethod: "GET",
            requestPath: `inquiries`,
            requestGetQuery: searchQuery,
            onRequestStart: setInquiries,
            setLoading: setLoading,
            onResponseReceieved: (users, responseCode) => {
                if (users?.dataSet?.length && responseCode === 200) {
                    return setInquiries(users);
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
            <PageTitle title={"Manage Inquiries"} action={<div className="flex gap-3 align-items-center"></div>} />
            <div className="flex-1 min-h-0 overflow-hidden">
                <HasRequiredAuthority requiredAuthority={AUTHORITIES.USE_PAGE_USERS}>
                    <div className="flex flex-column h-full overflow-hidden">
                        <div className="flex align-items-center p-2 gap-1">
                            <SearchBar
                                className={"flex-1"}
                                countAppliedFilters={countAppliedFilters}
                                disable={loading}
                                setFiltersDrawerVisibility={setFiltersDrawerVisibility}
                                setSearchQuery={setSearchQuery}
                            />
                            {inquiries?.recordsCount > 0 && <Download entity="inquiries" searchQuery={searchQuery} />}
                        </div>

                        <div className="flex-1 min-h-0  overflow-y-scroll p-2 bg-gray-100">
                            {loading ? (
                                <Loading />
                            ) : error || !inquiries?.dataSet?.length ? (
                                <NoContent error="No Inquiries Found" />
                            ) : (
                                inquiries?.dataSet?.map((inquiry) => <InquiryCard key={inquiry?.id} {...inquiry} />)
                            )}
                        </div>

                        {!loading && (
                            <Paginator
                                first={searchQuery?.offSet}
                                rows={limit}
                                totalRecords={inquiries?.recordsCount}
                                onPageChange={(e) => {
                                    setSearchQuery((prev) => ({ ...prev, offSet: e.first }));
                                }}
                                template={{
                                    layout: "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
                                    CurrentPageReport: (options) => (
                                        <span className={`text-center w-8rem ${TEXT_SIZE_SMALL}`}>
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
                </HasRequiredAuthority>
            </div>
        </div>
    );
}
