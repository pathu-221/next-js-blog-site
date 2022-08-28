import Link from "next/link";
import { Button, Avatar } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from "react";
import { UserContext } from "@lib/context";
import SignOutButton from '@components/SignOutButton';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        }
    },
});

export default function Navbar() {

    const { user, username } = useContext(UserContext);

    return (
        <nav className="navbar">

            <ul>
                <ThemeProvider theme={theme}>
                    <li>
                        <Link href="/">
                            <Button
                            className='button'
                            variant='contained'
                            size='large'>FEED</Button>
                        </Link>
                    </li>
                </ThemeProvider>
                {user && (
                    <div className="push-right">
                         <li >
                           <SignOutButton/>
                        </li>
                        <li >
                            <Link href="/admin">
                                <Button variant='contained' className="button">Write posts</Button>
                            </Link>

                        </li>
                        <li>
                            <Link href={`/${username}`}>
                                <Avatar
                                sx={{
                                    width: '50px',
                                    height: '50px',
                                    cursor: 'pointer'
                                }} 
                                alt='user photo' src={`${user?.photoURL}`}/>
                            </Link>
                        </li>
                    </div>
                )}
                {!user && (
                    <li>
                        <Link href='/enter'>
                            <Button className="button" variant='contained' size='large'>Log in</Button>
                        </Link>
                    </li>
                )}
            </ul>

        </nav>
    );
}