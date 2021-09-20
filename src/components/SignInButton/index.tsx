import { signIn, signOut, useSession } from 'next-auth/client'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

export default function SignInButton(props) {
  const [session] = useSession()

  return session
    ? (
      <button
        type="button"
        className={styles.signInButton}
        onClick={() => signOut()}
      >
        {
          props.option === 'GitHub' &&
          <FaGithub color="#04d361" />
        }
        {
          props.option === 'Google' &&
          <FaGoogle color="#04d361" />
        }
        {session.user.name}
        <FiX color="#737380" className={styles.closeIcon} />
      </button>
    )
    : (
      <button
        type="button"
        className={styles.signInButton}
        onClick={() => signIn('google')}
      >
        {
          props.option === 'GitHub' &&
          <FaGithub color="#eba417" />
        }
        {
          props.option === 'Google' &&
          <FaGoogle color="#eba417" />
        }
        Sign in with {props.option}
      </button>
    )
}
