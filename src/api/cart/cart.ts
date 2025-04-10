// --> Documentation : https://dummyjson.com/docs/carts

import axios from 'axios'

// ----------- API ISTANCE
const cartApi = axios.create({
  baseURL: `${import.meta.env.VITE_DUMMY_JSON_BASEURL}/carts`,
  headers: {
    'Content-Type': 'application/json'
  }
})
