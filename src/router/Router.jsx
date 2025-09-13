import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import WelcomPage from "../pages/WelcomPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import MyArtListPage from "../pages/MyArtListPage";
import MyArtPage from "../pages/MyArtPage";
import CreateMyArtPage from "../pages/CreateMyArtPage";
import SubGoalPage from "../pages/SubGoalPage";
import MyPage from "../pages/MyPage";
import ImportClonePage from "../pages/ImportClonePage";
import EditProfilePage from "../pages/EditProfilePage";

const router = createBrowserRouter(
    [
        // ✅ 공개 라우트
        { path: "/", element: <WelcomPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/signup", element: <SignUpPage /> },

        // ✅ 보호된 라우트
        {
            path: "/home",
            element: (
                <PrivateRoute>
                    <HomePage />
                </PrivateRoute>
            ),
        },
        {
            path: "/myartlist",
            element: (
                <PrivateRoute>
                    <MyArtListPage />
                </PrivateRoute>
            ),
        },
        {
            path: "/myart/:mainGoalId",
            element: (
                <PrivateRoute>
                    <MyArtPage />
                </PrivateRoute>
            ),
        },
        {
            path: "/createmyart",
            element: (
                <PrivateRoute>
                    <CreateMyArtPage />
                </PrivateRoute>
            ),
        },
        {
            path: "/myart/:mainGoalId/subgoal/:subGoalId",
            element: (
                <PrivateRoute>
                    <SubGoalPage />
                </PrivateRoute>
            ),
        },
        {
            path: "/mypage",
            element: (
                <PrivateRoute>
                    <MyPage />
                </PrivateRoute>
            ),
        },
        {
            path: "/importclone",
            element: (
                <PrivateRoute>
                    <ImportClonePage />
                </PrivateRoute>
            ),
        },
        {
            path: "/editprofile",
            element: (
                <PrivateRoute>
                    <EditProfilePage />
                </PrivateRoute>
            ),
        },
    ],
);


export default function Router() {
    return <RouterProvider router={router} />
}