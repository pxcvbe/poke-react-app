import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout' 
import PokedexPage from '../pages/pokedex'
import InventoryPage from '../pages/inventory'
import LoginPage from '../pages/login'
import RequireAuth from '../components/requireauth'
import BattlePage from '../pages/battle'

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <PokedexPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'inventory', element: <RequireAuth><InventoryPage /></RequireAuth> },
      { path: 'battle/:name', element: <BattlePage /> },
    ],
  },
])
