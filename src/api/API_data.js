import axios from "axios";

axios.defaults.baseURL = "/api"; // Use relative path to trigger proxy (https://portal.parmartours.com/api/...)

const contentTypes = {
    json: "application/json",
    formData: "multipart/form-data",
    formUrlEncoded: "application/x-www-form-urlencoded",
};

const defaultHeaders = {
    isAuth: true,
    contentType: contentTypes.json,
};

const getHttpOptions = (options) => {
    const headers = {};
    if (options.isAuth) {
        headers["Authorization"] = `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`;
    }
    headers["Content-Type"] = options.contentType;
    return { headers };
};

const ApiGet = async (url, isAuth = true) => {
    try {
        const response = await axios.get(
            url,
            getHttpOptions({ ...defaultHeaders, isAuth })
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
const ApiPost = async (url, body, isAuth = true) => {
    try {
        const response = await axios.post(
            url,
            body,
            getHttpOptions({ ...defaultHeaders, isAuth })
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
const ApiDelete = async (url, body, isAuth = true) => {
    try {
        const response = await axios.delete(
            url,
            body,
            getHttpOptions({ ...defaultHeaders, isAuth })
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
const ApiPatch = async (url, body, isAuth = true) => {
    try {
        const response = await axios.patch(
            url,
            body,
            getHttpOptions({ ...defaultHeaders, isAuth })
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
const ApiPut = async (url, body, isAuth = true) => {
    try {
        const response = await axios.put(
            url,
            body,
            getHttpOptions({ ...defaultHeaders, isAuth })
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const ApiPostFormData = async (url, formData, isAuth = true) => {
    try {
        let postData = new FormData();
        Object.keys(formData).forEach((key) => postData.append(key, formData[key]));
        const response = await axios.post(
            url,
            postData,
            getHttpOptions({
                ...defaultHeaders,
                contentType: contentTypes.formData,
                isAuth,
            })
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export { ApiGet, ApiPost, ApiDelete, ApiPatch, ApiPut, ApiPostFormData };
