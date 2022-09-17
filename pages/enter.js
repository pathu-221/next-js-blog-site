
import { auth, firestore, getUserWithUsername, googleAuthProvider } from '@lib/firebase';
import { FcGoogle } from 'react-icons/fc';
import { TextField, Button, LoadingButton } from '@mui/material';
import { useContext, useState, useCallback, useEffect } from 'react';
import { UserContext } from '@lib/context';
import SignOutButton from '@components/SignOutButton';
import { useRouter } from 'next/router';
import styles from '@styles/UserProfile.module.css';
import debounce from 'lodash.debounce';

export default function Enter ({}) {

    const { user, username } = useContext(UserContext);

    const userDoc = getUserWithUsername(username);
    console.log(userDoc);

    return (
        <main>
            {
                user ?
                !username ? <UsernameForm/>  : <SignOutButton />
                :
                <SignInButton />
            }
        </main>
    )
}



function SignInButton() {
    const router = useRouter();
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    }

    return (
        <>
        <Button 
        sx={{
            marginLeft: '50%',
            transform: 'translateX(-50%)',
        }}
        onClick = { signInWithGoogle }
        variant = 'contained'>
            <FcGoogle />
            SIGN IN WITH GOOGLE
        </Button>
        </>
    );

}





function UsernameForm () {

    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);   
    const [loading, setLoading] = useState(false);

    const { user, username} = useContext(UserContext);
    
    useEffect(() => {

        checkUsername(formValue);
    }, [formValue])
     
    const onChange = e => {
        e.preventDefault();
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if(val.length < 3){
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        if(re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    }


    const checkUsername = useCallback(debounce(async (username) => {

        if(username.length > 3) {
            const ref = firestore.doc(`usernames/${username}`);
            const { exists } = await ref.get(); 
            console.log('firestore read executed');
            setIsValid(!exists);
            setLoading(false);
        }
    }, 500), []);

    const onSubmit = async (e) =>{
        e.preventDefault();

        const userDoc = firestore.doc(`users/${user.uid}`);
        const usernameDoc = firestore.doc(`usernames/${formValue}`);

        const batch = firestore.batch();
        batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName});
        batch.set(usernameDoc, { uid: user.uid});

        await batch.commit();
    }

    return (
        !username && (
            <section className={styles.usernameForm}>
                <h3>Choose username</h3>

                <form onSubmit={onSubmit}>
                {/* <input name='username' placeholder='username'
                value={formValue}
                onChange={onChange}
                /> */}
                <TextField
                className='input-field'
                sx ={{
                    width: '60vw',
                    fontSize: 'larger'
                }}
                error = { !isValid}
                onChange={onChange}
                value={formValue}
                placeholder='choose username'
                name='username'
                id="standard-error-helper-text"
                helperText={
                    formValue && (loading ? 'loading...' : 
                    isValid ? `${formValue} is available` : `${formValue} is taken`)
                }
                variant="standard"
                />

                
                <Button
                variant='contained'
                type='submit'
                disabled={!isValid}
                >Choose</Button>


                <h3>Debug state</h3>
                <div>
                    username: {formValue}
                    <br/>
                    Loading: {loading.toString()}
                    <br/>
                    username valid: { isValid.toString()}
                </div>

                </form>
            </section>
        )
    );
}
