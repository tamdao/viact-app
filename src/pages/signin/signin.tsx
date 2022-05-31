import {
  Button,
  Paper,
  Stack,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Alert,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import GoogleIcon from '@mui/icons-material/Google'
import React, { useCallback, useState } from 'react'
import { Controller, useForm, useFormState } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as LogoImage } from './images/logo.svg'
import { signin as signinApi } from './api/signin'
import { useMutation } from 'react-query'

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

export function Signin() {
  const { control, handleSubmit } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  })

  const { isDirty, isValid } = useFormState({
    control,
  })

  const [showPassword, setShowPassword] = useState(false)

  const onToggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword)
  }, [showPassword])

  const { isLoading, error, mutate } = useMutation(signinApi)

  let navigate = useNavigate()

  const onSubmit = (data: { [x: string]: string }) => {
    mutate(
      { username: data.username, password: data.password },
      {
        onSuccess: () => {
          navigate('/home')
        },
      }
    )
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2, md: 3 },
        maxWidth: 420,
        margin: 'auto',
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <LogoImage />
        <Typography color="primary">
          Automate
          <br />
          Construction
          <br />
          Monitoring
        </Typography>
      </Stack>
      <Stack alignItems="center" mb={4}>
        <Typography>LOGIN</Typography>
        <Typography color="primary" sx={{ fontSize: 20, fontWeight: 700 }}>
          Welcome Back
        </Typography>
      </Stack>
      {!!error && (
        <Stack alignItems="center" mb={4}>
          <Alert variant="outlined" severity="error">
            Incorrect username or password.
          </Alert>
        </Stack>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              label="Email or username"
              variant="outlined"
              fullWidth
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? 'text' : 'password'}
              {...field}
            />
          )}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={showPassword}
              onChange={onToggleShowPassword}
              name="showPassword"
            />
          }
          label="Show password"
        />
        <LoadingButton
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          disabled={!isDirty || !isValid}
          loading={isLoading}
        >
          Login
        </LoadingButton>
      </form>
      <Typography sx={{ textAlign: 'center', my: 1 }}>OR</Typography>
      <Button
        fullWidth
        variant="contained"
        startIcon={<GoogleIcon />}
        size="large"
        onClick={() => window.alert('Comming soon')}
      >
        Login with Google
      </Button>
      <Typography sx={{ textAlign: 'center', my: 1 }}>
        Not on Viact yet?{' '}
        <Link sx={{ fontWeight: 'bold' }} href="/signup">
          Signup
        </Link>{' '}
        now.
      </Typography>
    </Paper>
  )
}
