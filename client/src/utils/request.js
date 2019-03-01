const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json"
});

const get = (url) => {
    return fetch(url, {
        method: "GET",
        headers: headers,
        credentials: 'include'
    }).then(response => {
        return jsonInterceptor(url, response);
    }).then(res => {
        return errorInterceptor(res);
    }).catch(err => {
        console.error(`Request failed. Url = ${url} . Message = ${err}`);
        return {
            error: {
                message: "Request failed."
            }
        };
    })
}

const post = (url, data) => {
    return fetch(url, {
        method: "POST",
        headers: headers,
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(response => {
        return jsonInterceptor(url, response);
    }).then(res => {
        return errorInterceptor(res);
    }).catch(err => {
        console.error(`Request failed. Url = ${url} . Message = ${err}`);
        return {
            error: {
                message: "Request failed."
            }
        };
    })
}

const put = (url, data) => {
    return fetch(url, {
        method: "PUT",
        headers: headers,
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(response => {
        return jsonInterceptor(url, response);
    }).then(res => {
        return errorInterceptor(res);
    }).catch(err => {
        console.error(`Request failed. Url = ${url} . Message = ${err}`);
        return {
            error: {
                message: "Request failed."
            }
        };
    })
}

const jsonInterceptor = (url, response) => {
    if (response.status < 500) {
        return response.json();
    } else {
        console.error(`Request failed. Url = ${url} . Message = ${response.statusText}`);
        return {
            error: {
                message: "Request failed."
            }
        };
    }
}

const errorInterceptor = (res) => {
    if (!res.error) {
        if (res.code === 401) {
        if (!window.location.pathname.startsWith('/signin') && !window.location.pathname.startsWith('/signup')) {
            window.location.href = "/signin";
        }
        }
    }
    return res;
}

export {
    get,
    post,
    put
}