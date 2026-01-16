import { useState } from "react";
import { Button } from "primereact/button";

export default function NeedHelp({ phone, email }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex flex-column align-items-center gap-2">
      <Button
        label="Need help?"
        className="p-button-text p-button-sm text-white-alpha-90"
        onClick={() => setOpen(true)}
      />

      {open && (
        <>
          <a
            href={`tel:${phone}`}
            className="p-button p-button-sm p-button-secondary no-underline flex align-items-center gap-2"
          >
            <i className="pi pi-phone" />
            <span className="font-bold">Call</span>
          </a>

          <a
            href={`mailto:${email}`}
            className="p-button p-button-sm p-button-secondary no-underline flex align-items-center gap-2"
          >
            <i className="pi pi-envelope" />
            <span className="font-bold">Email</span>
          </a>
        </>
      )}
    </div>
  );
}
