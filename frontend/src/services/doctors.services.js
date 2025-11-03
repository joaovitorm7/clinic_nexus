import axios from 'axios';

export async function getDoctors(params = {}) {
    return axios.get('http://localhost:3000/doctors', { params });
}