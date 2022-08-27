
import { auth, googleAuthProvider } from '@lib/firebase';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';

export default function Enter ({}) {

    const user = null;
    const username = null;

    return (
        <main>
            {
                user ?
                !username ? <UsernameForm/> : <SignOutButton /> 
                :
                <SignInButton />
            }
        </main>
    )
}



function SignInButton() {

    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleAuthProvider);
    }

    return (
        <>
        <Button 
        onClick = { signInWithGoogle }
        variant = 'outlined'>
            <GoogleIcon sx={{marginRight: '5px'}}/>
            SIGN IN WITH GOOGLE
        </Button>
        </>
    );

}



function SignOutButton() {
    return (
        <Button
        
        onClick ={ () => {auth.signOut();}} 
        variant='outlined'>
            Sign out
        </Button>
    );
}

function UsernameForm () {
    return (
        <></>
    );
}