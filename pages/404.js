import Link from 'next/link';
import { Button } from '@mui/material';

export default function Custom404() {
    return (
        <main>
            <h1>404 ... This page does not seem to exist</h1>
            <iframe
                src='https://giphy.com/embed/xT5LMCGlKlfte1c2u4'
                width='480'
                height='362'
            ></iframe><br></br>
            <Link href={'/'}>
                <Button variant='contained' className='button'>Go Home</Button>
            </Link>
        </main>
    )
}

