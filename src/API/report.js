import axios from "axios";

export const getReports = async () => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/v1/reports"
    )
    return data;
}

export const deleteReports = async (id) => {
    const {data} = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `/v1/reports/${id}`
    )
    return data;
}

export const createReports = async (reports) => {
    const {data} = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `/v1/reports`,reports
    )
    return data;
}

export const updateReportsAPI = async (reports) => {
    const {data} = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `/v1/reports`, reports
    )
    return data;
}