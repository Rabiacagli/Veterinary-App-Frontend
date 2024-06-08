import axios from "axios";

export const getCustomers = async () => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/v1/customers"
    )
    return data;
}

export const deleteCustomers = async (id) => {
    const {data} = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `/v1/customers/${id}`
    )

    return data
}

export const createCustomers = async (customers) => {
    const {data} = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `/v1/customers`, customers
    )
    return data
}

export const updateCustomersAPI = async (customers) => {
    const {data} = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `/v1/customers`, customers
    )
    return data;
}

export const getByName = async (name) => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + `/v1/customers/byname/${name}`
    )
    return data;
}