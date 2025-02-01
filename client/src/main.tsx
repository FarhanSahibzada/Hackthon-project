import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Home from './userPages/Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout/AuthLayout.tsx'
import Support from './userPages/Support.tsx'
import SignUp from './userPages/SignUp.tsx'
import SingIn from './userPages/SignIn.tsx'
import { Provider } from 'react-redux'
import Store from './store/store.tsx'
import Proctected from './components/Protected/Proctected.tsx'
import UserData from './DepartmentPages/UserData.tsx'
import Dashboard from './AdminPages/Dashboard.tsx'


//  work on the procteded routes 

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Home",
        element: (
          <AuthLayout authentication >
            <Proctected allowedRoles={["user"]}>
              <Home />
            </Proctected>
          </AuthLayout >
        )
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
        element: (
          <AuthLayout authentication >
          <Proctected allowedRoles={["user"]}>
            <Support />
          </Proctected>
        </AuthLayout >
        )
      },
      {
        path: 'user-data',
        element: (
          <AuthLayout authentication >
          <Proctected allowedRoles={["department"]}>
            <UserData/>
          </Proctected>
        </AuthLayout >
        )
      },{
          path: 'dashboard',
          element: (
            <AuthLayout authentication >
            <Proctected allowedRoles={["admin"]}>
              <Dashboard/>
            </Proctected>
          </AuthLayout >
          )
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
