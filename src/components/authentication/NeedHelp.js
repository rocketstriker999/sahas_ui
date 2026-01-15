import { useState } from "react";
import { Button } from "primereact/button";

export default function NeedHelp({ phone, email }) {
  const [open, setOpen] = useState(false);

  // Common PrimeFlex + PrimeReact classes for the links
  const linkStyles = "p-button p-button-sm p-button-secondary no-underline flex align-items-center gap-2";

  return (
    <div className="w-full flex flex-column align-items-center gap-2">
      <Button
        label="Need help?"
        className="p-button-text p-button-sm text-white-alpha-90"
        onClick={() => setOpen((v) => !v)}
      />

      {open && (
        <div className="flex gap-3 fadein animation-duration-200">
          {/* Call Link */}
          <a href={`tel:${phone}`} className={linkStyles}>
            <i className="pi pi-phone"></i>
            <span className="font-bold">Call</span>
          </a>

          {/* Email Link */}
          <a href={`mailto:${email}`} className={linkStyles}>
            <i className="pi pi-envelope"></i>
            <span className="font-bold">Email</span>
          </a>
        </div>
      )}
    </div>
  );
}