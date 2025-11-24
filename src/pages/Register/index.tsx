export default function RegisterPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-neutral">
            <div className="w-[385px] h-auto rounded-[25px] bg-white shadow-sm flex flex-col items-center p-8 gap-5">
                <div className="flex flex-col items-center">
                    <header className="font-bold text-4xl text-primary">MATHEMATIC</header>
                    <header className="font-bold text-xl text-primary">CHATBOT</header>
                </div>
                <div className="flex flex-col w-full gap-5">
                    <div className="relative">
                        <input id="username" className="block border w-full border-neutral p-2 rounded-sm focus:border-primary focus:outline-none  peer" type="text" placeholder="" />
                        <label htmlFor="username" className="absolute text-sm mx-3 px-3 text-neutral peer-focus:text-primary transform -translate-y-5 top-2 z-10 origin-[0] bg-white ">Username</label>
                    </div>
                    <div className="relative">
                        <input id="email" className="block w-full border border-neutral p-2 rounded-sm focus:border-primary focus:outline-none  peer" type="text" placeholder="" />
                        <label htmlFor="email" className="absolute text-sm mx-3 px-3 text-neutral peer-focus:text-primary transform -translate-y-5 top-2 z-10 origin-[0] bg-white ">Email</label>
                    </div>
                    <div className="relative">
                        <input id="password" className="block w-full border border-neutral p-2 rounded-sm focus:border-primary focus:outline-none  peer" type="password" placeholder="" />
                        <label htmlFor="password" className="absolute text-sm mx-3 px-3 text-neutral peer-focus:text-primary transform -translate-y-5 top-2 z-10 origin-[0] bg-white ">Password</label>
                    </div>
                    <div className="relative">
                        <input id="confirm-password" className="block w-full border border-neutral p-2 rounded-sm focus:border-primary focus:outline-none  peer" type="password" placeholder="" />
                        <label htmlFor="confirm-password" className="absolute text-sm mx-3 px-3 text-neutral peer-focus:text-primary transform -translate-y-5 top-2 z-10 origin-[0] bg-white ">Confirm Password</label>
                    </div>
                </div>

                <button className="btn bg-primary text-primary-content w-full" type="submit">Create account</button>

                <p className="divider text-neutral text-sm">or continue with</p>
                <a href="../login" className="text-sm text-primary hover:text-purple-950">Already have an account?</a>
            </div>
        </div>
    )
}