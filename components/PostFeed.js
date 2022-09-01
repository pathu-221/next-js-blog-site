import Link from "next/link";

export default function PostFeed({ posts, admin }){
    return posts ? posts.map( post => <PostItem post={post} key={post.slug} admin={admin}/>) : null
}

function PostItem ({ post }){

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
                <span>❤ {post.heartCount} Hearts</span>
            </footer>
        </div>
    )

}   