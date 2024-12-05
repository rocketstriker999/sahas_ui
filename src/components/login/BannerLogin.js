import { Image } from 'primereact/image';

export default function BannerLogin({config}) {

    return (
        <div className="col-12 md:col-6 lg:col-6">
            <Image src={config.image} alt="Image" width="100%" height="100%" />
        </div>
    )

}