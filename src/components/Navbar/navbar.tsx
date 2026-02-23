import { useNavigate } from "react-router-dom";
import supabaseClient from "../../utils/SupabaseClient";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export default function Navbar() {
    const navigate = useNavigate();
    const { authData,logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    }
    
    return (
        <div className="h-[30px] navbar bg-neutral shadow-sm text-neutral-content" >
            <div className="flex-1">
                <a className="md:flex hidden text-primary visited:text-primary text-lg font-bold">MATHEMATHIC CHATBOT</a>
            </div>

            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 flex items-center">
                    <li><a onClick={() => { navigate('/') }} className="font-bold hover:bg-primary hover:text-primary-content">Home</a></li>
                    <li><a onClick={() => { navigate('/profile') }} className="font-bold hover:bg-primary hover:text-primary-content">Profile</a></li>
                    <li><a onClick={() => { navigate('/studyplan') }} className="font-bold hover:bg-primary hover:text-primary-content">StudyPlan</a></li>
                    <li>
                        {
                            authData ?
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
                                        <li><a className="text-red-500 font-bold"
                                        onClick={logout}>Logout</a></li>
                                    </ul>
                                </div>
                            :
                            <a onClick={() => { navigate('/login') }} className="font-bold hover:bg-primary hover:text-primary-content">Login/Register</a>
                        }

                    </li>
                </ul>
            </div>
        </div>
    );
}