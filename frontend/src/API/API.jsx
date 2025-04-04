const header = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
}

export const signupUser = async (user) => {
    const url = "http://localhost:4000/api/signup";
    const params = {
        ...header,
        method: 'POST',
        body: JSON.stringify(user),
        credentials: 'include'
    };
    try {
        const res = await fetch(url, params);
        if (!res.ok) {
            console.log('Signup error:', res.status);
            return;
        }
        const parsed = await res.json();
        return parsed;
    }
    catch (error) {
        console.error('Signup error:', error.message);
    }
}

export const checkLogin = async () => {
    const url = "http://localhost:4000/api/checklogin";
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
    const url = "http://localhost:4000/api/logout";
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