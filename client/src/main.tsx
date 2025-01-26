import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Home from './Pages/Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout/AuthLayout.tsx'
import Support from './Pages/Support.tsx'
import SignUp from './Pages/SignUp.tsx'
import SingIn from './Pages/SignIn.tsx'
import { Provider } from 'react-redux'
import Store from './store/store.tsx'

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/Home",
        element: <Home />
      },
      {
        path: '/sign-in',
        element: (
          <AuthLayout authentication={false}>
            <SingIn />
          </AuthLayout>
        )
      },
      {
        path: '/sign-up',
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        )
      },
      {
        path: 'support/:id',
        element: <Support />
      },

    ]
  }
])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={route} />
    </Provider>
  </StrictMode>,
)
