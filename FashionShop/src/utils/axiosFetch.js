import React from 'react'
import axios from 'axios'

const productionUrl = "http://localhost:8080/api"
const userUrl = "http://localhost:8080/user"
const AdminUrl = "http://localhost:8080/admin"

export const axiosFetchProducts = axios.create({
    baseURL: productionUrl,
    headers: {
        "Content-type": "application/json",

    }
})
export const axiosCart = axios.create({
    baseURL: productionUrl,
    headers: {
        "Content-type": "application/json",
    }
})
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
