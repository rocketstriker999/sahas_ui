import { Divider } from "primereact/divider";
import TabHeader from "./TabHeader";
import { Tag } from "primereact/tag";

import { Accordion, AccordionTab } from "primereact/accordion";
import NoContent from "../../common/NoContent";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
export default function Inquieries({ user, updateUser }) {
    const { inquieries = [] } = user;

    const { courses = [] } = useSelector((state) => state.stateTemplateConfig?.global);

    return (
        <div>
            <TabHeader title="User's Inquiries & Notes" highlightOne={`Total - ${inquieries?.length} Inquiries`} />
            <Divider />
            <div className="px-3">
                {inquieries.length ? (
                    <Accordion>
                        {inquieries?.length ? (
                            inquieries.map((inquiry) => (
                                <AccordionTab
                                    key={inquiry.id}
                                    header={() => (
                                        <div className="flex align-items-center">
                                            <div className="flex-1 flex flex-column gap-2">
                                                <p className="m-0 p-0 text-sm">
                                                    {inquiry.id}. {courses?.find((course) => course.id === inquiry.product_id)?.title}
                                                </p>
                                                <p className="m-0 p-0 text-xs font-medium text-color-secondary">
                                                    <i className="pi text-xs pi-calendar"></i> {inquiry.created_on}
                                                </p>
                                            </div>
                                            <Tag severity={inquiry?.active ? "success" : "danger"} value={inquiry?.active ? "Active" : "Closed"} />
                                        </div>
                                    )}
                                >
                                    <div className="flex gap-2 align-items-center justify-content-end">
                                        <div></div>
                                        <Button className="w-2rem h-2rem" icon="pi pi-pencil" rounded severity="info" />
                                        <Button className="w-2rem h-2rem" icon="pi pi-trash" rounded severity="danger" />
                                    </div>
                                </AccordionTab>
                            ))
                        ) : (
                            <NoContent error={"No Inquiries Found"} />
                        )}
                    </Accordion>
                ) : (
                    <NoContent error={"No Inquiries Found"} />
                )}
            </div>
        </div>
    );
}
