'use client'
import React from "react";
import '@/app/styles/css/user.content.css'
import UserMenu from "./UserMenu";
import SeenProductList from "./SeenProductList";

const UserContent = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main className="user-content-main">
            <div className="user-content-wrapper">
                <UserMenu />
                <div className="user-content-body">
                    {children}
                </div>
            </div>
            <SeenProductList />
        </main>
    )
}

export default UserContent