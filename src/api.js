import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

// Fetch all task headers
export const getTaskHeaders = async () => {
    const response = await axios.get(`${API_BASE_URL}task-headers/`);
    return response.data;
};

// Fetch all task details
export const getTaskDetails = async () => {
    const response = await axios.get(`${API_BASE_URL}task-details/`);
    return response.data;
};

// Add a new task header
export const addTaskHeader = async (taskHeader) => {
    const response = await axios.post(`${API_BASE_URL}task-headers/`, taskHeader);
    return response.data;
};

// Add a new task detail
export const addTaskDetail = async (taskDetail) => {
    const response = await axios.post(`${API_BASE_URL}task-details/`, taskDetail);
    return response.data;
};
