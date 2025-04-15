import React from 'react'
import axios from 'axios'

const productionUrl = "https://fashionbackendfork.up.railway.app/api"
const userUrl = "https://fashionbackendfork.up.railway.app/user"
const AdminUrl = "https://fashionbackendfork.up.railway.app/admin"

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
    baseURL: AdminUrl,
    headers: {
        "Content-type": "application/json",
    }
})
