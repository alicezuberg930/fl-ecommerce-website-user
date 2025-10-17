import { AxiosError } from 'axios'

export const handleErrorResponse = (error: any): void => {
    if (error instanceof AxiosError) {
        const message = error.response?.data.message || error.message
        if (Array.isArray(message)) {
            throw new Error(`API Error: ${message.toString()} (Status: ${error.response?.status || 'N/A'})`)
        } else {
            throw new Error(`API Error: ${message} (Status: ${error.response?.status || 'N/A'})`)
        }
    } else {
        throw new Error(`Unexpected error while fetching data: ${(error instanceof Error ? error.message : String(error))}`)
    }
}

export const slugify = (str: string): string => {
    if (!str) return ''
    return str.trim()
        .normalize('NFD') // Normalize to decompose combined letters (e.g., ấ → a + ̂)
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents)
        .replace(/[^A-Za-z0-9\s-đ]/g, '') // Allow Vietnamese characters, numbers, spaces, and hyphens
        // .replace(/[^A-Za-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Collapse multiple hyphens into one
}

export const createNotification = ({ title, icon, body }: { title: string, icon: string, body: string }): Notification => {
    return new Notification(title, { body, icon })
}

export const generateSecureRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)
    return Array.from(array, (value) => characters[value % characters.length]).join('')
}

export const deepObjectComparison = (obj1: any, obj2: any): boolean => {
    if (obj1 === obj2) return true
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) return false
    for (let key of keys1) {
        if (!keys2.includes(key) || !deepObjectComparison(obj1[key], obj2[key])) return false
    }
    return true
}

export function getBaseUrl(): string {
    if (typeof window !== 'undefined') return window.location.origin
    if (process.env.PRODUCTION_URL) return process.env.PRODUCTION_URL
    return `http://localhost:${process.env.PORT ?? 3000}`
}