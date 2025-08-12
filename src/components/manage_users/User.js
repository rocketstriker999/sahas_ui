import { useParams } from "react-router-dom";
import { TabView, TabPanel } from "primereact/tabview";
import ProfileCard from "../dashboard/ProfileCard";
import { useAppContext } from "../../providers/ProviderAppContainer";
import { useCallback, useEffect, useState } from "react";
import Loading from "../common/Loading";
import NoContent from "../common/NoContent";

import Basics from "./user/Basics";
import Inquiries from "./user/Inquieries";

export default function User() {
    const { userId } = useParams();
    const { requestAPI, showToast } = useAppContext();

    const [loading, setLoading] = useState();
    const [updating, setUpdating] = useState();

    const [error, setError] = useState();
    const [user, setUser] = useState();

    const [activetab, setActiveTab] = useState(0);

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

    const updateUser = useCallback(
        (user) => {
            requestAPI({
                requestPath: `users/${user?.id}`,
                requestMethod: "PUT",
                requestPostBody: user,
                setLoading: setUpdating,
                onResponseReceieved: (user, responseCode) => {
                    if (user && responseCode === 200) {
                        setUser(user);
                        showToast({ severity: "success", summary: "Updated", detail: "Profile Updated Succesfully", life: 1000 });
                    } else {
                        showToast({ severity: "error", summary: "Failed", detail: "Failed To Updated Profile !", life: 2000 });
                    }
                },
            });
        },
        [requestAPI, showToast]
    );

    if (loading) {
        return <Loading message="Fetching User Profile" />;
    }

    if (error) {
        return <NoContent error={error} />;
    }

    if (user)
        return (
            <>
                <div className="px-2">
                    <ProfileCard {...user} showViewMore={false} />
                </div>
                {updating ? (
                    <Loading className="my-4" message="Updating..." />
                ) : (
                    <TabView
                        activeIndex={activetab}
                        onTabChange={(e) => setActiveTab(e.index)}
                        pt={{
                            panelContainer: { className: "p-0" },
                        }}
                    >
                        <TabPanel header="Profile" leftIcon="pi pi-user mr-2">
                            <Basics user={user} updateUser={updateUser} />
                        </TabPanel>
                        <TabPanel header="Inquiries" leftIcon="pi pi-question mr-2">
                            <Inquiries user={user} updateUser={updateUser} />
                        </TabPanel>

                        <TabPanel header="Product Accesses" leftIcon="pi pi-folder-open mr-2">
                            <p className="m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur,
                                adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </TabPanel>
                        <TabPanel header="Device Requests" leftIcon="pi pi-tablet mr-2">
                            <p className="m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur,
                                adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </TabPanel>
                        <TabPanel header="Wallet" leftIcon="pi pi-wallet mr-2">
                            <p className="m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur,
                                adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </TabPanel>
                        <TabPanel header="Notes" leftIcon="pi pi-clipboard mr-2">
                            <p className="m-0">
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos
                                dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
                                mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore,
                                cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                            </p>
                        </TabPanel>
                    </TabView>
                )}
            </>
        );
}
