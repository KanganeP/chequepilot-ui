import { login } from "../services/authService";
import { saveLogin } from "../utils/auth";

export const loginUser = async (
    email,
    password,
    navigate
) => {
    try {
        const result = await login(email, password);
        if (result.success) {
            saveLogin(result);
            navigate("/dashboard");
        }
    } catch (err) {
        alert(
            err.response?.data?.message
        );
    }
};