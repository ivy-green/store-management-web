export const addDataToLS = (id: string, data: string) => {
    localStorage.setItem(id, data);
}

export const getDataFromLS = (id: string) => {
    return typeof window !== 'undefined' ? localStorage.getItem(id) : null;
}

export const removeDataInLS = (id: string) => {
    return typeof window !== 'undefined' ? localStorage.removeItem(id) : null;
}