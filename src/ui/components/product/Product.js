
import { Image } from 'primereact/image';
import { Rating } from "primereact/rating";
import { classNames } from 'primereact/utils';

import productStyle from './product.module.css'

export default function Product({ className, imageURL, title, ratings, buyers, price, publisher, isTrending }) {


    return <div className={className} >
        <div className={classNames("border-1  surface-border surface-card border-round cursor-pointer",productStyle.product_card)}>
            <Image src={imageURL} width='100%' alt="product" />
            <div className='flex flex-column gap-2 p-3'>
                <p className="font-bold text-800 text-base m-0">{title}</p>
                <p className="text-sm text-color-secondary m-0">{publisher}</p>
                <div className='flex align-items-center gap-1'>
                    <p className="font-bold text-primary m-0 text-sm">{ratings}.2</p>
                    <Rating pt={
                        {
                            root: {
                                className: classNames('gap-0')
                            },
                            item: {
                                className: classNames('justify-content-center align-items-center')
                            },
                            officon: {
                                className: classNames('w-8 h-8')
                            },
                            onicon: {
                                className: classNames('w-8 h-8')
                            }

                        }

                    } value={2} disabled cancel={false} />
                    <p className="text-color-secondary m-0 text-xs">({buyers})</p>
                </div>
                <p className="font-bold text-800 text-base m-0"><i className="pi pi-indian-rupee text-xs font-bold" ></i>{price}</p>


            </div>
        </div>
    </div>
}