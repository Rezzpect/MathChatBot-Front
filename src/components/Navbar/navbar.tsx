import { useNavigate } from "react-router-dom";
import supabaseClient from "../../utils/SupabaseClient";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";

export default function Navbar() {
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState<string>('')
    const { authData, isLoadingAuth, logout } = useContext(AuthContext);

    const getFile = async () => {
        if (authData && authData.profile_picture) {
            const { data } = supabaseClient.storage.from('profile_image').getPublicUrl(authData?.user_id + authData?.profile_picture)

            setProfilePicture(data.publicUrl);
        }
    }

    useEffect(() => {
        getFile();
    }, [isLoadingAuth])

    return (
        <div className="h-[30px] navbar flex justify-between bg-neutral shadow-sm text-neutral-content" >
            <div className="flex">
                <a className="md:flex hidden text-primary visited:text-primary text-lg font-bold hover:cursor-pointer" onClick={() => { navigate('/') }}>MATHEMATHIC CHATBOT</a>
            </div>

            <div className="flex-none">

                <ul className="menu menu-horizontal px-1 flex items-center">
                    <li><a onClick={() => { navigate('/') }} className="font-bold hover:bg-primary hover:text-primary-content">Home</a></li>
                    {
                        authData?.role_name === 'student' && <li><a onClick={() => { navigate('/studyplan') }} className="font-bold hover:bg-primary hover:text-primary-content">StudyPlan</a></li>
                    }

                    <li>
                        {
                            authData ?
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                src={profilePicture !==''?profilePicture:'/anonymous-user.png'}
                                            />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <li><a className="text-neutral-content font-bold py-2"
                                            onClick={() => { navigate('/profile') }}>Profile</a>
                                        </li>
                                        <li><a className="text-red-500 font-bold py-2"
                                            onClick={logout}>Logout</a>
                                        </li>
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