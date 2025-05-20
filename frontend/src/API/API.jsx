const isProd = import.meta.env.MODE === 'production';
const apiUrl = !isProd ? 'http://localhost:4000' : 'https://simplify-e3px.onrender.com';
console.log('API URL is', apiUrl, 'mode:', import.meta.env.NODE_ENV);

console.log(apiUrl, process.env.NODE_ENV)

const header = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
}

export const signupUser = async (user) => {
    const url = `${apiUrl}/api/signup`
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
    const url = `${apiUrl}/api/login`
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
    const url = `${apiUrl}/api/checklogin`;
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
    const url = `${apiUrl}/api/logout`;
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
    const url = `${apiUrl}/api/user/${username}/chat`;
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
        const response = await fetch(`${apiUrl}/api/chat`, {
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
        const res = await fetch(`${apiUrl}/api/chat`, {
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
    const res = await fetch(`${apiUrl}/api/selfie`, {
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

export const uploadImage = async (formData) => {
    const url = `${apiUrl}/api/upload`;
    const params = {
        method: 'POST',
        credentials: 'include',
        body: formData
    };
    try {
        const res = await fetch(url, params);
        if (!res.ok) {
            console.log('Image upload error:', res.status);
            const errText = await res.text();
            throw new Error(errText || 'Upload failed');
        }
        const parsed = await res.json();
        return parsed;
    }
    catch (error) {
        console.error('Image upload error:', error.message);
        return { error: error.message };
    }
};

export const getRecommendedRoutine = async (surveyData) => {
    const query = new URLSearchParams(surveyData).toString();
    const url = `${apiUrl}/api/recommendation?${query}`;
    const params = {
        ...header,
        method: 'GET',
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (!res.ok) {
            console.log('Get recommendation error:', res.status);
            return;
        }
        const parsed = await res.json();
        return parsed;
    }
    catch (error) {
        console.error('Get recommendation error:', error.message);
    }
};



export const fetchLeaderboard = async () => {
    const url = `${apiUrl}/api/leaderboard`;
    const params = {
        ...header,
        method: 'GET',
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (!res.ok){
            console.error('Error fetching leaderboard:', res.status);
            return [];
         }
        const parsed = await res.json();
        return parsed;
    }
    catch (e) {
        console.error('Fetch leaderboard error:', e.message);
    }
}
            

export const getUserRoutine = async (username) => {
    const url = `${apiUrl}/api/user/${username}/routine`;
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


export const fetchHomeLeaderboard = async (username) => {
    const url = `${apiUrl}/api/${username}/homeleaderboard`;
    const params = {
        ...header,
        method: 'GET',
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (!res.ok){
            console.error('Error fetching home leaderboard:', res.status);
            return [];
        }
        const parsed = await res.json();
        return parsed;
    }
    catch (e) {
        console.error('Fetch home leaderboard error:', e.message);
    }
}

export const fetchUserStreak = async (username) => {
    const url = `${apiUrl}/api/${username}/streak`;
    const params = {
        ...header,
        method: 'GET',
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (!res.ok){
            console.error('Error fetching user streak:', res.status);
            return null;
        }
        const parsed = await res.json();
        return parsed;
    }
    catch (e) {
        console.error('Fetch User Streak error:', e.message);
    }
}

export const fetchUserPoint = async (username) => {
    const url = `${apiUrl}/api/${username}/point`;
    const params = {
        ...header,
        method: 'GET',
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (!res.ok){
            console.error('Error fetching user point:', res.status);
            return null;
        }
        const parsed = await res.json();
        return parsed;
    }
    catch (e) {
        console.error('Fetch User Point error:', e.message);
    }
}


export const updateUserStreak = async () => {
    const url = `${apiUrl}/api/updatestreak`;
    const params = {
        ...header,
        method: 'POST',
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (!res.ok){
            console.error('Error updating user streak:', res.status);
            return null;
        }
        const parsed = await res.json();
        return parsed;
    }
    catch (e) {
        console.error('Fetch User Streak error:', e.message);
    }
}


export const fetchUserDays = async (username) => {
    const url = `${apiUrl}/api/${username}/days`;
    const params = {
        ...header,
        method: 'GET',
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (!res.ok){
            console.error('Error fetching user days:', res.status);
            return null;
        }
        const parsed = await res.json();
        return parsed;
    }
    catch (e) {
        console.error('Fetch User Days error:', e.message);
    }
}

