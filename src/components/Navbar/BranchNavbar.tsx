import React, { useEffect, useState } from "react";

import { Menu, Dropdown, Typography, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { useNavigate, useParams } from "react-router-dom";

import { ShopApi, ResultStatus } from '../../api';

interface BranchNavbarProps {

  onBranchSelect?: (shopId: string) => void;

}

const BranchNavbar: React.FC<BranchNavbarProps> = ({ onBranchSelect }) => {

  const [branches, setBranches] = useState<any[]>([]);

  const navigate = useNavigate();

  const shopApi = new ShopApi();

  const { shopId } = useParams<{ shopId: string }>();

  // Fetch branches from the API
  useEffect(() => {

    const fetchBranches = async () => {

      try {
        const response = await shopApi.apiShopsGet();

        console.log(response)

        if (response.data.resultStatus !== ResultStatus.Success) {
          throw new Error(`HTTP error! Status: ${response.data.resultStatus}`);
        }
        setBranches(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch branches', error);

      }
    };

    fetchBranches();

  }, [shopId]);




  const handleMenuClick = (e: any) => {

    const { key } = e;

    if (onBranchSelect) {
      onBranchSelect(key); // Call the callback if provided
    }

    navigate(`/shopBranch/${key}`);

  };


  // Create menu items from branches

  const menu = (

    <Menu onClick={handleMenuClick}>

      {branches.map(branch => (
        <Menu.Item key={branch.shopId}>

          {branch.address}
        </Menu.Item>
      ))}
    </Menu>

  );


  return (
    <div className="branchNavbar">

      <Dropdown overlay={menu}>

        <Typography.Link>

          <Space style={{color:'black', fontSize:'17px', }}>

            Branch

            <DownOutlined style={{fontSize:'15px'}}/>

          </Space>

        </Typography.Link>

      </Dropdown>

    </div>

  );
};

export default BranchNavbar;
