import { useEffect } from "react";
import useTokenCheck from "../hooks/useTokenCheck";

function ToDo() {
    const { notIncludeToken } = useTokenCheck();
    useEffect(() => { notIncludeToken() }, [notIncludeToken]);
    return (
        <>
            @@TODO@@
        </>
    );
};
export default ToDo;