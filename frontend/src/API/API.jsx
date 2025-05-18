
const header = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
}

export const signupUser = async (user) => {
    const url = `/api/signup`
    const params = {
        ...header,
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (res.status == 409 && res.statusText == "username") {
            console.log('Signup error: Username taken');
            return { usernameTaken: true };
        }
        if (res.status == 409 && res.statusText == "email") {
            console.log('Signup error: Email taken');
            return { emailTaken: true };
        }
        if (!res.ok) {
            console.log('Signup error:', res.status);
            return {};
        }
        const parsed = await res.json();
        return parsed;
    }
    catch (error) {
        console.error('Signup error:', error.message);
    }
}

export const loginUser = async (user) => {
    const url = `/api/login`
    const params = {
        ...header,
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (res.status == 404 && res.statusText == "email") {
            console.log('Login error: Email not found');
            return { emailNotFound: true };
        }
        if (res.status == 401 && res.statusText == "password") {
            console.log('Login error: Password incorrect');
            return { passwordIncorrect: true };
        }
        if (!res.ok) {
            console.log('Login error:', res.status);
            return {};
        }
        const parsed = await res.json();
        return parsed;
    }
    catch (error) {
        console.error('Login error:', error.message);
    }
}

export const checkLogin = async () => {
    const url = `/api/checklogin`;
    const params = {
        ...header,
        method: 'GET',
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        const parsed = await res.json();
        return parsed;
    }
    catch (error) {
        console.error('Check login error:', error.message);
    }
}

export const logoutUser = async () => {
    const url = `/api/logout`;
    const params = {
        ...header,
        method: 'GET',
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (!res.ok) {
            console.log('Logout error:', res.status);
            return;
        }
        return res;
    }
    catch (error) {
        console.error('Logout error:', error.message);
    }
}

export const getChatList = async (username) => {
    const url = `/api/user/${username}/chat`;
    const params = {
        ...header,
        method: 'GET',
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (!res.ok) {
            console.log('Get chat list error:', res.status);
            return;
        }
        const parsed = await res.json();
        return parsed;
    }
    catch (error) {
        console.error('Get chat list error:', error.message);
    }
}

export const chat = async (username, userQuery, convHistory) => {
    try {
        const response = await fetch(`/api/chat`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, userQuery: userQuery, convHistory: convHistory })
        })
        // console.log(response)
        const data = await response.text();
        console.log("response:" + data)
        return data
    } catch (err) {
        console.error('Simpli error:', err)
        return `Err: Simpli cannot give back an answer. ${err}`
    }
}

export const deleteChat = async (username) => {
    try {
        console.log("deleteChat")
        const res = await fetch(`/api/chat`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        });
        if (!res.ok) throw new Error(await res.text());
    } catch (err) {
        console.error("Failed to delete chat:", err);
    }
};

export const getUserRoutine = async (username) => {
    const url = `/api/user/${username}/routine`;
    const params = {
        ...header,
        method: 'GET',
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (!res.ok) {
            console.log('Get routine error:', res.status);
            return;
        }
        const parsed = await res.json();
        return parsed;
    }
    catch (error) {
        console.error('Get routine error:', error.message);
    }
}

export const uploadSelfie = async (payload) => {
    let headers = {};
    let body;
    if (payload instanceof FormData) {
        body = payload;
    } else if (payload && typeof payload === 'object' && 'image' in payload) {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(payload);
    } else {
        throw new Error('Invalid payload for uploadSelfie');
    }
    const res = await fetch(`/api/selfie`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body,
    });
    if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `Upload failed: ${res.status}`);
    }
    return res.json();
};


