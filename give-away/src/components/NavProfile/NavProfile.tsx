import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  KeyOutlined,
  DollarOutlined,
  UserOutlined,
  OrderedListOutlined
} from "@ant-design/icons";
import { Button, Menu, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { AccountApi } from "../../api";




const MenuItemWithButton = ({ key, icon, label, to }: { key: string; icon: React.ReactNode; label: string; to: string }) => {
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
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const userId = JSON.parse(localStorage.getItem("userId") || "null"); 
      try {
        // const response = await axios.get(`${BASE_URL}/accounts/${userId}`); 
        const accountApi = new AccountApi();
        const response = await accountApi.apiAccountsIdGet(userId);
        setBalance(response.data?.data?.balance || 0);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);
  const [collapsed, setCollapsed] = useState(false);

  const formatBalance = (balance:any) => {
    return new Intl.NumberFormat('de-DE').format(balance);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    { key: "1", icon: <UserOutlined />, label: "Profile", to: "/profile" },
    { key: "2", icon: <KeyOutlined />, label: "Change Password", to: "/change-password" },
    { key: "3", icon: <OrderedListOutlined />, label: "Order list", to: "/order-list" },
    { key: "4", icon: <DollarOutlined />, label: "Withdraw", to: "/transaction/withdraw" },
    // { key: "sub1", icon: <RetweetOutlined />, label: "Refunds", to: "/refunds" },
    {
      key: "sub2",
      icon: <AppstoreOutlined />,
      label: "Transaction",
      children: [
        { key: "9", label: "Withdraw History", to: "/transaction/withdraw-history" },
        { key: "10", label: "Deposit History", to: "/transaction/deposit-history" },
        { key: "11", label: "Consign History", to: "/transaction/My-consign" },
        { key: "12", label: "Auction History", to: "/transaction/Auction-history" },
          {key: "13", label: "Purchase History", to: "/transaction/purchase-history" },
      ],
    },
    // { key: "3", icon: <LogoutOutlined />, label: "Logout", to: "/logout" },
  ];

  return (
    <div >
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
              {formatBalance(balance)} UP
               <DollarOutlined spin />
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

