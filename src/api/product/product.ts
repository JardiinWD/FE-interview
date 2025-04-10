// --> Documentation : https://dummyjson.com/docs/products

import axios from 'axios';

// ----------- API ISTANCE
const productApi = axios.create({
    baseURL: `${import.meta.env.VITE_DUMMY_JSON_BASEURL}/products`,
    headers: {
        'Content-Type': 'application/json',
    },
});
