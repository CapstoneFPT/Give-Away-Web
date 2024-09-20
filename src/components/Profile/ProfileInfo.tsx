import React, { useState } from 'react';
import { Button, Card, notification } from 'antd';
import img from "../Assets/nam2.png";
import TextArea from 'antd/es/input/TextArea';
import { AccountApi } from '../../api';

const ProfileInfo: React.FC = () => {
    const userId = JSON.parse(localStorage.getItem('userId') || 'null');
    const [inquiryText, setInquiryText] = useState(""); // State to hold the inquiry text
    const [loading, setLoading] = useState(false); // State to manage loading

    const inqueriesApi = new AccountApi();

    const handleSendInquiry = async () => {
        setLoading(true); // Set loading to true when the request starts
        try {
            await inqueriesApi.apiAccountsAccountIdInquiriesPost(userId, { message: inquiryText }); // Pass the inquiry text to the API
            setInquiryText(""); // Clear the TextArea after sending

            // Show success notification
            notification.success({
                message: 'Inquiry Sent',
                description: 'Your inquiry has been successfully sent.',
                placement: 'topRight', // Position of the notification
            });
        } catch (error) {
            console.error("Error sending inquiry:", error);
            // Show error notification
            notification.error({
                message: 'Error',
                description: 'There was an error sending your inquiry. Please try again.',
                placement: 'topRight',
            });
        } finally {
            setLoading(false); // Set loading to false when the request is complete
        }
    };

    return (
        <>
            <Card title="Profile">
                <img src={img} style={{ width: '40%' }} alt="Profile" />
            </Card>
            <Card title='Inquery' style={{ marginTop: '10px' }}>
                <TextArea
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)} // Update state on change
                    placeholder="Enter your inquiry here"
                />
                <Button
                    style={{ backgroundColor: 'black', color: 'white', marginTop: '10px' }}
                    onClick={handleSendInquiry} // Call the function on button click
                    loading={loading} // Show loading spinner when loading is true
                >
                    Send Inquiries
                </Button>
            </Card>
        </>
    );
};

export default ProfileInfo;