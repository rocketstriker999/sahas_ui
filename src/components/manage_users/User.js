import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import ProfileCard from "../dashboard/ProfileCard";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";

export default function User() {
    const { userId } = useParams();

    const { requestAPI } = useAppContext();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        requestAPI({
            requestPath: `users/${userId}`,
            setLoading: setLoading,
            onResponseReceieved: (user, responseCode) => {
                if (user && responseCode === 200) {
                    setUser(user);
                } else setError("Failed To Fetch User Profile");
            },
        });
    }, [requestAPI, userId]);

    if (loading) {
        return <Loading message="Fetching User Profile" />;
    }

    if (error) {
        return <NoContent error={error} />;
    }

    const arr = [];

    if (user)
        return (
            <>
                <div className="px-2">
                    <ProfileCard {...user} showViewMore={false} />
                </div>
                <TabView>
                    <TabPanel header="Profile" leftIcon="pi pi-user mr-2">
                        <div className="px-2">
                            <li>User's Basic Details and Profile</li>
                            <div className="pt-4 flex flex-column gap-1">
                                <FloatLabel className="mt-1">
                                    <InputText id="fullname" className="w-full" />
                                    <label htmlFor="fullname">Full Name</label>
                                </FloatLabel>
                                <FloatLabel className="mt-4">
                                    <InputText id="phone" className="w-full" />
                                    <label htmlFor="phone">Phone</label>
                                </FloatLabel>
                                <FloatLabel className="mt-4">
                                    <Dropdown inputId="dd-city" options={arr} optionLabel="name" className="w-full" />
                                    <label htmlFor="dd-city">Branch</label>
                                </FloatLabel>

                                <FloatLabel className="mt-4">
                                    <InputTextarea id="description" rows={5} cols={30} className="w-full" />
                                    <label htmlFor="description">Address</label>
                                </FloatLabel>

                                <div className="px-3 border-1 border-gray-300 border-round mt-3 flex align-items-center">
                                    <p className="flex-1">Active</p>
                                    <InputSwitch checked={true} />
                                </div>

                                <Button className="mt-3" label="Update" severity="warning" />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Inquiries" leftIcon="pi pi-question mr-2">
                        <p className="m-0">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
                            velit, sed quia non numquam eius modi.
                        </p>
                    </TabPanel>
                    <TabPanel header="Product Accesses" leftIcon="pi pi-folder-open mr-2">
                        <p className="m-0">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
                            velit, sed quia non numquam eius modi.
                        </p>
                    </TabPanel>
                    <TabPanel header="Device Requests" leftIcon="pi pi-tablet mr-2">
                        <p className="m-0">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
                            velit, sed quia non numquam eius modi.
                        </p>
                    </TabPanel>
                    <TabPanel header="Wallet" leftIcon="pi pi-wallet mr-2">
                        <p className="m-0">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
                            velit, sed quia non numquam eius modi.
                        </p>
                    </TabPanel>
                    <TabPanel header="Notes" leftIcon="pi pi-clipboard mr-2">
                        <p className="m-0">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos
                            dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia
                            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
                            nobis est eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </TabPanel>
                </TabView>
            </>
        );
}
