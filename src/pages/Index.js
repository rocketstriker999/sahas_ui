import { Button } from "primereact/button";
import imageSahas from "../assets/images/logo.svg";
import { InputText } from "primereact/inputtext";

export default function Index({ pageConfig }) {
    //carousel

    //sahas smart studeis header

    return (
        <div className="bg-blue-500 w-full sm:px-2  shadow-3 text-white flex align-items-center justify-content-center py-2  md:gap-4">
            <div className="hidden sm:hidden lg:block   ">
                <img
                    className="block sm:max-w-14rem md:max-w-16rem  shadow-3"
                    src="https://i.postimg.cc/8Py2VyYh/Screenshot-from-2025-06-08-18-31-2.png"
                    alt="Sahas Institute"
                />
            </div>
            <div className="hidden sm:block ">
                <img
                    className="block sm:max-w-14rem md:max-w-16rem  shadow-3"
                    src="https://i.postimg.cc/8Py2VyYh/Screenshot-from-2025-06-08-18-31-2.png"
                    alt="Sahas Institute"
                />
            </div>
            <div className="md:border-1 px-4   md:px-2 md:shadow-3">
                <div className="flex flex-column align-items-center gap-2 my-4 md:gap-3 ">
                    <img src={imageSahas} alt="Sahas Institute" />
                    <p className="font-bold text-xl m-0">Institute Of Commerce</p>
                    <ul className="m-0 p-0 ml-2 font-semibold text-sm hidden md:block">
                        <li className="mt-1">Start Digital Journey With Sahas Institute</li>
                        <li className="mt-1">Access Application With Your Credentials</li>
                    </ul>

                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-envelope"></i>
                        </span>
                        <InputText placeholder="Email Address" />
                        <Button className="p-button-warning" icon="pi pi-arrow-right" severity="warning" />
                    </div>
                </div>
            </div>
        </div>
    );
}
