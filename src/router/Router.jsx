import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
        { path: '/', element: <WelcomPage /> },
        { path: '/login', element: <LoginPage /> },
        { path: '/signup', element: <SignUpPage /> },
        { path: '/home', element: <HomePage /> },
        { path: '/myartlist', element: <MyArtListPage /> },
        { path: '/myart', element: <MyArtPage /> },
        { path: '/createmyart', element: <CreateMyArtPage /> },
        { path: '/subgoal', element: <SubGoalPage /> },
        { path: '/mypage', element: <MyPage /> },
        { path: '/importclone', element: <ImportClonePage /> },
        { path: '/editprofile', element: <EditProfilePage /> },
    ],
);


export default function Router() {
    return <RouterProvider router={router} />
}