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
                    path: '/lesson',
                    element: <LessonPage />
                },
                {
                    path: '/problemselection',
                    element: <ProblemSelectionPage />
                },
                {
                    path: '/exercise',
                    element: <ExercisePage />
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