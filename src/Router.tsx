import { Route, Routes, BrowserRouter, Navigate, Outlet } from 'react-router-dom';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';
import ToDo from './routes/ToDo';
import Home from './routes/Home';
import { getToken } from './utils/token';
import { TOKEN_KEY } from './constants/auth';
import { PATH } from './constants/path';
import ToDoContextProvider from './contexts/TodoContext';

function Router() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<PublicRouter />}>
          <Route element={<SignUp />} path="/signup" />
          <Route element={<SignIn />} path="/signin" />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route element={<ToDo />} path="/todo" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

const PrivateRouter = () => {
  const token = getToken(TOKEN_KEY);
  return token ? (
    <ToDoContextProvider>
      <Outlet />
    </ToDoContextProvider>
  ) : (
    <Navigate replace to={PATH.MAIN} />
  );
};

const PublicRouter = () => {
  const token = getToken(TOKEN_KEY);
  // navigate : redirect
  return token ? <Navigate to={PATH.TODO} replace /> : <Outlet />;
};
