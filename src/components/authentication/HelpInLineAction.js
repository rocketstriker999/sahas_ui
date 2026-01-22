import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
export default function HelpInLineAction() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex justify-content-center align-items-center gap-2 flex-wrap">
      <Button
        size="small"
        label="Need Help?"
        icon="pi pi-question-circle"
        className="bg-indigo-400"
        onClick={() => setVisible(true)}
      />

      <Dialog
        header="Need Help?"
        visible={visible}
        onHide={() => setVisible(false)}
        dismissableMask
        modal
        className="w-25rem"
      >
        <div className="flex flex-column gap-2">
          <Button
            size="small"
            label="Contact Us"
            icon="pi pi-phone"
            severity="secondary"
            onClick={() => {
              window.location.href = "tel:+919265343871";
            }}
          />

          <Button
            size="small"
            label="Email Us"
            icon="pi pi-envelope"
            severity="secondary"
            onClick={() =>
              (window.location.href = "mailto:support@sahasinstitute.com")
            }
          />
        </div>
      </Dialog>
    </div>
  );
}
