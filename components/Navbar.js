import Link from "next/link";
import { Button, Avatar } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        }
    },
});

export default function Navbar() {

    const user = null;
    const username = null;
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
                {username && (
                    <div className="push-right">
                        <li >
                            <Link href="/admin">
                                <Button variant='contained' className="button">Write posts</Button>
                            </Link>

                        </li>
                        <li>
                            <Link href={`${username}`}>
                                <Avatar
                                sx={{
                                    width: '50px',
                                    height: '50px'
                                }} 
                                alt='user photo' src={`${user?.photoURL}`}/>
                            </Link>
                        </li>
                    </div>
                )}
                {!username && (
                    <li>
                        <Link href={`${username}`}>
                            <Button className="button" variant='contained' size='large'>Log in</Button>
                        </Link>
                    </li>
                )}
            </ul>

        </nav>
    );
}