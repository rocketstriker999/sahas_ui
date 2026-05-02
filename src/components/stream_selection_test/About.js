import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { TEXT_NORMAL, TEXT_SMALL, TEXT_SUBTITLE } from "../../style";

export default function About() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 overflow-y-auto p-3">
            <Card className="surface-card border-1 surface-border border-round-xl shadow-1">
                <div className="flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                    <div className={`font-semibold text-900 ${TEXT_SUBTITLE}`}>About Psychometric Test</div>
                    <Tag value="Stream Selection Test" severity="info" />
                </div>

                <p className={`m-0 text-color-secondary line-height-3 ${TEXT_NORMAL}`}>
                    This assessment helps identify streams that best match your personality, interests, and natural strengths.
                    It is designed to guide your academic direction with data-backed feedback.
                </p>

                <Divider />

                <div className="w-full mb-3 border-round-lg overflow-hidden border-1 surface-border bg-black">
                    <iframe
                        className="w-full border-none block"
                        style={{ aspectRatio: "16 / 9", minHeight: "12rem" }}
                        src="https://www.youtube.com/embed/-FdiGPcoPnY?si=3SLWD9vRetpXiuT_&autoplay=1&mute=1"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>

                <div className="grid">
                    <div className="col-12">
                        <div className="p-3 border-1 surface-border border-round-lg h-full">
                            <div className={`font-semibold mb-2 ${TEXT_NORMAL}`}>How it works</div>
                            <ul className={`m-0 pl-3 text-color-secondary line-height-3 ${TEXT_SMALL}`}>
                                <li>Answer all questions honestly based on your natural preference.</li>
                                <li>Your responses are analyzed to estimate stream suitability.</li>
                                <li>You receive a suggested stream and detailed analysis.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="p-3 border-1 surface-border border-round-lg h-full">
                            <div className={`font-semibold mb-2 ${TEXT_NORMAL}`}>Before you begin</div>
                            <ul className={`m-0 pl-3 text-color-secondary line-height-3 ${TEXT_SMALL}`}>
                                <li>Take the test in one go without rushing.</li>
                                <li>Avoid random answers for accurate recommendations.</li>
                                <li>Use the final analysis to compare streams confidently.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="text-right mt-2">
                    <Button
                        label="Attend Test"
                        icon="pi pi-play"
                        severity="warning"
                        onClick={() => navigate("../enroll")}
                    />

                </div>



            </Card>
        </div>
    );
}
