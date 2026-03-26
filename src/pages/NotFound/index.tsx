import { useNavigate } from "react-router-dom"

export default function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-[100vh] flex flex-col justify-center items-center gap-40">
            <div className="flex flex-col gap-5 justify-center items-center">
                <header className="text-3xl text-primary">Mathemathic Chatbot</header>
                <header className="font-bold text-4xl text-black">Page not found (404)</header>
            </div>

            <button className="btn btn-primary px-3 py-2 rounded-full text-primary-content" onClick={() => navigate('/')}>Go back to home page</button>
        </div>
    )
}