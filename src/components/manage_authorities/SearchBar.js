import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { TEXT_SMALL } from "../../style";

export default function SearchBar({ search, setSearch, className }) {
    return (
        <div className={`p-inputgroup ${className}`}>
            <InputText value={search} placeholder="Search By Authority or Description" onChange={(e) => setSearch(e.target.value)}
                pt={{
                    root: { className: TEXT_SMALL },
                }} />
            <Button icon="pi pi-times" className="p-button-danger " disabled={!search} onClick={() => setSearch("")}
                pt={{
                    label: { className: TEXT_SMALL },
                }} />
        </div>
    );
}
