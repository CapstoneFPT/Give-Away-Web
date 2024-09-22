import React, { useState } from "react";
import {
    AppstoreOutlined,
    KeyOutlined,
    DollarOutlined,
    UserOutlined,
    OrderedListOutlined,
    InboxOutlined,
    HomeOutlined,
    ClockCircleOutlined
} from "@ant-design/icons";
import { Button, Menu, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { AccountApi } from "../../api";
import { useAuth } from "../Auth/Auth";
import { useQuery } from "@tanstack/react-query";

const MenuItemWithButton = ({ key, icon, label, to }: {
    key: string;
    icon: React.ReactNode;
    label: string;
    to: string
}) => {
    const navigate = useNavigate();
    return (
        <Menu.Item key={key} icon={icon}>
            <Button type="link" onClick={() => navigate(to)}>
                {label}
            </Button>
        </Menu.Item>
    );
};

const NavProfile: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { currentUser } = useAuth();
    const userId = currentUser?.id || '';

    const { data: balanceData, isLoading } = useQuery({
        queryKey: ['userBalance', userId],
        queryFn: async () => {
            const accountApi = new AccountApi();
            const response = await accountApi.apiAccountsIdGet(userId);
            return response.data?.data?.balance || 0;
        },
        enabled: !!userId,
    });

    const formatBalance = (balance: number) => {
        return new Intl.NumberFormat('de-DE').format(balance);
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const items = [
        { key: "1", icon: <UserOutlined />, label: "Profile", to: "/profile" },
        { key: "2", icon: <KeyOutlined />, label: "Change Password", to: "/change-password" },
        { key: "address", icon: <HomeOutlined />, label: "Address", to: "/profile/addresses" },
        { key: "13", icon: <OrderedListOutlined />, label: "Orders", to: "/order-list" },
        { key: "17", icon: <OrderedListOutlined />, label: "Consignment", to: "/transaction/My-consign" },
        { key: "12", icon: <OrderedListOutlined />, label: "Auction", to: "/transaction/Auction-history" },
        { key: "15", icon: <OrderedListOutlined />, label: "Refund", to: "/profile/refundList" },
        { key: "16", icon: <OrderedListOutlined />, label: "Withdraw", to: "/transaction/withdraw" },
        {
            key: "sub2",
            icon: <ClockCircleOutlined />,
            label: "History",
            children: [
                { key: "9", label: "Transactions", to: "/transactions" },
                { key: "10", label: "Withdraw", to: "/transaction/withdraw-history" },
                { key: "11", label: "Deposit", to: "/transaction/deposit-history" },
                { key: "14", label: "Recharge", to: "/transaction/recharge-history" },
            ],
        },
    ];

    return (
        <div>
            <Card
                title="Wallet points"
                style={{
                    borderRadius: "10px",
                    boxShadow: "2px 5px 10px #cbc1c1",
                }}
            >
                <div
                    style={{
                        fontSize: "1.7em",
                        color: "#d1d124",
                        fontWeight: "bolder",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                        padding: "0.2em 0.4em",
                        borderRadius: "5px",
                        backgroundColor: "rgba(255, 255, 255, 0.573)",
                        textAlign: "center",
                    }}
                >
                    {isLoading ? 'Loading...' : `${formatBalance(balanceData)} VND`}
                </div>
            </Card>
            <Card
                style={{
                    borderRadius: "10px",
                    boxShadow: "2px 5px 10px #cbc1c1",
                    marginTop: "10px",
                }}
            >
                <Menu
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={collapsed}
                >
                    {items.map((item) =>
                        item.children ? (
                            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                                {item.children.map((child) => (
                                    <MenuItemWithButton key={child.key} icon={null} label={child.label} to={child.to} />
                                ))}
                            </Menu.SubMenu>
                        ) : (
                            <MenuItemWithButton key={item.key} icon={item.icon} label={item.label} to={item.to} />
                        )
                    )}
                </Menu>
            </Card>
        </div>
    );
};

export default NavProfile;

