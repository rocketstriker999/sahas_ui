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
        <div className="border-1  surface-border surface-card border-round">
            <div className='flex flex-column gap-2 p-3'>

                <div className='flex justify-content-left align-items-center gap-3'>
                    <Avatar label={testimony.userName[0]} size="large" shape="circle" />
                    <div>
                        <p className='text-600 text-sm m-0 mb-1'>{testimony.userName}</p>
                        <p className='text-600 text-xs m-0 font-bold'>{testimony.recordedDate}</p>
                    </div>

                </div>

                {/* <p className="text-800 text-sm">{user.userPurchases[0].userTestiMony.testiMony} {user.userPurchases[0].userTestiMony.testiMony}</p> */}

                <p className="text-800 text-sm line-height-3">{testimony.testimony}</p>

                <div className='flex justify-content-left align-items-center gap-2'>
                    <i className="pi pi-face-smile text-800" style={{ fontSize: '1.2rem' }} ></i>
                    <p className='text-800 text-sm m-0 font-bold'>{testimony.productName}</p>
                </div>


            </div>
        </div>
    </div>);
}