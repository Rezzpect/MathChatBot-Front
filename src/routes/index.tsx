import { BrowserRouter, useRoutes } from "react-router-dom";
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

function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/',
                    element: <HomePage />
                },
                {
                    path: '/search',
                    element: <SearchPage />
                },
                {
                    path: '/profile',
                    element: <StudentProfile />
                },
                {
                    path: '/lesson/:lessonId',
                    element: <LessonPage />
                },
                {
                    path: '/problemselection/:topicId',
                    element: <ProblemSelectionPage />
                },
                {
                    path: '/exercise/:questionId',
                    element: <ExercisePage />
                },
                {
                    path: '/editexercise',
                    element: <EditExercise />
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