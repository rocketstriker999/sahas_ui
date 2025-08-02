import { useCallback, useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import { useAppContext } from "../../providers/ProviderAppContainer";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";

export default function Users({ filters }) {
    const { requestAPI } = useAppContext();
    const [loading, setLoading] = useState();
    const [first, setFirst] = useState(0);
    const [users, setUsers] = useState();
    const [error, setError] = useState();

    const prepareQueryByFilters = useCallback((filters) => {
        const filtersQuery = new URLSearchParams();

        const processedFilters = Object.keys(filters).reduce((accumulator, key) => {
            accumulator[key] = Array.isArray(filters[key]) ? filters[key].map((selection) => selection.id) : filters[key];
            return accumulator;
        }, {});

        Object.entries(processedFilters).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    filtersQuery.append(`${key}[]`, item);
                });
            } else {
                filtersQuery.append(key, value);
            }
        });

        return filtersQuery.toString();
    }, []);

    useEffect(() => {
        requestAPI({
            requestMethod: "GET",
            requestPath: `users?${prepareQueryByFilters(filters).toString()}`,
            setLoading,
            onRequestFailure: setError,
            onResponseReceieved: (users, responseCode) => {
                if (users && responseCode === 200) {
                    users?.length ? setUsers(users) : setError("No Users Found");
                }
            },
        });
    }, [filters, prepareQueryByFilters, requestAPI]);

    const onPageChange = (event) => {
        setFirst(event.first);
    };

    if (loading) {
        return <Loading message="Fetching Users..." />;
    }

    if (error) {
        return <NoContent error={error} />;
    }

    if (!loading && !error && users?.length) {
        return (
            <div>
                <p>data of users will be shown here</p>

                <Paginator
                    first={first}
                    rows={10}
                    totalRecords={50}
                    onPageChange={onPageChange}
                    template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
                />
            </div>
        );
    }
}
