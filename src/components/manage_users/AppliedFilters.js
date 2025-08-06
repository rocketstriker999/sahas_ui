import { Chip } from "primereact/chip";
import { Tag } from "primereact/tag";

export default function AppliedFilters({ appliedFilters }) {
    return (
        <div className="flex gap-2 pl-2 ">
            <Tag severity="warning" value="Applied Filters" />

            {/* Scrollable Chip container */}
            <div className="flex-1 flex overflow-x-scroll gap-2 ">
                {Object.keys(appliedFilters).map((key) => (
                    <Chip
                        key={key}
                        className="text-xs !whitespace-nowrap  flex-shrink-0"
                        label={`${key} - ${appliedFilters[key].map((filter) => filter.title).join(",")}`}
                    />
                ))}
            </div>
        </div>
    );
}
