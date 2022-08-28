import { auth } from '@lib/firebase';
import { Button } from '@mui/material';

export default function SignOutButton() {
    return (
        <Button
        className='button'
        onClick ={ () => {auth.signOut();}} 
        variant='outlined'>
            Sign out
        </Button>
    );
}