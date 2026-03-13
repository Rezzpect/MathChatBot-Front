import { BrowserRouter, redirect, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/main";
import HomePage from "../pages/main";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import StudentProfile from "../pages/Profile";
import CoursePage from "../pages/Course";
import TopicPage from "../pages/Topic";
import ExercisePage from "../pages/Exercise";
import EditExercise from "../pages/EditExercise";
import StudyPlanPage from "../pages/StudyPlan";
import PlanListPage from "../pages/PlanList";
import { AllowedRoles } from "../components/AuthGuard/AllowedRole";
import { RequireEnroll } from "../components/AuthGuard/RequireEnroll";
import supabaseClient from "../utils/SupabaseClient";
import toast from "react-hot-toast";

async function topicLoader() {

  toast.success('Loader ran')
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
                    path: '/profile',
                    element:
                        <AllowedRoles allowed_role={['student', 'teacher', 'admin']}>
                            <StudentProfile />
                        </AllowedRoles>
                },
                {
                    path: '/course/:courseId',
                    element:
                        <CoursePage />
                },
                {
                    path: '/course/:courseId/planlists',
                    element:
                        <PlanListPage />
                },
                {
                    path: '/topic/:topicId',
                    loader:topicLoader,
                    element:
                        <AllowedRoles allowed_role={['student', 'teacher', 'admin']}>
                            <RequireEnroll>
                                <TopicPage />
                            </RequireEnroll>
                        </AllowedRoles>
                },
                {
                    path: '/question/:questionId',
                    element:
                        <AllowedRoles allowed_role={['student', 'teacher', 'admin']}>
                            <RequireEnroll>
                                <ExercisePage />
                            </RequireEnroll>
                        </AllowedRoles>
                },
                {
                    path: '/topic/:topicId/editquestion/:questionId?',
                    element:
                        <AllowedRoles checkPerm={true} allowed_role={['teacher', 'admin']}>
                            <EditExercise />
                        </AllowedRoles>
                },
                {
                    path: '/studyplan',
                    element:
                        <AllowedRoles allowed_role={['student', 'admin']}>
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