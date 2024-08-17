import { Card, Row, Col, } from 'antd';
import NavProfile from '../components/NavProfile/NavProfile';
import './CSS/Profile.css';
import ProfileInfo from "../components/Profile/ProfileInfo.tsx";
import ProfileForm from "../components/Profile/ProfileForm.tsx";
import React from "react";

const ProfilePage: React.FC = () => {
    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col span={5}>
                    <NavProfile />
                </Col>
                <Col span={19}>
                    <Card style={{ borderRadius: '10px', boxShadow: '2px 2px 7px #cbc1c1' }}>
                        <Row gutter={[16, 16]}>
                            <Col span={7}>
                                <ProfileInfo />
                            </Col>
                            <Col span={16}>
                                <ProfileForm />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default ProfilePage;