import { useNavigate } from "react-router-dom";


function useTokenCheck() {
    const navigate = useNavigate();
    const includeToken = () => {
        if (localStorage.getItem("access_token")) {
            navigate("/todo");
        }
    };
    const notIncludeToken = () => {
        if (!localStorage.getItem("access_token")) {
            navigate("/signin");
        }
    };
    return { includeToken, notIncludeToken };
};

export default useTokenCheck;