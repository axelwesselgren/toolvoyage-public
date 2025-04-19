export const validateEmail = (email: string) => {
    if (!email) {
        return ["Email is required", false];
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return ["Invalid email format", false];
    }

    if (email.length > 254) {
        return ["Email is too long", false];
    }

    return ["Valid email", true];
}

export const validatePassword = (password: string) => {
    if (!password) {
        return ["Password is required", false];
    }

    if (password.length < 8) {
        return ["Password must be at least 8 characters", false];
    }

    if (password.length >= 64) {
        return ["Password is too long", false];
    }

    return ["Valid password", true];
}