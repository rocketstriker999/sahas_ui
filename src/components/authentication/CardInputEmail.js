import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { APP_NAME } from "../../constants";
import Error from "../common/Error";
import { TEXT_SIZE_NORMAL, TITLE_TEXT } from "../../style";

export default function CardInputEmail({ email, setEmail, requestOTP }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div
      className="surface-card
        w-full
        sm:w-12
        md:w-12
        lg:max-w-60rem 
        mx-auto
        shadow-8
        border-round-2xl
        overflow-hidden
        grid
        grid-nogutter
        relative"
    >
      <div className="col-12 lg:col-6 flex align-items-center justify-content-center relative overflow-hidden p-0 min-h-15rem">
        <img
          src="/images/banner.jpg"
          alt="background"
          className="absolute top-0 left-0 w-full h-full object-cover blur-image scale-125 opacity-60 z-0"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black-alpha-10 z-1" />

        <img
          src="/images/banner.jpg"
          alt="banner"
          className="relative w-full h-full z-2 object-contain max-h-20rem"
        />
      </div>

      <div className="col-12 lg:col-6 p-4 lg:px-4 lg:py-7 flex flex-column justify-content-center bg-white z-2">
        <div className="flex flex-column align-items-center text-center w-full">
          <div className="mb-4 lg:mb-5">
            <div className={TITLE_TEXT}>{APP_NAME}</div>
          </div>

          <Avatar
            icon="pi pi-user"
            size="large"
            shape="circle"
            className="bg-orange-50 text-orange-500 mb-3 shadow-1 w-4rem h-4rem"
          />

          <p
            className={`p-0 m-0 font-semibold text-700 ${TEXT_SIZE_NORMAL} mt-2 mb-5`}
          >
            Verify Your User Credentials
          </p>

          <div className="w-full p-fluid">
            <div className="field mb-4">
              <span className="p-input-icon-left w-full">
                <i className="pi pi-envelope text-500 ml-2 text-xl" />
                <InputText
                  autoFocus
                  placeholder="Enter Your Email"
                  className="w-full h-3rem pl-5 pr-3 text-base border-round-lg"
                  disabled={loading}
                  value={email || ""}
                  onInput={(e) => setEmail(e.target.value)}
                  invalid={!!error}
                  keyfilter="email"
                />
              </span>
            </div>

            {error && (
              <Error
                className="w-full mb-3 justify-content-end"
                error={error}
              />
            )}

            <Button
              onClick={() => requestOTP(setLoading, setError)}
              className="w-full h-3rem text-base font-bold border-round-lg"
              severity="warning"
              label="Continue With Email"
              icon="pi pi-arrow-right"
              iconPos="right"
              disabled={loading}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
