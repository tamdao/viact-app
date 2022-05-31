import { Box, BoxProps, Container, styled } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import gateLayoutBgImage from './images/gate-layout-bg.png'

const GateLayoutBox = styled(Box)<BoxProps>(({ theme }) => ({
  background: `url(${gateLayoutBgImage}),#0b454f`,
  backgroundSize: 'cover',
  backgroundPosition: '50%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 40,
  paddingBottom: 40,
  overflow: 'auto',
}))

export function GateLayout() {
  return (
    <GateLayoutBox>
      <Container maxWidth="lg" sx={{ m: 4 }}>
        <Outlet />
      </Container>
    </GateLayoutBox>
  )
}
