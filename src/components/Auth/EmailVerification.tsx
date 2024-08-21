import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {notification, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const EmailVerification = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const verificationStatus = params.get('verificationstatus');


        if (verificationStatus == 'success') {
            console.log('Email verification successful');
            notification.success({
                message: 'Email verification successful',
                description: 'Please login to continue',
                duration: 3000
            })
        } else if (verificationStatus == 'failed') {
            console.log('Email verification failed');
            notification.error({
                message: 'Email verification failed',
                description: 'Please try again',
                duration: 3000
            })
        }

        setTimeout(() => navigate("/"), 2000);
    }, [location, navigate]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            height: '100vh',
            backgroundColor: '#f0f2f5',
        }}>
            <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>} size="large" tip={"Redirecting to homepage..."}
                 >
                <div style={{
                    padding: 50,
                    background: 'rgba(0, 0, 0, 0.05)',
                    borderRadius: 4,
                }}/>
            </Spin>
        </div>
    )
        ;
}

export default EmailVerification;