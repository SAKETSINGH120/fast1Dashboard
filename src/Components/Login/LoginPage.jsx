import React, { useState } from 'react'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { emailPasswordLogin } from '../../Firebase/firebaseAuth/userLogin'

import {
  Button,
  TextField,
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Typography,
  Backdrop,
  Box,
  useMediaQuery,
} from '@mui/material'

import { Triangle } from 'react-loader-spinner'

export const LoginPage = () => {
  const navigate = useNavigate()
  const matches = useMediaQuery('(min-width:700px)')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [match, setMatch] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [loader, setLoader] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      // let result = await emailPasswordLogin(user, pass);|
      // let result=true;

      // console.log('user and password', user === 'test@gmail.com', pass === 'test@1234')
      if (user === 'test@gmail.com' && pass === 'test@123') {
        localStorage.setItem('isFastoneLoggedIn', 'true')

        setLoader(false)
        navigate('/userlisting')
        setMatch(false)
      } else {
        alert('Invalid Credential')
      }
    } catch (error) {
      console.error('Error signing in:', error.message)
      setMatch(true)
    } finally {
      setLoader(false)
    }
  }

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
        <Box>
          <Triangle
            height="80"
            width="80"
            color="black"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={loader}
          />
        </Box>
      </Backdrop>
      <section className={style.main_sec}>
        <div className={` card-bordered ${style.right}`}>
          <div className="d-flex justify-content-center">
            <img className="mx-auto" src="/images/logo.png" width="100px" alt="" />
          </div>
          <h3 className="text-center text-white mt-2">Sign In</h3>
          {!match ? <br /> : <h5 style={{ color: 'red' }}>Please Enter valid Id or Password</h5>}
          <form onSubmit={handleSubmit}>
            <label className="mb-2 text-white form-label mt-4 fs-6">Email or Username</label>
            <TextField
              className={`bg-white`}
              placeholder="Enter Your Username"
              type="email"
              fullWidth
              required
              //   value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            {/* <small className="text-white">
                test@gmail.com
              </small> */}
            <label className="mb-2 text-white form-label mt-3 fs-6">Password</label>
            <FormControl sx={{ mb: 2 }} fullWidth>
              <OutlinedInput
                className="bg-white"
                placeholder="Enter Your Password"
                type={showPass ? 'text' : 'password'}
                required
                // value={pass}
                onChange={(e) => setPass(e.target.value)}
                endAdornment={
                  <InputAdornment className="bg-white" position="end">
                    <IconButton className="bg-white" onClick={() => setShowPass(!showPass)}>
                      {showPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {/* <small className="text-white">test@1234</small> */}
            </FormControl>

            <Button
              variant="contained"
              className="mt-3 py-3"
              sx={{ background: '#3B76EF', color: 'white', hover: 'none' }}
              type="submit"
              fullWidth
            >
              LOGIN
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}
