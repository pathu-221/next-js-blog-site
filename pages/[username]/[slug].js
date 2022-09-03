import { firestore, getUserWithUsername, postToJSON } from "@lib/firebase";
import { useDocumentData } from 'react-firebase-hooks/firestore';
import PostContent from '@components/PostContent';
import AuthCheck from "@components/AuthCheck";
import Link from "next/link";
import Heart from "@components/HeartButton"; 
import MetaTags from "@components/MetaTags";
import { Button } from "@mui/material";
export async function getStaticProps({ params }) {

    const { username, slug } = params;
    const userDoc = await getUserWithUsername(username);

    let post, path;

    if(userDoc) {
        const postRef = userDoc.ref.collection('posts').doc(slug);
        post = postToJSON(await postRef.get());

        path = postRef.path;
    }

    return {
        props: { post, path},
        revalidate: 5000,
    }

}


export async function getStaticPaths() {

    const snapShot = await firestore.collectionGroup('posts').get();
    const paths = snapShot.docs.map((doc) => {
        const { slug, username } = doc.data();
        return {
            params: { username, slug}
        }
    });

    return {
        paths,
        fallback: 'blocking',
    }

}

export default function Post(props) {

    const postRef = firestore.doc(props.path);
    const [realtimepost] = useDocumentData(postRef);


    const post = realtimepost || props.post;

    return (
        <main className="post-feed-container">
            
        <MetaTags title = {post.title}/>
            <section>
                <PostContent post = { post } />
            </section>

            <aside className="card" >
                <p>
                    <strong>{ post.heartCount || 0 } 💗 Heart</strong>
                </p>

                <AuthCheck
                fallback={
                    <Link href='/enter'>
                    <Button variant='contained'>💗Sign Up</Button>
                    </Link>
                }
                >
                    <Heart postRef={ postRef }/>
                </AuthCheck>
            </aside>
        </main>
    );
}