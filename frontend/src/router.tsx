import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginView from "./views/LoginView"
import RegisterView from "./views/RegisterView"
import AuthLayout from "./layout/AuthLayout"
import AppLayout from "./layout/AppLayout"
import StacklinkView from "./views/StacklinkView"
import ProfileView from "./views/ProfileView"

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
            </Routes>
        </BrowserRouter>
    )

}