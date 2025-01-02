import { useEffect, useState, CSSProperties } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import config from './conf/conf'
import authService from './appWrite/authService'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './store/authSlice'
import { Header, Footer, Logo } from './components/index'
import { Outlet, useNavigate } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'

function App() {

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((data) => {
        if (data) {
          dispatch(login(data))
        }
        else {
          dispatch(logout())
        }

      })
    .finally(setLoading(false))

  }, [navigate, dispatch])


  return !loading ? (

    <div className='min-h-screen flex flex-wrap content-between w-full'>
      <div className='block w-full'>
        <Header />
        <main className='min-h-screen min-w-screen'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className='p-8 place-content-center min-h-screen flex flex-wrap content-between w-full'>
      <BounceLoader
        color={"rgba(9, 184, 80)"}
        CSSProperties={override}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default App
