import { Avatar } from 'primereact/avatar';

export default function Testimony({ className, testimony }) {

    //const date = new Date(user.userPurchases[0].purchasedAt);
    // Extract the day, month, and year
    //const day = String(date.getDate()).padStart(2, '0');
    //const month = String(date.getMonth() + 1).padStart(2, '0');
    //const year = date.getFullYear();

    // Format the date as dd-mm-yyyy
    //const formattedDate = `${day}-${month}-${year}`;


    return (<div className={className} >
        <div className="border-1 surface-border surface-card border-round shadow-2 hover:shadow-4 flex flex-column h-15rem">
            <div className="flex justify-content-left align-items-center gap-3 p-3 surface-border">
                <Avatar label={testimony.userName[0]} size="large" shape="circle" />
                <div className="overflow-hidden text-overflow-ellipsis white-space-nowrap w-10">
                    <p className="text-600 w-auto m-0 mb-1 text-sm md:text-lg white-space-nowrap overflow-hidden text-overflow-ellipsis">
                        {testimony.userName}</p>
                    <p className='text-600 m-0 font-bold text-xs md:text-sm'>{testimony.recordedDate}</p>
                </div>
            </div>

            {/* <p className="text-800 text-sm">{user.userPurchases[0].userTestiMony.testiMony} {user.userPurchases[0].userTestiMony.testiMony}</p> */}

            <div className="flex-grow-1 p-3 break-word max-h-8rem">
                <p className="text-800 text-sm line-height-3 lg:text-base m-0 overflow-hidden text-overflow-ellipsis"
                    style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                    }}>
                    {testimony.testimony}
                </p>


                {/* <div class="surface-overlay white-space-nowrap overflow-hidden text-overflow-ellipsis"
                    style={{
                        width: "auto",
                        display: "block",
                        lineHeight: "1.5em",
                        maxHeight: "4.5em",

                    }} >
                    {testimony.testimony}
                </div> */}
            </div>
            <div className="flex justify-content-left align-items-center gap-2 p-3 border-top-1 surface-border">
                <i className="pi pi-face-smile text-800 text-xl"></i>
                <p className="text-800 text-sm m-0 font-bold lg:text-base">
                    {testimony.productName}
                </p>
            </div>


        </div>
    </div>
    );
}