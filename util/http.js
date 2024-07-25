import axios from "axios";

let url = 'http://192.168.1.69:3000/';

export async function getData(tableName) {
    let endPoint = url + tableName;
    try {
        const response = await axios.get(endPoint);
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${endPoint}:`, error);
        throw error;
    }
}

export async function addData(endPoint, data) {
    let url = `${url} + ${endPoint}`;

    try {
        const response = await axios.post(endPoint, { data }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { status: response.status, message: response.status };

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
    let url = `${url} + ${endPoint} + '/' + ${id}`;
    try {
        const response = await axios.put(url, { data });
        return { status: response.status, message: response.status };
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
    let url = `${url} + ${endPoint} + '/' + ${id}`;
    try {
        const response = await axios.delete(url);
        return { status: response.status, message: response.status };

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