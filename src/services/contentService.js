import fetchRequest from "./fetchServices";

const apiURL = process.env.REACT_APP_API_URL;

export const generatePostDescription = async (data) => {
    return await fetchRequest.post(apiURL + "/api/posts/description", {
        theme: data.theme,
        caption: data.caption
    }).then((response) => {
        console.log(response)
        return response.data
    }).catch((error) => {
        console.log(error)
        return error.response.data
    });
};

export const generateImageBasedOnDescription = async (description) => {
    return await fetchRequest.post(apiURL + "/api/posts/image", {
        description: description,
    }).then((response) => {
        console.log(response)
        return response.data
    }).catch((error) => {
        console.log(error)
        return error.response.data
    });
};

export const generateImageCaption = async (image_url) => {
    return await fetchRequest.get(apiURL + "/api/posts/caption?imageUrl=" + image_url).then((response) => {
        console.log(response)
        return response.data
    }).catch((error) => {
        console.log(error)
        return error.response.data
    });
};
