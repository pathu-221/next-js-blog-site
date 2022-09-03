import { auth } from '@lib/firebase';
import { Button } from '@mui/material';
import {useRouter} from 'next/router';
export default function SignOutButton() {
    const router = useRouter();
    return (
        <Button
        className='button'
        onClick ={async () =>  { await auth.signOut();}} 
        variant='outlined'>
            Sign out
        </Button>
    );
}