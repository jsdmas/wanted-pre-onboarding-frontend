import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import ToDo from "./routes/ToDo";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<SignUp />} path="/signup" />
                <Route element={<SignIn />} path="/signin" />
                <Route element={<ToDo />} path="/todo" />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;