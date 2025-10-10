import { ArcticFetchError, Google, OAuth2RequestError, generateCodeVerifier, generateState } from "arctic";

const googleLogin = (google: Google) => {
    const state = generateState()
    const codeVerifier = generateCodeVerifier()
    const url = google.createAuthorizationURL(state, codeVerifier, ["openid", "profile"])
    return url
}

const validateAuthorizationCode = async (google: Google, code: string) => {
    try {
        const codeVerifier = generateCodeVerifier()
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        const accessToken = tokens.accessToken();
        const accessTokenExpiresAt = tokens.accessTokenExpiresAt();
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            // Invalid authorization code, credentials, or redirect URI
            const code = e.code;
            // ...
        }
        if (e instanceof ArcticFetchError) {
            // Failed to call `fetch()`
            const cause = e.cause;
            // ...
        }
        console.log(e)
        // Parse error
    }
}

const getUserProfile = async (google: Google, code: string) => {
    const scopes = ["openid"];
    const state = generateState()
    const codeVerifier = generateCodeVerifier()
    // const url = google.createAuthorizationURL(state, codeVerifier, scopes);
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);

}


export { googleLogin, getUserProfile }