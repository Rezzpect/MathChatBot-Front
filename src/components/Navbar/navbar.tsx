export default function Navbar() {
    return (
        <div className="h-[30px] navbar bg-neutral shadow-sm text-neutral-content" >
            <div className="flex-1">
                <a className="text-neutral-content visited:text-neutral-content text-xl font-bold">MATHEMATHIC CHATBOT</a>
            </div>

            <div className="flex-none items-center">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Home</a></li>
                    <li><a>StudyPlan</a></li>
                    <li>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}