
import styles from '@styles/UserProfile.module.css';

export default function UserProfile({ user }) {
    return (
        <div className={ styles.boxContainer }>
            <img src={user.photoURL} className={ styles.cardImageCenter} />
            <p>
                <i>@{user.username}</i>
            </p>
            <h1>{user.displayName}</h1>
        </div>
    )
}