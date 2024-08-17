import React from 'react';
import { Card, } from 'antd';
import img from "../Assets/nam2.png"

const ProfileInfo: React.FC = () => {
    return (
        <>
            <Card title="Profile">
                <img src={img} style={{ width: '40%' }} alt="Profile" />
            </Card>
        </>
    );
};

export default ProfileInfo;