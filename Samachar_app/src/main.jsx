import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Protected, PostForm} from './components/index.js'
import AuthLayout from './components/AuthLayout.jsx'
import LoginIn from './pages/LoginIn.jsx'
import SignUp from './pages/SignUp.jsx'
import AddPost from './pages/AddPost.jsx'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'
import EditPost from './pages/EditPost.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
              <AuthLayout authentication={false}>
               <LoginIn />
          </AuthLayout>
                   
                
            ),
        },
        {
            path: "/signup",
            element: (
              <AuthLayout authentication={false}>
              <SignUp />
          </AuthLayout>
                    
                
            ),
        },
        {
            path: "/all-posts",
            element: (
              <AuthLayout authentication>
              {" "}
              <AllPosts />
          </AuthLayout>
                    ),
        },
        {
            path: "/add-post",
            element: (
              <AuthLayout authentication>
              {" "}
              <AddPost />
          </AuthLayout>

                    
                
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (

              <AuthLayout authentication>
              {" "}
              <EditPost />
          </AuthLayout>
                    
                
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
  <RouterProvider router={router}/>
 </Provider>
      

)
