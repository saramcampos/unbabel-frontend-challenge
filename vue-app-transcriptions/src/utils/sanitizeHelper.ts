function sanitizeToJson(response: string) {
    return response.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
}

export {
    sanitizeToJson
}