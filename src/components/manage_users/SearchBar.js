import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";

export default function SearchBar({ disable, setFiltersDrawerVisibility, setSearchQuery }) {
    const [search, setSearch] = useState("");

    return (
        <div className="p-inputgroup  p-2">
            <InputText value={search} placeholder="Search By Email, Name or Phone" onChange={(e) => setSearch(e.target.value)} disabled={disable} />
            <Button
                icon="pi pi-search"
                className="p-button-warning"
                disabled={!search || disable}
                onClick={() => setSearchQuery((prev) => ({ ...prev, search }))}
            />
            {search && (
                <Button
                    icon="pi pi-times"
                    className="p-button-danger"
                    disabled={!search || disable}
                    onClick={() => {
                        setSearch("");
                        setSearchQuery((prev) => ({ ...prev, search: "", offSet: 0 }));
                    }}
                />
            )}

            <Button icon="pi pi-filter-fill" className="p-button-secondary" onClick={() => setFiltersDrawerVisibility(true)} disabled={disable} />
        </div>
    );
}
