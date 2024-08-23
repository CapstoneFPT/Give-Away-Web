import React, {useEffect, useState} from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import {Link, useNavigate} from "react-router-dom";
import {Avatar, Dropdown, Input, Modal, Spin} from 'antd';
import {LogoutOutlined, MoneyCollectOutlined, SearchOutlined, ShoppingOutlined, UserOutlined} from '@ant-design/icons';
import {AccountApi} from "../../api";
import {useCart} from "../../pages/CartContext";
import BranchNavbar from "./BranchNavbar";
import Login from "../../pages/Login";

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [balance, setBalance] = useState(0);
    const [userEmail, setUserEmail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const cart = useCart();
    const userId = JSON.parse(localStorage.getItem("userId") || "null");
    const isLoggedIn = !!userId;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                setIsLoading(true);
                try {
                    const accountApi = new AccountApi();
                    const accountResponse = await accountApi.apiAccountsIdGet(userId);

                    setBalance(accountResponse.data?.data?.balance || 0);
                    setUserEmail(accountResponse.data?.data?.email || "");
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleSearch = (e: any) => {
        if (e.key === 'Enter') {
            navigate(`/search?q=${encodeURIComponent(searchValue)}`);
        }
    };

    const handleSearchChange = (e: any) => {
        setSearchValue(e.target.value);
    };

    const formatBalance = (balance: number) => {
        return new Intl.NumberFormat('de-DE').format(balance);
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
            localStorage.removeItem("role");
            cart.dispatch({type: "CLEAR_CART"});
            localStorage.removeItem("cart");

            await new Promise(resolve => setTimeout(resolve, 1000));
            navigate("/");
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const dropdownItems = [
        {key: "1", icon: <MoneyCollectOutlined/>, label: <Link to="/add-fund">Add Fund</Link>},
        {key: "2", icon: <UserOutlined/>, label: <Link to="/profile">Profile</Link>},
        {
            key: "3", icon: <LogoutOutlined/>,
            label: (
                <Spin spinning={isLoggingOut}>
                    <span onClick={handleLogout}>Logout</span>
                </Spin>
            )
        },
    ];

    return (
        <>
            <nav className="navbar">
                <div className="navbar-section-1">
                    <div className="navbar-search">
                        <Input
                            placeholder="Search by brand, item..."
                            prefix={<SearchOutlined/>}
                            className="navbar-search-input"
                            value={searchValue}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearch}
                        />
                    </div>
                    <Link to="/" className="navbar-logo">
                        <div className="navbar-logo-container">
                            <img src={logo} alt="Give Away Logo" className="navbar-logo-img"/>
                            <p className="navbar-logo-text">Give Away</p>
                        </div>
                    </Link>
                    <div className="navbar-actions">
                        {isLoggedIn ? (
                            <>
                                <Dropdown menu={{items: dropdownItems}} placement="bottomRight">
                                    <div className="navbar-user">
                                        <Avatar icon={<UserOutlined/>} className="navbar-user-avatar"/>
                                        <span className="navbar-user-email">{userEmail}</span>
                                    </div>
                                </Dropdown>
                                <Link to="/cart" className="navbar-cart">
                                    <ShoppingOutlined className="navbar-cart-icon"/>
                                    <span className="navbar-cart-count">{cart.state.cartItems.length}</span>
                                </Link>
                                <div className="navbar-balance">
                                    <Spin spinning={isLoading} size="small">
                                        {isLoading ? 'Loading...' : `${formatBalance(balance)} VND`}
                                    </Spin>
                                </div>
                            </>
                        ) : (
                            <>
                                <Login/>
                                <Link to="/cart" className="navbar-cart">
                                    <ShoppingOutlined className="navbar-cart-icon"/>
                                    <span className="navbar-cart-count">{cart.state.cartItems.length}</span>
                                </Link>
                            </>

                        )}
                    </div>
                </div>
                <div className="navbar-section-2">
                    <ul className="navbar-menu">
                        <li className="navbar-item">
                            <Link to="/men">Men</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/women">Women</Link>
                        </li>
                        <li className="navbar-item navbar-branch">
                            <BranchNavbar navBranch={handleSearch}/>
                        </li>
                        <li className="navbar-item">
                            <Link to="/aunctionList">Auctions</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/consign">Consign/Sale</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Modal
                open={isLoggingOut}
                closable={false}
                footer={null}
                centered
                maskClosable={false}
                style={{textAlign: 'center'}}
            >
                <Spin size="large"/>
                <h2 style={{marginTop: 20}}>Logging out...</h2>
                <p>Please wait while we securely log you out of your account.</p>
            </Modal>
        </>
    );
};

export default Navbar;