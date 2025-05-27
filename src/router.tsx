import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout"
import AtuhLayout from "@/layouts/AtuhLayout";
import ProfileLayout from "@/layouts/ProfileLayout"
import DashboardView from "@/views/DashboardView"
import CreateProjectView from "@/views/projects/CreateProjectView"
import EditProjectView from "@/views/projects/EditProjectView"
import ProjectsDetailsView from "@/views/projects/ProjectsDetailsView"
import LoginView from "@/views/auth/LoginView"
import RegisterView from "@/views/auth/RegisterView"
import ConfirmAccountView from "@/views/auth/ConfirmAccountView"
import RequestNewCodeView from "@/views/auth/RequestNewCodeView"
import ForgotPasswordView from "@/views/auth/ForgotPasswordView"
import NewPasswordView from "@/views/auth/NewPasswordView"
import ProjectTeamView from "@/views/projects/ProjectTeamView"
import ProfileView from "@/views/profile/ProfileView"
import ChangePasswordView from "@/views/profile/ChangePasswordView"
import NotFound from "@/views/404/NotFound"

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<AppLayout/>}>
              <Route path="/" element={<DashboardView/>} index></Route>
              <Route path="/projects/create" element={<CreateProjectView/>}></Route>
              <Route path="/projects/:projectId" element={<ProjectsDetailsView/>}></Route>
              <Route path="/projects/:projectId/edit" element={<EditProjectView/>}></Route>
              <Route path="/projects/:projectId/team" element={<ProjectTeamView/>}></Route>
              <Route element={<ProfileLayout />}>
                <Route path="/profile" element={<ProfileView/>}></Route>
                <Route path="/profile/password" element={<ChangePasswordView/>}></Route>
              </Route>
            </Route>

            <Route element={<AtuhLayout />}>
              <Route path="/auth/login" element={<LoginView />}></Route>
              <Route path="/auth/register" element={<RegisterView />}></Route>
              <Route path="/auth/confirm-account" element={<ConfirmAccountView />}></Route>
              <Route path="/auth/request-code" element={<RequestNewCodeView />}></Route>
              <Route path="/auth/forgot-password" element={<ForgotPasswordView />}></Route>
              <Route path="/auth/new-password" element={<NewPasswordView />}></Route>
            </Route>
        </Routes>

        <Route element={<AtuhLayout/>}>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
    </BrowserRouter>
  )
}
