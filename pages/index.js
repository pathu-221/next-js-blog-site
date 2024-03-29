import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Button } from '@mui/material';
import Link from 'next/link';
import { firestore, fromMillis, postToJSON } from '@lib/firebase';
import { useState } from 'react';
import PostFeed from '@components/PostFeed';
import Loader from '@components/Loader';

const LIMIT = 10;

export async function getServerSideProps(context) {

  const postQuery = firestore
  .collectionGroup('posts')
  .where('published', '==', true)
  .orderBy('createdAt', 'desc')
  .limit(LIMIT);

  const posts = (await postQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }
  };
}

export default function Home(props) {


  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);


  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt == 'number' ? fromMillis(last.createdAt) : last.createdAt;
    const query = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .startAfter(cursor)
    .limit(LIMIT);

    const newPosts = (await query.get()).docs.map(doc => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if(newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  }

  return (
    <main className={styles.mainElement}>
      <PostFeed posts={posts}/>
      {
      !loading && !postsEnd && <Button variant='contained' onClick={getMorePosts}>Load More</Button> 
      }

      <Loader show={loading} />
      {
        postsEnd && 'you have reached the end'
      }
    </main>
  )
}
