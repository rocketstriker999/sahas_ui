import useAPI from "../../hooks/useAPI";
import Testimony from "./Testimony";
import { DataView } from 'primereact/dataview';


export default function Testimonies(){

    const [topTestiMonies, isLoadingTopTestiMonies, errorTopTestiMonies] = useAPI({ requestPath: "ui-config/top-testimonies" });

    const listTemplate = (topTestiMonies) => {

        if (!topTestiMonies || topTestiMonies.length === 0 ) {
            return <p className='text-color-secondary text-center m-6 font-bold'>No Content Found !</p>
        }

        return (
            <div className="grid grid-nogutter">
                {topTestiMonies.map((testimony, index) =>
                    <Testimony className="p-2 col-12 sm:col-4 lg:col-3 xl:col-3"  testimony={testimony} key={testimony.testimonyId} />)}
            </div>
        );
    };

    return (

        <>
            <h1 className="font-bold text-800">See what others are achieving through learning</h1>
            <DataView
                unstyled={true}
                value={topTestiMonies}
                listTemplate={listTemplate}
                layout='grid'
            />
        </>

    )

    
}