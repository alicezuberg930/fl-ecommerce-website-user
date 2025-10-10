async function generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(codeVerifier)
    const digest = await crypto.subtle.digest('SHA-256', data)
    const base64String = btoa(String.fromCharCode(...new Uint8Array(digest)))
    return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

export { generateCodeChallenge }