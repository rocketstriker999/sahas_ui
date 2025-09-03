import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function SearchBar({ search, setSearch, className }) {
    return (
        <div className={`p-inputgroup ${className}`}>
            <InputText value={search} placeholder="Search By Authority or Description" onChange={(e) => setSearch(e.target.value)} />
            <Button icon="pi pi-times" className="p-button-danger " disabled={!search} onClick={() => setSearch("")} />
        </div>
    );
}
