export default function Courses() {
    return (
        !!courses?.length && (
            <div>
                <Divider className="mt-0" />

                <div className="px-2 flex flex-column gap-2 ">
                    {courses?.map((course) => (
                        <div className="text-xs font-semibold  border-1 border-orange-300 p-2 border-round bg-orange-100 text-orange-800 m-0 flex gap-2">
                            <span className="flex-1">{course?.title}</span>
                            <HasRequiredAuthority requiredAuthority={AUTHORITIES.MANAGE_COURSES}>
                                {!updatingViewIndex && (
                                    <ProgressiveControl
                                        loading={deleting}
                                        control={<IconButton icon={"pi-trash"} color={"text-red-500"} onClick={deleteCoursesContainer} />}
                                    />
                                )}
                            </HasRequiredAuthority>
                            <span className="pi pi-angle-right"></span>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
}
