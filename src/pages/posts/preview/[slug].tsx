import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { useEffect } from 'react';
import { getPrismaClient } from '../../../services/prismic';
import styles from '../post.module.scss';

interface PostPreviewProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <Link href='/'>
            <a href=''>
              <div className={styles.continueReading}>
                Wanna continue reading?
                <span> Subscribe now 🤗</span>
              </div>
            </a>
          </Link>
        </article>
      </main>
    </>
  )
}
/**
* * If array is empty, next will generate the static page for all posts
* ? paths: [{
* ?   params: { slug: 'usecolorscheme' }
* ? }
* * Passing the slug on params, that would be the only static route
* @param fallback blocking => only show content when is fully loaded in next SSR (ServerSideRendering)
*/
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const prismic = getPrismaClient()

  const response = await prismic.getByUID('publication', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: { post },
    redirect: 60 * 30, // 30 min
  }
}

