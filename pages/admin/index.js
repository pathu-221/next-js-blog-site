import AuthCheck from "@components/AuthCheck";
import PostFeed from "@components/PostFeed";
import { UserContext } from "@lib/context";
import { auth, firestore, serverTimestamp } from "@lib/firebase";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { kebabCase } from "lodash";
import { toast } from "react-hot-toast";
import { TextField, Button } from '@mui/material';



export default function AdminPostsPage ({}) {
    return (
        <main>
            <AuthCheck>
                 <PostList />
                 <CreateNewPost />
            </AuthCheck>
        </main>
    )
}

function PostList() {
    const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
    const query = ref.orderBy('createdAt');
    const [querySnapshot] = useCollection(query);

    const posts = querySnapshot?.docs.map( doc => doc.data());

    return (
        <>
        <h1 style={{marginTop: '0'}}> Manage Your posts</h1>
        <PostFeed posts={posts} admin />
        </>
    )
}

function CreateNewPost() {
    const router = useRouter();
    const { username } = useContext(UserContext);
    const [title, setTitle] = useState();
    const slug = encodeURI(kebabCase(title));

    const isValid = title && title.length > 3 && title.length < 100;


    const createPost = async (e) => {
        e.preventDefault();

        const uid = auth.currentUser.uid;
        const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

        const data = {
            title,
            slug,
            uid,
            username,
            published: false,
            content: 'Hello World!',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            heartCount: 0,
        }

        await ref.set(data); 

        toast.success('Post Created');
        
        router.push(`/admin/${slug}`);
    }

    return (
        <form 
        style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        }}
        onSubmit={createPost}>
            <h2> Create a new post</h2>
            <TextField
            style={{
                background: 'white',
                width: '100%',
                border: '1px solid gray',
                borderRadius: '8px',
                fontSize: '15px'

            }}
            value={title}
            onChange = { e => setTitle(e.target.value)}
            placeholder= 'MY own article'
            />

            <p style={{ fontSize: 'large'}}>
                <strong>Slug: </strong> { slug}
            </p>

            <Button
            variant='contained'
            color='success'
            type='submit' disabled={!isValid}>
                Create New post
            </Button>

        </form>
    );
}