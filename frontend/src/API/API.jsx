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
        body: JSON.stringify(user)
    };
    try {
        const res = await fetch(url, params);
        const parsed = await res.json();
        return parsed;
    }
    catch (error) {
        console.error('Signup error:', error.message);
    }
}

export default signupUser;