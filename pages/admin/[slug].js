import AuthCheck from "@components/AuthCheck"
import { useState } from "react";
import { useRouter } from "next/router";
import { firestore, auth, serverTimestamp } from "@lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useForm } from "react-hook-form";  
import toast from "react-hot-toast";
import { Button, TextField, Checkbox } from '@mui/material'; 
import styles from '@styles/UserProfile.module.css';

export default function AdminPostEdit ({})  {
    return (
        <AuthCheck>
            <PostManager /> 
        </AuthCheck>
    )
}

function PostManager () {

    const [preview, setPreview] = useState(false);

    const router = useRouter();
    const { slug } = router.query;

    const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);
    const [post] = useDocumentData(postRef);


    return (
        <main className={ styles.postEdit }> 
            {
                post && (
                    <>
                    <section className={ styles.formContainer}>
                        <h1>{ post.title }</h1>
                        <p style={{fontSize: '25px'}}>ID: { post.slug }</p>

                        <PostForm postRef={postRef} defaultValues={ post } preview={preview} />
                    </section>
                    <aside className={ styles.buttonsContaier }>
                        <h3>Tools</h3>
                        <Button
                        variant='contained'
                        sx={{
                            width: '80%',
                            margin: '10px'
                        }}
                        onClick={()=> setPreview(!preview)}>{ preview ? "Edit" : 'Preview'}</Button>
                        <Link href= {`/${post.username}/${post.slug}`}>
                            <Button
                            variant='contained'
                            color='success'
                            sx={{
                                width: '80%',
                                margin: '10px'

                            }}>Live View</Button>
                        </Link>
                    </aside>
                    </>
                )
            }
        </main>
    );
}

const PostForm = ({ defaultValues, postRef, preview}) => { 
    
    const { register, handleSubmit, reset, watch } = useForm({ defaultValues, mode: 'onChange'})

    const updatePost = async ({ content, published}) => {
        await postRef.update({
            content,
            published,
            updatedAt: serverTimestamp()
        })

        reset({ content, published});

        toast.success('Post Updated Successfully');
    }

    return (
        <form onSubmit={handleSubmit(updatePost)} > 
        {
            preview && (
                <div className="card">
                    <ReactMarkdown>{ watch('content')}</ReactMarkdown>
                </div>
            )
        }

        <div className={preview ?  styles.hidden : 'controls'}>
            <TextField 
            className={ styles.textArea}
            multiline
            minRows={15}
            sx={{
                width: 1,
                backgroundColor: 'white'
            }}
            name="content" {...register("content", { required: true })}></TextField>

            <fieldset style={{border: 'none', padding: '0', margin: '0'}}>
                <Checkbox name='published' type = 'checkbox'  {...register("published")} />
                <label>Published</label>
            </fieldset>

            <Button 
            sx={{
                width: 1,
            }}
            variant='contained'
            type="submit" 
            className="button">Save Changes</Button>
        </div>
        </form>
    );

 }