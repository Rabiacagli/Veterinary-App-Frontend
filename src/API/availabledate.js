import axios from "axios";

export const getAvailableDates = async () => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/v1/availabledates"
    )
    return data;
}

export const deleteAvailableDates = async (id) => {
    const {data} = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `/v1/availabledates/${id}`
    )
    return data;
}

export const createAvailableDates = async (availabledates) => {
    const {data} = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `/v1/availabledates`,availabledates
    )
    return data;
}

export const updateAvailableDatesAPI = async (availabledates) => {
    const {data} = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `/v1/availabledates`, availabledates
    )
    return data;
}