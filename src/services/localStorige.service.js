const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRE_KEY = "jwt-expire";

export function setTokens(tokens) {
    localStorage.setItem(TOKEN_KEY, tokens.idToken);
    localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
    localStorage.setItem(EXPIRE_KEY, tokens.expiresIn);
}
export function getTokenKey() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}
export function getExpireKey() {
    return localStorage.getItem(EXPIRE_KEY);
}
