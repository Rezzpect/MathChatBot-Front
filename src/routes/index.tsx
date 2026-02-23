import { BrowserRouter, Navigate, useNavigate, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/main";
import App from "../App";
import HomePage from "../pages/main";
import SearchPage from "../pages/Search";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import StudentProfile from "../pages/Profile";
import LessonPage from "../pages/Lesson";
import ProblemSelectionPage from "../pages/ProblemSelection";
import ExercisePage from "../pages/Exercise";
import EditExercise from "../pages/EditExercise";
import StudyPlanPage from "../pages/StudyPlan";
import { useContext, type JSX } from "react";
import { AuthContext } from "../contexts/authContext";
import { ROLE_NO } from "../@types/rolenumber";

function AllowedRoles({ allowed_role, children }: {
    allowed_role: string[],
    children: JSX.Element
}) {
    const { authData,isLoadingAuth } = useContext(AuthContext);
    const user_role = authData?.role_name

    if (isLoadingAuth === true){
        console.log(isLoadingAuth)
        return <div>IS LOADING</div>
    }

    if(!user_role){
        return <Navigate to={'/login'} replace />
    }
    
    if(allowed_role.includes(user_role)){
        return children
    }else return <Navigate to={'/'} replace />
}

function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element:
                        <HomePage />
                },
                {
                    path: '/search',
                    element:
                        <SearchPage />
                },
                {
                    path: '/profile',
                    element:
                        <AllowedRoles allowed_role={['student','teacher','experiment']}>
                            <StudentProfile />
                        </AllowedRoles>
                },
                {
                    path: '/lesson/:lessonId',
                    element:
                        <LessonPage />
                },
                {
                    path: '/problemselection/:topicId',
                    element:
                        <AllowedRoles allowed_role={['student','teacher','experiment']}>
                            <ProblemSelectionPage />
                        </AllowedRoles>
                },
                {
                    path: '/problemselection/:topicId/question/:questionId',
                    element:
                        <AllowedRoles allowed_role={['student','teacher','experiment']}>
                            <ExercisePage />
                        </AllowedRoles>
                },
                {
                    path: '/problemselection/:topicId/editquestion',
                    element:
                        <AllowedRoles allowed_role={['teacher','experiment']}>
                            <EditExercise />
                        </AllowedRoles>
                },
                {
                    path: '/problemselection/:topicId/editquestion/:questionId',
                    element:
                        <AllowedRoles allowed_role={['teacher','experiment']}>
                            <EditExercise />
                        </AllowedRoles>
                },
                {
                    path: '/studyplan',
                    element:
                        <AllowedRoles allowed_role={['student','experiment']}>
                            <StudyPlanPage />
                        </AllowedRoles>
                },
            ]
        },
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '/register',
            element: <RegisterPage />
        },
    ]);
}

export default function AppRouter() {
    return (
        <BrowserRouter>
                <Routes />
        </BrowserRouter>
    )
}