/**
 * handler.js
 * 
 * Since I am not using axios to handle the HTTP requests, I have created this handler,
 * which is responsible to handling the response coming from the meds-api and, and parse to JSON object.
 */

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export default handleResponse;
