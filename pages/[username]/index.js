
import UserProfile from "@components/UserProfile";
import PostFeed from "@components/PostFeed";

import { getUserWithUsername, postToJSON } from "@lib/firebase";

import styles from '@styles/UserProfile.module.css';

export async function getServerSideProps({ query}){


    const { username } = query;

    const userDoc = await getUserWithUsername(username);
    let user = null;
    let posts = null;
     

    if(!userDoc) {
        return {
            notFound: true
        }
    }

    if(userDoc){
        user = userDoc.data();
        const postsQuery  = userDoc.ref
        .collection('posts')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(5);

        posts = (await postsQuery.get()).docs.map(postToJSON)

    }

    return {
        props: {user, posts}
    };
}
 
export default function UserProfilePage ({ user, posts}) {

    return (
        <main className={styles.userPage}>
            <UserProfile user={user} />
            <PostFeed posts={posts}/>
        </main>
    )
}