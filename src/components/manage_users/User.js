import { TabView, TabPanel } from "primereact/tabview";

import Basics from "./user/Basics";
import { hasRequiredAuthority } from "../../utils";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Inquiries from "./user/Inquiries";

export default function User() {
    const { userId } = useParams();

    const { authorities = [] } = useSelector((state) => state.stateUser);
    const { courses = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    const { branches = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    return (
        <TabView
            pt={{
                panelContainer: { className: "p-0" },
            }}
        >
            <TabPanel header="Basics" leftIcon="pi pi-user mr-2" visible={hasRequiredAuthority(authorities, "READ_USERS_BASICS")}>
                <Basics userId={userId} branches={branches} authorities={authorities} />
            </TabPanel>

            <TabPanel header="Inquiries" leftIcon="pi pi-question mr-2">
                <Inquiries userId={userId} branches={branches} authorities={authorities} courses={courses} />
            </TabPanel>

            <TabPanel header="Product Accesses" leftIcon="pi pi-folder-open mr-2">
                <p className="m-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                    inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam
                    eius modi.
                </p>
            </TabPanel>
            <TabPanel header="Device Requests" leftIcon="pi pi-tablet mr-2">
                <p className="m-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                    inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam
                    eius modi.
                </p>
            </TabPanel>
            <TabPanel header="Wallet" leftIcon="pi pi-wallet mr-2">
                <p className="m-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                    inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam
                    eius modi.
                </p>
            </TabPanel>
            <TabPanel header="Notes" leftIcon="pi pi-clipboard mr-2">
                <p className="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et
                    quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est
                    laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
                    cumque nihil impedit quo minus.
                </p>
            </TabPanel>
            <TabPanel header="Roles" leftIcon="pi pi-id-card mr-2">
                <p className="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et
                    quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est
                    laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
                    cumque nihil impedit quo minus.
                </p>
            </TabPanel>
        </TabView>
    );
}
