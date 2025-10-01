import { Outlet } from 'react-router-dom'
import Header from '../header'
import { AuthProvider } from '../../contexts/auth'
import { ToastProvider } from '../toast'
import { BallProvider } from '../../contexts/ball'
import { InventoryProvider } from '../../contexts/inventory'
import Footer from '../footer'

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-white to-red-50 dark:from-zinc-900 dark:to-zinc-950 dark:text-zinc-100">
      <AuthProvider>
        <ToastProvider>
          <BallProvider>
            <InventoryProvider>
              <Header />
              <main className="flex-1">
                <Outlet />
              </main>
              {/* <Footer /> */}
            </InventoryProvider>
          </BallProvider>
        </ToastProvider>
      </AuthProvider>
    </div>
  )
}
