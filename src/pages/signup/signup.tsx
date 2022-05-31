import {
  Grid,
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
import React, { useCallback, useState } from 'react'
import { Controller, useForm, useFormState } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as LogoImage } from './images/logo.svg'
import { signup as signupApi } from './api/signup'
import { useMutation } from 'react-query'

const phoneJoi = Joi.extend(require('joi-phone-number'))

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  phoneNumber: phoneJoi.string().phoneNumber(),
  password: Joi.string()
    .regex(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/
    )
    .required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
})

export function Signup() {
  const { control, handleSubmit } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const { isDirty, isValid, errors } = useFormState({
    control,
  })

  const [showPassword, setShowPassword] = useState(false)

  const onToggleShowPassword = useCallback(() => {
    setShowPassword(!showPassword)
  }, [showPassword])

  const { isLoading, error, mutate } = useMutation(signupApi)

  let navigate = useNavigate()

  const onSubmit = (data: { [x: string]: string }) => {
    mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate('/')
        },
      }
    )
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2, md: 3 },
        margin: 'auto',
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={6}>
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
            <Typography>CREATE NEW ACCOUNT</Typography>
            <Typography color="primary" sx={{ fontSize: 20, fontWeight: 700 }}>
              Build smart risk free
            </Typography>
          </Stack>
          <ul>
            <li>
              <Typography mb={2}>
                Understand why Viact is being used on millions of customers
                everyday
              </Typography>
            </li>
            <li>
              <Typography mb={2}>
                Find out if Viact is the right fit for your business
              </Typography>
            </li>
            <li>
              <Typography mb={2}>
                Get all your questions answered (personally)
              </Typography>
            </li>
            <li>
              <Typography>
                Completely risk-free with 14-day free trial and a 30-day money
                back guarantee!
              </Typography>
            </li>
          </ul>
        </Grid>
        <Grid item md={6}>
          {!!error && (
            <Stack alignItems="center" mb={4}>
              <Alert variant="outlined" severity="error">
                Email or username already taken
              </Alert>
            </Stack>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors['firstName']}
                  required
                  {...field}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Last Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!errors['lastName']}
                  required
                  {...field}
                />
              )}
            />
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!errors['username']}
                  required
                  {...field}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!errors['email']}
                  required
                  {...field}
                />
              )}
            />
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={!!errors['phoneNumber']}
                  required
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
                  error={!!errors['password']}
                  required
                  {...field}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors['confirmPassword']}
                  required
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
              Sign up
            </LoadingButton>
          </form>
          <Typography sx={{ textAlign: 'center', my: 1 }}>
            Already have an account?{' '}
            <Link sx={{ fontWeight: 'bold' }} href="/">
              Login
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}
