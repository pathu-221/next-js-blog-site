import { auth, firestore, increment } from '@lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Button } from '@mui/material';
export default function Heart({ postRef}) {

    const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
    const [heartDoc] = useDocument(heartRef);


    console.log(heartDoc)

    const addHeart = async () => {
        const uid = auth.currentUser.uid;
        const batch =  firestore.batch();

        batch.update(postRef, { heartCount: increment(1)});
        batch.set(heartRef, {uid});

        await batch.commit();
    }

    const removeHeart = async () => {
        const batch = firestore.batch();
        batch.update(postRef, { heartCount: increment(-1)});
        batch.delete(heartRef); 

        await batch.commit();
    }

    return (
        <>
        {
            heartDoc?.exists() ? (
                <Button variant='contained' sx={{
                    marginTop: '10px',
                    width: '200px',
                    height: '2.5rem'
                }} onClick={removeHeart}>💔 Unheart</Button>
            )
            :
            (<Button variant='contained' sx={{
                marginTop: '10px',
                width: '200px',
                height: '2.5rem'
            }} onClick={addHeart}>💗 Heart</Button>)
        }
        </>
    );
}
