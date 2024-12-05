export default function ErrorLogin({error}){

    return(

        <div className="font-bold flex gap-3 align-items-top justify-content-start mb-3 bg-red-200 text-800 text-sm p-3">
            <i className="pi pi-exclamation-circle text-lg"></i>
            <p className="flex-1 m-0 p-0">{error}</p>
        </div>

    )

}