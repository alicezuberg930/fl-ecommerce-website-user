"use client"
import { AsyncThunk } from '@reduxjs/toolkit'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export const slugify = (str: string): string => {
    if (!str) return ""
    return str.trim()
        .normalize('NFD') // Normalize to decompose combined letters (e.g., ấ → a + ̂)
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics (accents)
        .replace(/[^A-Za-z0-9\s-đ]/g, '') // Allow Vietnamese characters, numbers, spaces, and hyphens
        // .replace(/[^A-Za-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Collapse multiple hyphens into one
}

export const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
}

export const getHours = (seconds: number) => {
    return String(Math.floor(seconds / 3600)).padStart(2, "0")
}

export const getMinutes = (seconds: number) => {
    return String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")
}

export const getSeconds = (seconds: number) => {
    return String(seconds % 60).padStart(2, "0")
}

export const createNotification = ({ title, icon, body }: { title: string, icon: string, body: string }) => {
    return new Notification(title, { body, icon });
}

export const generateSecureRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, (value) => characters[value % characters.length]).join('');
}

