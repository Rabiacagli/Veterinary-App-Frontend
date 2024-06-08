import axios from "axios";


export const getVaccines = async () => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/v1/vaccines"
    )
    return data;
}

export const deleteVaccines = async (id) => {
    const {data} = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL + `/v1/vaccines/${id}`
    )
    return data;
}

export const createVaccines = async (vaccines) => {
    const {data} = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `/v1/vaccines`,vaccines
    )
    return data;
}

export const updateVaccinesAPI = async (vaccines) => {
    const {data} = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `/v1/vaccines`, vaccines
    )
    return data;
}

export const getAnimalId = async (animalId) => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + `/v1/animals/${animalId}/vaccines`
    )
    return data;
}

export const getFinishDate = async (startDate, endDate) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/v1/vaccines/protect?start-date=${startDate}&fnsh-date=${endDate}`
    );
    return data;
};
