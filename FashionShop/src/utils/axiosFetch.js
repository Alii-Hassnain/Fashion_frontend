import axios from 'axios';
const baseURL = import.meta.env.VITE_SERVER_URI || "http://localhost:8080";

const productionUrl = `${baseURL}/api`;
const userUrl = `${baseURL}/user`;
const adminUrl = `${baseURL}/admin`;

export const axiosFetchProducts = axios.create({
    baseURL: productionUrl,
    headers: {
        "Content-type": "application/json",

    }
})
// export const axiosCart = axios.create({
//     baseURL: productionUrl,
//     headers: {
//         "Content-type": "application/json",
//     }
// })
export const axiosCart = axios.create({
    baseURL: productionUrl,
    headers: {
        "Content-type": "application/json"
    }
})

export const axiosFetchUsers = axios.create({
    baseURL: userUrl,
    headers: {
        "Content-type": "application/json",
    }
})

export const axiosAdminUrl = axios.create({
    baseURL: adminUrl,
    headers: {
        "Content-type": "application/json",
    }
})
