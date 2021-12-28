const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRE_KEY = "jwt-expire";
const USER_KEY = "user-local-id";

export function setTokens(tokens) {
    localStorage.setItem(TOKEN_KEY, tokens.idToken);
    localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
    localStorage.setItem(EXPIRE_KEY, new Date().getTime() + tokens.expiresIn * 1000);
    localStorage.setItem(USER_KEY, tokens.localId);
}
export function revomeTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRE_KEY);
    localStorage.removeItem(USER_KEY);
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

export function getUserKey() {
    return localStorage.getItem(USER_KEY);
}
