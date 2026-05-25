import Link from 'next/link'
import React from 'react'
import { Image } from 'react-bootstrap'

const Logo = () => {
  return (
    <Link href={'/'}>
      <Image src='/logo/logo.png' height={60} alt='logo' />
    </Link>
  )
}

export default Logo
