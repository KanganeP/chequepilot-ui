import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001/api"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
// export async function processCheque(file){

//     const formData = new FormData();

//     formData.append("file",file);

//     const response = await fetch(

//         "http://localhost:5000/api/process-cheque",

//         {

//             method:"POST",

//             body:formData

//         }

//     );

//     return await response.json();

// }