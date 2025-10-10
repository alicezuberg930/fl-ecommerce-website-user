// import type { OAuth2Token, OauthAccount } from '../core/types'
import { GoogleUserResponse, OAuth2Token, OauthAccount } from '../types'
import BaseProvider, { OAuthClient } from './base'

export default class Google extends BaseProvider {
    private client: OAuthClient

    private authorizationEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth'
    private tokenEndpoint = 'https://oauth2.googleapis.com/token'
    private userEndpoint = 'https://openidconnect.googleapis.com/v1/userinfo'

    constructor(
        clientId: string,
        clientSecret: string,
        redirectUrl?: string
    ) {
        super()
        this.client = new OAuthClient(
            clientId,
            clientSecret,
            redirectUrl ?? this.createCallbackUrl('google'),
        )
    }

    public override async createAuthorizationURL(state: string, codeVerifier: string): Promise<URL> {
        const url = await this.client.createAuthorizationUrlWithPKCE(
            this.authorizationEndpoint,
            state,
            ['openid', 'email', 'profile'],
            codeVerifier
        )
        return url
    }

    override async fetchUser(code: string, codeVerifier: string | null): Promise<OauthAccount> {
        const tokenResponse = await this.client.validateAuthorizationCode(this.tokenEndpoint, code, codeVerifier)
        if (!tokenResponse.ok) {
            const error = await tokenResponse.text().catch(() => 'Unknown error')
            throw new Error(`Google API error: ${error}`)
        }
        const tokenData: OAuth2Token = await tokenResponse.json()
        const response = await fetch(this.userEndpoint, {
            headers: { Authorization: `Bearer ${tokenData.access_token}` }
        })
        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Unknown error')
            throw new Error(`Google API error (${response.status}): ${errorText}`)
        }
        const userData: GoogleUserResponse = await response.json()
        return {
            _id: userData.sub,
            email: userData.email,
            name: userData.name,
            avatar: userData.picture,
        }
    }
}

