import axios from "axios";

export const getAppointments = async () => {
    const {data} = await axios.get(
        import.meta.env.VITE_APP_BASE_URL + "/v1/appointmentdates"
    )
    return data;
}

export const deleteAppointments = async (id) => {
    const {data} = await axios.delete(
        import.meta.env.VITE_APP_BASE_URL +  `/v1/appointmentdates/${id}`
    )
    return data;
}

export const createAppointments = async (appointmentdates) => {
    const {data} = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + `/v1/appointmentdates`, appointmentdates
    )
    return data;
}

export const updateAppointmentsAPI = async (appointmentdates) => {
    const {data} = await axios.put(
        import.meta.env.VITE_APP_BASE_URL + `/v1/appointmentdates`, appointmentdates
    )
    return data;
}

export const filterByDateAndDoctor = async (startDate, finishDate, doctorId) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/v1/appointmentdates/filter-date-doctor?start-date=${startDate}&fnsh-date=${finishDate}&doctorId=${doctorId}`
    );
    return data;
};


export const filterByDateAndAnimal = async (startDate, finishDate, animalId) => {
    const { data } = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/v1/appointmentdates/filter-date-animal?start-date=${startDate}&fnsh-date=${finishDate}&animalId=${animalId}`
    );
    return data;
};
