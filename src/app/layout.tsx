import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './globals.css'
import Footer from '@/layouts/main/footer/Footer'
import Header from '@/layouts/main/header/Header'
import React, { Suspense } from 'react'
import generateMetadaUtils from "../utils/seo"
import ChatBot from './components/ChatBox'
import ThemeProvider from '@/theme'
import { SettingsProvider, ThemeSettings } from '@/components/settings'
import { MotionLazyContainer } from '@/components/animate'
import SnackbarProvider from '@/components/snackbar'
import CustomQueryClientProvider from '@/components/query-client/CustomQueryClientProvider'
import { AuthProvider } from '@/auth/JwtContext'
import ReduxProvider from '@/redux/ReduxProvider'

export const metadata = generateMetadaUtils({})

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body>
        <CustomQueryClientProvider>
          <SettingsProvider>
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <SnackbarProvider>
                    <AuthProvider>
                      <ReduxProvider>
                        <Header />
                        <main>{children}</main>
                        {/* <Footer /> */}
                        <ChatBot />
                      </ReduxProvider>
                    </AuthProvider>
                  </SnackbarProvider>
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
          </SettingsProvider>
        </CustomQueryClientProvider>
      </body>
    </html>
  )
}