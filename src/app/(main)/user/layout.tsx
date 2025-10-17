import '@/app/styles/css/user.content.css'
import UserMenu from "./components/UserMenu"

type Props = {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <>
            <main className="user-content-main">
                <div className="user-content-wrapper">
                    <UserMenu />
                    <div className="user-content-body">
                        {children}
                    </div>
                </div>
            </main>
        </>
    )
}