import { useRef, useEffect } from 'react'
import { Box, Button, TextField, Typography, Avatar } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import * as authActions from '../../actions/auth_api'
import { Notification } from '../General/Notification'

const INITIAL_USER_CREDENTIALS = {
  userName: '',
  password: ''
}

const Login = () => {
  const userCredentials = useRef(INITIAL_USER_CREDENTIALS)

  const {
    data: userLoginData,
    mutate: userLogin,
    isLoading: isLoginLoading,
    status: isUserLoggedIn,
    error: loginError
  } = authActions.useLoginUser()

  useEffect(() => {
    if (isUserLoggedIn) {
      if (isUserLoggedIn === 'success') {
        localStorage.setItem('token', userLoginData.token)
        window.location.href = '/dashboard'
        Notification({
          type: 'success',
          title: 'User logged in successfully!'
        })
      } else if (isUserLoggedIn === 'error') {
        Notification({
          type: 'error',
          title: 'Failed to login!'
        })
      }
    }
  }, [isUserLoggedIn, userLoginData])

  const handleLogin = () => {
    userLogin({
      userName: userCredentials.current.userName.trim(),
      password: userCredentials.current.password
    })
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f3f4f6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Avatar
        sx={{
          width: 80,
          height: 80,
          mb: 2
        }}
      >
        <img
          src='/yellow-book-app-icon.png'
          alt='logo'
          style={{ width: 50, height: 50 }}
        />
      </Avatar>

      <Typography
        variant='h5'
        fontWeight='bold'
        textAlign='center'
        gutterBottom
      >
        Login
      </Typography>
      <Typography
        variant='body2'
        color='text.secondary'
        textAlign='center'
        mb={3}
      >
        Get access to your account and more
      </Typography>
      <TextField
        label='User name'
        fullwidth
        variant='outlined'
        margin='normal'
        onChange={e => (userCredentials.current.userName = e.target.value)}
        sx={{ width: 350, backgroundColor: '#fff' }}
      />
      <TextField
        label='Password'
        fullwidth
        variant='outlined'
        type='password'
        margin='normal'
        onChange={e => (userCredentials.current.password = e.target.value)}
        sx={{ width: 350, backgroundColor: '#fff' }}
      />
      <Button
        variant='contained'
        sx={{
          mt: 2,
          py: 1.2,
          borderRadius: 2,
          fontWeight: 600,
          fontSize: 16,
          bgcolor: '#2962FF',
          width: '100%',
          maxWidth: 350
        }}
        startIcon={<LockOpenIcon />}
        onClick={handleLogin}
        loading={isLoginLoading}
      >
        Login
      </Button>
    </Box>
  )
}

export default Login
