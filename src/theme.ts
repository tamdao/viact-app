import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6a3d',
    },
    secondary: {
      main: '#23b6d8',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === 'contained' && {
            color: 'white',
          }),
          fontWeight: 'bold',
        }),
      },
    },
  },
})
