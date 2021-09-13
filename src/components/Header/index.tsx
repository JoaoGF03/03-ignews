import Image from 'next/image'
import React from 'react'
import Logo from '../../../public/images/logo.svg'
import SignInButton from '../SignInButton'
import styles from './styles.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src={Logo}
          alt="ig.news"
        />

        <nav>
          <Link href="/">
            <a className={styles.active} >Home</a>
          </Link>
          <Link href="/posts" prefetch>
            <a >Posts</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
