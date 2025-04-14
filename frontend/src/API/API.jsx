const apiUrl = 'http://localhost:4000'

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
        else if (!res.ok) {
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
        else if (!res.ok) {
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