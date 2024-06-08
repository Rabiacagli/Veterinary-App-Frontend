import axios from "axios";

export const getDoctors = async () => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/v1/doctors"
    )
    return data;
}

export const deleteDoctors = async (id) => {
    const {data} = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `/v1/doctors/${id}`
    )
    return data;
}

export const createDoctors = async (doctors) => {
    const {data} = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `/v1/doctors`,doctors
    )
    return data;
}

export const updateDoctorsAPI = async (doctors) => {
    const {data} = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `/v1/doctors`, doctors
    )
    return data;
}