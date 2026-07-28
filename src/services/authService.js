import api from "./api";

export const login = async (email, password) => {
    const response = await api.post("/auth/login", {
        email,
        password
    });
    return response.data;
};

export const signup = async (data) => {
    const response = await api.post("/auth/signup", data);
    return response.data;
};