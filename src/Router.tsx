import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';
import ToDo from './routes/ToDo';
import Home from './routes/Home';

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<SignIn />} path="/signin" />
        <Route element={<ToDo />} path="/todo" />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
