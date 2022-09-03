import Link from "next/link";
import { Button } from '@mui/material';

export default function PostFeed({ posts, admin }){
    return posts ? posts.map( post => <PostItem post={post} key={post.slug} admin={admin}/>) : null
}

function PostItem ({ post, admin }){

    const wordCount = post?.content.split(' ').length;
    console.log(wordCount);
    const minutesToRead = (wordCount/100 + 1).toFixed(0);
    return (
        <div className="card">

            <Link href={`/${post.username}`}>
                <a>
                    <strong>by @{post.username}</strong>
                </a>
            </Link>

            <Link href={`/${post.username}/${post.slug}`}>
                <h2>
                    <a  style={{ cursor: 'pointer'}}>{post.title}</a>
                </h2>
            </Link>
            
            <footer>
                <span>
                    {wordCount} words. {minutesToRead} min read
                </span>
                <span>💗 {post.heartCount} Hearts</span>
            </footer>

            {
                admin && (
                    <Link href={`/admin/${post.slug}`}>
                        <Button variant='contained' sx={{
                            marginTop: '10px',
                            width: '10vw',
                            height: '2.5rem'
                        }}>
                            Edit
                        </Button>
                    </Link>
                )
            }
        </div>
    )

}   