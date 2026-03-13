export default function LoadingPage() {
    return(
        <div className="w-full h-[80vh] flex flex-col justify-center items-center">
            <span className="h-full loading loading-spinner loading-xl bg-primary"/>
            <header className="font-bold text-4xl text-primary">LOADING</header>
        </div>
    )
}