import Image from 'next/image'
import React from 'react'
import Logo from '../../../public/images/logo.svg'
import ActiveLink from '../ActiveLink'
import SignInButton from '../SignInButton'
import styles from './styles.module.scss'

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image
          src={Logo}
          alt="ig.news"
        />

        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton option='GitHub'/>
        <SignInButton option='Google'/>
      </div>
    </header>
  )
}
