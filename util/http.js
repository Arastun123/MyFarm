import axios from "axios";

let mainURL = 'http://192.168.1.69:3000/';

export async function getData(tableName) {
    let endPoint = mainURL + tableName;
    try {
        const response = await axios.get(endPoint);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endPoint}:`, error);
        throw error;
    }
}

export async function addData(endPoint, data) {
    let url = `${mainURL}${endPoint}`;
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { status: response.status, message: response.data.message }; 

    } catch (error) {
        if (error.response) {
            return { status: error.response.status, message: error.response.data.message };
        } else if (error.request) {
            return { status: null, message: 'No response received from the server.' };
        } else {
            return { status: null, message: error.message };
        }
    }
}

export async function updateData(endPoint, id, data) {
    let url = `${mainURL}${endPoint}/${id}`;
    try {
        const response = await axios.put(url, data);
        return { status: response.status, message: response.message };
    } catch (error) {
        if (error.response) {
            return { status: error.response.status, message: error.response.data.message };
        } else if (error.request) {
            return { status: null, message: 'No response received from the server.' };
        } else {
            return { status: null, message: error.message };
        }
    }
}


export async function deleteData(endPoint, id) {
    let url = `${mainURL}${endPoint}${id}`;
    try {
        const response = await axios.delete(url);
        console.log(response);
        return { status: response.status, message: response.data.message };
    } catch (error) {
        if (error.response) {
            return { status: error.response.status, message: error.response.data.message };
        } else if (error.request) {
            return { status: null, message: 'No response received from the server.' };
        } else {
            return { status: null, message: error.message };
        }
    }
}
