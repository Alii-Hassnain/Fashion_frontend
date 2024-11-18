import React from 'react'
import axios from 'axios'

const productionUrl = "http://localhost:8080/api"

export const axiosFetch = axios.create({
    baseURL: productionUrl,
    headers: {
        "Content-type": "application/json"
    }
})
