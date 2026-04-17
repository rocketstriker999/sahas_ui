import { TEXT_NORMAL, TEXT_SMALL } from "../../style";

const tips = [
    {
        title: "Report is a helpful direction",
        points: [
            "This report helps you understand your inner sense.",
            "It is a suggestion for the stream that best matches your personality.",
            "Ultimate decision should be taken by students and parents."
        ]
    },
    {
        title: "Do not choose stream by others opinion",
        points: [
            "Never select stream based on what others say.",
            "Focus more on what your inner self likes and matches with."
        ]
    },
    {
        title: "Avoid marketing inluenced decisions",
        points: [
            "Do not select stream based on advertisements like hoardings, TV, or newspapers.",
            "Avoid decisions based on other students' results and marketing.",
            "It could be a trap because many failed results remain hidden behind topper promotions."
        ]
    },
    {
        title: "How to choose teacher, guide, school, or coaching",
        points: [
            "Prioritize education quality: good teachers, study material, facilities, and strong student-parent engagement.",
            "Avoid student photos/result posters used for marketing; this is often misleading.",
            "Choose teachers and institutions that are innovative, create interest, and use modern learning methods."
        ]
    },
    {
        title: "Balance study with overall growth",
        points: [
            "Choose a stream where you can study well and also grow through activities, enjoyment, and social/family bonding."
        ]
    },
    {
        title: "Marks are important, but not everything",
        points: [
            "Along with marks, focus on knowledge, happiness in your stream, and happiness in life."
        ]
    }
];

export default function Tips() {
    return (
        <div className="flex-1 flex flex-column overflow-y-scroll p-2 md:p-3">
            <div className="surface-card border-1 surface-border border-round-xl p-3 md:p-4">
                <div className="flex align-items-center gap-2 mb-3">
                    <i className="pi pi-lightbulb text-yellow-500 text-xl" />
                    <h2 className={`m-0 text-900 font-bold ${TEXT_NORMAL}`}>PRO TIPS</h2>
                </div>
                <p className={`m-0 mb-3 text-color-secondary line-height-3 ${TEXT_SMALL}`}>
                    Read these tips carefully before finalizing your stream decision.
                </p>

                <div className="flex flex-column gap-3">
                    {tips.map((tip, index) => (
                        <div key={tip.title} className="surface-ground border-1 surface-border border-round-lg p-3">
                            <div className={`font-semibold text-900 mb-2 ${TEXT_NORMAL}`}>
                                {index + 1}. {tip.title}
                            </div>
                            <ul className={`m-0 pl-3 text-color-secondary line-height-3 ${TEXT_SMALL}`}>
                                {tip.points.map((point, pointIndex) => (
                                    <li key={`${tip.title}-${pointIndex}`}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
