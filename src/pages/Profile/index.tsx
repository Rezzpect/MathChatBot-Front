import CourseProgressBar from "../../components/CourseProgressBar";
import StudentStat from "./StudentStat";
import WeeklyExerciseBar from "../../components/WeeklyExerciseChart";
import { useContext, useEffect, useState } from "react";
import EditProfileModal from "../../modals/EditProfile";
import { AuthContext } from "../../contexts/authContext";
import supabaseClient from "../../utils/SupabaseClient";
import DataTable from "../../components/Table/DataTable";
import CourseModal from "../../modals/CourseModal";
import type { CourseRowProp } from "../../@types/table";
import toast from "react-hot-toast";
import type { CourseProgress } from "../../@types/courseData";
import DeleteModal from "../../modals/DeleteModal";

export default function StudentProfile() {
    const [isEditProf, setIsEditProf] = useState<boolean>(false);
    const [isCourseModal, setIsCourseModal] = useState<boolean>(false);
    const { authData, isLoadingAuth } = useContext(AuthContext);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0)
    const [profilePicture, setProfilePicture] = useState<string>('');
    const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
    const [courseId, setCourseId] = useState<string>('');

    const onClickCreate = () => {
        setIsCourseModal(true);
    }

    const handleDelete = async (course_id: string) => {
        setCourseId(course_id);
        setIsDeleteModal(true);
    }

    const getFile = async () => {
        if (authData) {
            const { data } = supabaseClient.storage.from('profile_image').getPublicUrl(authData?.user_id + authData?.profile_picture)

            console.log(data.publicUrl)
            if (data.publicUrl.length > 0)
                setProfilePicture(data.publicUrl);
        }

    }

    const getCourseProgress = async () => {
        const { data, error } = await supabaseClient.functions.invoke('course-completion-status', {
            method: 'POST',
            body: {
                user_id: authData?.user_id,
                max_size: 3
            }
        })

        if (error) {
            toast.error('Failed to get student statistic')
            throw error
        }

        if (data) {
            console.log(data.data);
            setCourseProgress(data.data);
        }
    }

    useEffect(() => {
        getFile()
        getCourseProgress();
    }, [])

    return (
        <div className="flex justify-center ">
            {
                isDeleteModal &&
                <DeleteModal
                    idName="course_id"
                    id={courseId}
                    method="PUT"
                    funcName="delete-soft-course"
                    message="หากดำเนินการต่อ ข้อมูลต่างที่อยู่ในคอร์สจะถูกลบและไม่สามารถกู้คืนได้"
                    setOpen={setIsDeleteModal}
                    setRefresh={setRefreshTrigger}
                />
            }

            {isCourseModal && <CourseModal setOpen={setIsCourseModal} refreshSubmit={setRefreshTrigger} />}

            {isEditProf && <EditProfileModal pictureUrl={profilePicture} setOpen={setIsEditProf} />}
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
                                        <img
                                            src={profilePicture}
                                            onError={(e) => e.currentTarget.src = '/anonymous-user.png'}
                                        />
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

                        {/* <StudentStat /> */}
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-5 md:w-[70%] w-full">
                        {authData?.role_name === 'student' &&
                            <>
                                <div className="flex flex-col w-full bg-base-100 shadow-sm rounded-lg p-10 gap-5 h-fit">
                                    <header className="font-bold text-xl">คอร์สล่าสุด</header>
                                    <div className="flex flex-col gap-5">
                                        {
                                            (courseProgress.length !== 0) &&
                                            courseProgress.map((course) => (
                                                <>
                                                    <CourseProgressBar
                                                        course_name={course.course_name}
                                                        progress={course.completion_percentage}
                                                    />
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="flex flex-col align-middle rounded-lg shadow-sm bg-base-100 p-10 gap-5 w-full h-fit">
                                    <header className="font-bold text-xl">เวลาเรียนในสัปดาห์นี้</header>

                                    <WeeklyExerciseBar />
                                </div>
                            </>
                        }
                        <div className="flex flex-col align-middle rounded-lg shadow-sm bg-base-100 p-10 gap-5 w-full h-fit">
                            {
                                (authData?.role_name === 'student')
                                    ? <DataTable
                                        name='delete-soft-course'
                                        id_key='user_id'
                                        data_id={authData?.user_id ?? ''}
                                        refreshTrigger={refreshTrigger}
                                    />
                                    : <DataTable
                                        name='teacher-course-list'
                                        id_key='user_id'
                                        data_id={authData?.user_id ?? ''}
                                        extraScript={onClickCreate}
                                        deleteScript={handleDelete}
                                        showAction={(authData?.role_name === 'teacher' || authData?.role_name === 'admin')}
                                        refreshTrigger={refreshTrigger}
                                    />
                            }

                        </div>
                    </div>


                </div>

            </div>
        </div>
    )
}