

export function save(id, project) {
    localStorage.setItem(id, JSON.stringify(project));
}

export function remove(id) {
    localStorage.removeItem(id);
}

export function isSaved(id) {
    return localStorage.getItem(id);
}

export function getAll() {
    let data = [];
    for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index);
        data.push(JSON.parse(localStorage.getItem(key)));
    }
    return data;
}