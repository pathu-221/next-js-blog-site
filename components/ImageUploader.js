import { useState } from "react";
import { auth, storage, STATE_CHANGED } from '@lib/firebase';
import Loader from "./Loader";
import styles from '@styles/UserProfile.module.css'
import { Button } from '@mui/material';

export default function ImageUploader() {

    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState(null);



    const uploadFile = async e => {
        console.log(e);
        const file = Array.from(e.target.files)[0];
        const extension = file.type.split('/')[1];
        console.log(extension);
        const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`)
        setUploading(true);

        const task = ref.put(file);
        task.on(STATE_CHANGED, (snapshot) => {
            const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
            setProgress(pct);

            task
                .then(d => ref.getDownloadURL())
                .then(url => {
                    setDownloadURL(url);
                    setUploading(false);
                })
        })
    }

    return (
        <div className={styles.imageUploadButton}>
            <Loader show={uploading} />
            {uploading && <h3>{progress}%</h3>}

            {
                !uploading && (
                    <>
                        {/* <label>
                            
                            <input type='file' onChange={uploadFile}
                                accept='image/x-png, image/gif, image/jpeg' />
                        </label> */}
                        <Button variant="contained" component="label">
                        📸 upload image
                        <input hidden type='file' onChange={uploadFile}
                                accept='image/x-png, image/gif, image/jpeg' />
                        </Button>
                    </>
                )
            }

            {
                downloadURL && <code>{`![alt](${downloadURL})`}</code>
            }
        </div>
    );
}