import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginView from "./views/LoginView"
import RegisterView from "./views/RegisterView"
import AuthLayout from "./layout/AuthLayout"
import AppLayout from "./layout/AppLayout"
import StacklinkView from "./views/StacklinkView"
import ProfileView from "./views/ProfileView"
import HandleView from "./views/HandleView"
import NotFoundView from "./views/NotFoundView"

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth' element={ <AuthLayout /> }>
                    <Route path='login' element={<LoginView />} />
                    <Route path='register' element={<RegisterView />} />
                </Route>

                <Route path="/admin" element={ <AppLayout /> }>
                    <Route index={true} element={ <StacklinkView /> } />
                    <Route path="profile" element={ <ProfileView /> } />
                </Route>

                <Route path='/:handle' element={<AuthLayout />}>
                    <Route element={<HandleView />} index={true}/>
                </Route>

                <Route path="/404" element={<AuthLayout />}>
                    <Route element={<NotFoundView />} index={true} />
                </Route>
            </Routes>
        </BrowserRouter>
    )

}