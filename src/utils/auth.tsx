
export const setTokenToLS = (token: string) => {
    localStorage.setItem("access-token", token);
}

export const getTokenFromLS = () => {
    return typeof window !== 'undefined' ? localStorage.getItem("access-token") : null;
}

export const setRefreshTokenToLS = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("refresh-token", token);
    }
}

export const getRefreshtokenFromLS = () => {
    return typeof window !== 'undefined' ? localStorage.getItem("refresh-token") : "";
}

export const clearLocalStorage = () => {
    return typeof window !== 'undefined' && localStorage.clear();
}

export const getHighestRole = () => {
    if (typeof window !== 'undefined') {
        var role = localStorage.getItem("Auth-store");
        if (role) {
            if (role.includes("Admin")) return "Admin";
            if (role.includes("Manager")) return "Manager";
            if (role.includes("Staff")) return "Staff";
            if (role.includes("Shipper")) return "Shipper";
            if (role.includes("Customer")) return "Customer";
        }
    }
    return "";
}

export const isAuthenticated = () => {
    return typeof window !== 'undefined' ? getTokenFromLS() : null;
}