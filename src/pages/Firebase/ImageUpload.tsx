import React, { useState } from 'react';
import { storage } from './firebase-config'; // Import storage instance from firebase-config
import { ref, uploadBytes } from 'firebase/storage'; // Import Firebase Storage functions

const ImageUpload = () => {
    const [file, setFile] = useState<File | null>(null); // State to store the selected file
    const [uploading, setUploading] = useState(false); // State to manage uploading status
    const [error, setError] = useState<string | null>(null); // State to store error messages
    const [success, setSuccess] = useState<string | null>(null); // State to store success messages

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]); // Save the selected file
        }
    };

    const handleUpload = async () => {
        if (file) {
            const storageRef = ref(storage, `images/${file.name}`); // Reference to the location in Firebase Storage

            setUploading(true); // Start uploading
            setError(null); // Clear previous errors
            setSuccess(null); // Clear previous success messages

            try {
                await uploadBytes(storageRef, file); // Upload the file
                setSuccess('Upload successful!'); // Set success message
            } catch (error) {
                setError('Upload failed: ' + (error as Error).message); // Set error message
            } finally {
                setUploading(false); // End uploading
            }
        } else {
            setError('No file selected.'); // Set error if no file is selected
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {success && <p style={{ color: 'green' }}>{success}</p>} {/* Display success message */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        </div>
    );
};

export default ImageUpload;
