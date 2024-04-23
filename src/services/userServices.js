import fetchRequest from "./fetchServices";

const apiURL = process.env.REACT_APP_API_URL;


export const logIn = async (data) => {
    return await fetchRequest.post(apiURL + "/api/login", {
        email: data.email,
        password: data.password
    }).then((response) => {
        console.log(response)
        return response.data
    }).catch((error) => {
        console.log(error)
        return error.response.data
    });
};

export const register = async (data) => {
    return await fetchRequest.post(apiURL + "/api/register", {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password
    }).then((response) => {
        console.log(response)
        return response.data
    }).catch((error) => {
        console.log(error)
        return error.response.data
    });
};

export const getUserData = async (id) => {
    return await fetchRequest.get(apiURL + "/api/user/" + id)
        .then((response) => {
            console.log(response)
            return response.data
        }).catch((error) => {
            console.log(error)
            return error.response.data
        });
}

export const facebookOauth2LogIn = async () => {
    const accessToken = localStorage.getItem('token')
    const facebookOAuthUrl = apiURL + "/api/login/oauth2/facebook?userAccessToken=" + accessToken;
    window.location.href = facebookOAuthUrl;
}

export const createInstagramPost = async (data) => {
    return await fetchRequest.post(apiURL + "/api/posts/create", {
        image_url: data.imageUrl,
        description: data.description,
    }).then((response) => {
        console.log(response)
        return response.data
    }).catch((error) => {
        console.log(error)
        return error.response.data
    });
};