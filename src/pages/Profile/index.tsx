import CourseProgressBar from "../../components/CourseProgressBar";
import StudentStat from "./StudentStat";
import WeeklyExerciseBar from "../../components/WeeklyExerciseChart";
import { useContext, useState } from "react";
import EditProfileModal from "../../modals/EditProfile";
import { AuthContext } from "../../contexts/authContext";
import supabaseClient from "../../utils/SupabaseClient";
import DataTable from "../../components/DataTable";
import CourseModal from "../../modals/CourseModal";
import type { CourseRowProp } from "../../@types/table";

export default function StudentProfile() {
    const [isEditProf, setIsEditProf] = useState<boolean>(false);
    const [isCourseModal, setIsCourseModal] = useState<boolean>(false);
    const { authData, refreshAuthData, isLoadingAuth } = useContext(AuthContext);
    const [refreshTrigger,setRefreshTrigger] = useState<number>(0)
    const [modalData, setModalData] = useState<CourseRowProp | undefined>(undefined);

    const onClickCreate = () => {
        setIsCourseModal(true);
    }

    const EditProfile = async (first_name: string, last_name: string) => {
        try {
            const { error } = await supabaseClient.functions.invoke('edit-profile-detail', {
                method: 'PUT',
                body: {
                    "first_name": first_name,
                    "last_name": last_name
                }
            })
            if (error) throw error

            refreshAuthData();
        } catch (error) { throw error };
    }

    const deleteCourse = async(course_id:string) => {
        const {error} = await supabaseClient.functions.invoke('delete-soft-course',{
            method:'DELETE',
            body:{
                course_id:course_id.toString()
            }
        })
    }

    return (
        <div className="flex justify-center ">
            {isCourseModal && <CourseModal modalData={modalData} setOpen={setIsCourseModal} refreshSubmit={setRefreshTrigger} options="create"/>}

            {isEditProf && <EditProfileModal userData={authData} onSubmit={EditProfile} setOpen={setIsEditProf} />}
            <div className="flex flex-col my-10 w-full min-h-fit mx-25 gap-5">
                <header className="font-bold text-2xl">โปรไฟล์ผู้ใช้</header>
                <div className="flex md:flex-row flex-col w-full gap-20">

                    {/* Left Column */}
                    <div className="flex flex-col md:w-[30%] gap-5 w-full">
                        <div className="h-fit bg-base-100 shadow-sm rounded-lg">
                            {/* Banner Image */}
                            <div className="relative flex justify-center rounded-t-lg w-full h-[130px] bg-primary">
                                {/* Profile Image */}
                                <div className="flex justify-center avatar absolute w-[100px] bottom-[-30px] ">
                                    <div className="rounded-full">
                                        <img src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" />
                                    </div>
                                </div>
                            </div>

                            {/* Name and Description */}
                            <div className="flex flex-col gap-5 p-5 pt-10 text-neutral-content">
                                <div className="flex w-full justify-center">
                                    {isLoadingAuth ? <span className="loading" /> : <header className="font-bold text-lg">{`${authData?.first_name} ${authData?.last_name}`}</header>}
                                </div>

                                <span className="text-sm break-words">Emai: {authData?.email}</span>
                                <div className="flex w-full justify-end">
                                    <button onClick={() => { setIsEditProf(true) }} className="rounded-full bg-primary text-primary-content hover:cursor-pointer p-2">Edit Profile</button>
                                </div>
                            </div>
                        </div>

                        <StudentStat />
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-5 md:w-[70%] w-full">
                        <div className="flex flex-col w-full bg-base-100 shadow-sm rounded-lg p-10 gap-5 h-100">
                            <header className="font-bold text-xl">คอร์สล่าสุด</header>
                            <div className="flex flex-col gap-5">
                                <CourseProgressBar />
                                <CourseProgressBar />
                                <CourseProgressBar />
                            </div>
                        </div>

                        <div className="flex flex-col align-middle rounded-lg shadow-sm bg-base-100 p-10 gap-5 w-full h-100">
                            <header className="font-bold text-xl">เวลาเรียนในสัปดาห์นี้</header>

                            <WeeklyExerciseBar />
                        </div>
                        <div className="flex flex-col align-middle rounded-lg shadow-sm bg-base-100 p-10 gap-5 w-full h-100">
                            <DataTable
                                name='teacher-course-list'
                                id_key='user_id'
                                data_id={authData?.user_id ?? ''}
                                extraScript={onClickCreate}
                                deleteScript={deleteCourse}
                            />
                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}