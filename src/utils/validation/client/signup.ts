export const validateEmail = (email: string) => {
    if (!email) {
        return { message: "Email is required", success: false };
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return { message: "Invalid email format", success: false };
    }

    if (email.length > 254) {
        return { message: "Email is too long", success: false };
    }

    return { message: "Valid email", success: true };
}

export const validatePassword = (password: string) => {
    if (!password) {
        return { message: "Password is required", success: false };
    }

    if (password.length < 8) {
        return { message: "Password must be at least 8 characters", success: false };
    }

    if (password.length >= 64) {
        return { message: "Password is too long", success: false };
    }

    return { message: "Valid password", success: true };
}