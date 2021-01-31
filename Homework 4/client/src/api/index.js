import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const insertAccommodation = payload => api.post(`/accommodation`, payload)
export const getAllAccommodations = () => api.get(`/accommodations`)
export const updateAccommodationById = (id, payload) => api.put(`/accommodation/${id}`, payload)
export const deleteAccommodationById = id => api.delete(`/accommodation/${id}`)
export const getAccommodationById = id => api.get(`/accommodation/${id}`)

const apis = {
    insertAccommodation,
    getAllAccommodations,
    updateAccommodationById,
    deleteAccommodationById,
    getAccommodationById,
}

export default apis