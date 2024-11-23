import React from 'react'
import axios from 'axios'

const productionUrl = "http://localhost:8080/api"
const userUrl = "http://localhost:8080/user"

export const axiosFetchProducts = axios.create({
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
