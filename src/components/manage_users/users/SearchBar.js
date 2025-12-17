import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { Badge } from "primereact/badge";
import { TEXT_SIZE_NORMAL } from "../../../style";

export default function SearchBar({ disable, setFiltersDrawerVisibility, setSearchQuery, countAppliedFilters }) {
    const [search, setSearch] = useState("");

    return (
        <div className="relative mt-1">
            {countAppliedFilters > 0 && <Badge severity="warning" className="absolute top-0 left-0 z-2 mx-1" value={countAppliedFilters}></Badge>}

            <div className="p-inputgroup  p-2 ">
                <Button
                    icon="pi pi-filter-fill"
                    className="p-button-secondary "
                    onClick={() => setFiltersDrawerVisibility(true)}
                    disabled={disable}
                    pt={{
                        icon: { className: TEXT_SIZE_NORMAL },
                    }}
                />

                <InputText
                    value={search}
                    placeholder="Search By Email, Name or Phone"
                    onChange={(e) => setSearch(e.target.value)}
                    disabled={disable}
                    pt={{
                        root: { className: TEXT_SIZE_NORMAL },
                    }}
                />
                <Button
                    icon="pi pi-search"
                    className="p-button-warning"
                    disabled={!search || disable}
                    onClick={() => setSearchQuery((prev) => ({ ...prev, search }))}
                    pt={{
                        icon: { className: TEXT_SIZE_NORMAL },
                    }}
                />
                {search && (
                    <Button
                        icon="pi pi-times"
                        className="p-button-danger "
                        disabled={!search || disable}
                        onClick={() => {
                            setSearch("");
                            setSearchQuery((prev) => ({ ...prev, search: "", offSet: 0 }));
                        }}
                        pt={{
                            icon: { className: TEXT_SIZE_NORMAL },
                        }}
                    />
                )}
            </div>
        </div>
    );
}
