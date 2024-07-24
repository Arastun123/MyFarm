import axios from "axios";

let url = 'http://192.168.1.69:3000/';

function getData(tableName) {
    let url = url + tableName;
    const response = axios.get(url);
    return response.data;
}

export async function addData(endPoint, data) {
    let url = `${url} + ${endPoint}`;

    console.log('data', data);
    console.log(url);
    try {
        const response = await axios.post(url, { data }, {
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