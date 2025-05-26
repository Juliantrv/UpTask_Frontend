import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout"
import AtuhLayout from "@/layouts/AtuhLayout";
const ProfileLayout = lazy( ()=> import("@/layouts/ProfileLayout"));
const DashboardView = lazy( ()=> import("@/views/DashboardView"));
const CreateProjectView = lazy( ()=> import("@/views/projects/CreateProjectView"));
const EditProjectView = lazy( ()=> import("@/views/projects/EditProjectView"));
const ProjectsDetailsView = lazy( ()=> import("@/views/projects/ProjectsDetailsView"));
const LoginView = lazy( ()=> import("@/views/auth/LoginView"));
const RegisterView = lazy( ()=> import("@/views/auth/RegisterView"));
const ConfirmAccountView = lazy( ()=> import("@/views/auth/ConfirmAccountView"));
const RequestNewCodeView = lazy( ()=> import("@/views/auth/RequestNewCodeView"));
const ForgotPasswordView = lazy( ()=> import("@/views/auth/ForgotPasswordView"));
const NewPasswordView = lazy( ()=> import("@/views/auth/NewPasswordView"));
const ProjectTeamView = lazy( ()=> import("@/views/projects/ProjectTeamView"));
const ProfileView = lazy( ()=> import("@/views/profile/ProfileView"));
const ChangePasswordView = lazy( ()=> import("@/views/profile/ChangePasswordView"));
const NotFound = lazy( ()=> import("@/views/404/NotFound"));

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AppLayout/>}>
              <Route path="/" element={<Suspense><DashboardView/></Suspense>} index></Route>
              <Route path="/projects/create" element={<Suspense><CreateProjectView/></Suspense>}></Route>
              <Route path="/projects/:projectId" element={<Suspense><ProjectsDetailsView/></Suspense>}></Route>
              <Route path="/projects/:projectId/edit" element={<Suspense><EditProjectView/></Suspense>}></Route>
              <Route path="/projects/:projectId/team" element={<Suspense><ProjectTeamView/></Suspense>}></Route>
              <Route element={<Suspense><ProfileLayout /></Suspense>}>
                <Route path="/profile" element={<Suspense><ProfileView/></Suspense>}></Route>
                <Route path="/profile/password" element={<Suspense><ChangePasswordView/></Suspense>}></Route>
              </Route>
            </Route>

            <Route element={<AtuhLayout />}>
              <Route path="/auth/login" element={<Suspense><LoginView /></Suspense>}></Route>
              <Route path="/auth/register" element={<Suspense><RegisterView /></Suspense>}></Route>
              <Route path="/auth/confirm-account" element={<Suspense><ConfirmAccountView /></Suspense>}></Route>
              <Route path="/auth/request-code" element={<Suspense><RequestNewCodeView /></Suspense>}></Route>
              <Route path="/auth/forgot-password" element={<Suspense><ForgotPasswordView /></Suspense>}></Route>
              <Route path="/auth/new-password" element={<Suspense><NewPasswordView /></Suspense>}></Route>
            </Route>
        </Routes>

        <Route element={<AtuhLayout/>}>
            <Route path="*" element={<Suspense><NotFound /></Suspense>}></Route>
        </Route>
    </BrowserRouter>
  )
}
