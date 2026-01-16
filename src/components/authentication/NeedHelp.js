import { useState } from "react";
import { Button } from "primereact/button";

export default function NeedHelp({ phone, email }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex justify-content-center align-items-center  gap-2">
      <Button
        label="Need help?"
        onClick={() => setOpen((prev) => !prev)}
        size="small"
        severity="secondary"
      />
      {open && (
        <div className="flex align-items-center gap-2">
          <Button
            label="Call"
            icon="pi pi-phone"
            size="small"
            severity="warning"
            onClick={() => window.open(`tel:${phone}`)}
          />

          <Button
            label="Email"
            icon="pi pi-envelope"
            size="small"
            severity="warning"
            onClick={() => window.open(`mailto:${email}`)}
          />
        </div>
      )}
    </div>
  );
}
