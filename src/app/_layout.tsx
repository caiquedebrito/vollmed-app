import React from 'react'
import { Slot } from 'expo-router'
import { SessionProvider } from '@/src/contexts/session'

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  )
}