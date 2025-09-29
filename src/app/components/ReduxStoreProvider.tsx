"use client"
import { store } from '@/app/api/store'
import React from 'react'
import { Provider } from "react-redux"

const ReduxStoreProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default ReduxStoreProvider