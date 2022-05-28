import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ui/ProtectedRoutes.js";
import Layout from "./ui/Layout.js";
import Home from "./ui/Home.js";
import Missing from "./ui/Missing.js";
import UsersHome from "./users/UsersHome.js";
import UsersLogin from "./users/UsersLogin.js";
import UsersLogout from "./users/UsersLogout.js";
import UsersSignup from "./users/UsersSignup.js";
import UserState from "./auth/UserState.js";
import Test from "./ui/Test.js";

function App() {
    return (
        <>
            {/* <Header /> */}
            <UserState />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />

                    <Route path="users" element={<UsersHome />}>
                        <Route path="signin" element={<UsersLogin />} />
                        <Route path="logout" element={<UsersLogout />} />
                        <Route path="signup" element={<UsersSignup />} />
                    </Route>

                    <Route element={<ProtectedRoutes />}>
                        <Route path="test" element={<Test />} />
                    </Route>

                    <Route path="*" element={<Missing />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
