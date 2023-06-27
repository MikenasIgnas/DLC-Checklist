/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ChecklistHistoryPage from './pages/ChecklistHistoryPage'
import ChecklistStartPage from './pages/ChecklistStartPage'
import ChecklistRoutesPage from './pages/ChecklistRoutesPage'
import SingleHistoryPage from './pages/SingleHistoryPage'
import CreateUserPage from './pages/CreateUserPage'
import ManageUsersPage from './pages/ManageUsersPage'
import EditUsersProfilePage from './pages/EditUsersProfilePage'
import SingleUserPage from './pages/SingleUserPage'
import PageLayout from './components/PageLayout/PageLayout'
import UsersArchivePage from './pages/UsersArchivePage'
import { useCookies } from 'react-cookie'
import jwt_decode from 'jwt-decode'
import { TokenType } from './types/globalTypes'

const Routing = () => {
  const [cookies, , removeCookie] = useCookies(['access_token'])

  React.useEffect(() => {
    (async () => {
      const token = cookies.access_token
      if (token) {
        try {
          const decodedToken: TokenType = jwt_decode(token)
          const expirationTime =  decodedToken.exp * 1000
          const currentTime =     Date.now()
          const timeRemaining =   expirationTime - currentTime
          if (timeRemaining <= 0) {
            localStorage.clear()
            removeCookie('access_token')
          } else {
            window.setTimeout(() => {
              localStorage.clear()
              removeCookie('access_token')
            }, timeRemaining)
          }
        } catch (error) {
          console.log('Invalid token', error)
        }
      }
    })()
  }, [cookies.access_token, removeCookie])

  return (
    <BrowserRouter>
      {cookies.access_token
        ? (
          <PageLayout>
            <Routes>
              <Route path='/' element={<ChecklistStartPage />} />
              <Route path='getHistoryData' element={<ChecklistHistoryPage />} />
              <Route path='singleHistoryUnit/:id' element={(<SingleHistoryPage />)} />
              <Route path='ChecklistRoutes' element={<ChecklistRoutesPage />} />
              <Route path='CreateUser' element={<CreateUserPage />} />
              <Route path='UsersArchive' element={<UsersArchivePage />} />
              <Route path='ManageUsers' element={<ManageUsersPage />} />
              <Route path='EditUsersProfile' element={<EditUsersProfilePage />} />
              <Route path='SingleUserPage/:secret' element={<SingleUserPage />} />
            </Routes>
          </PageLayout>
        )
        : (
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        )}
    </BrowserRouter>
  )
}

export default Routing
