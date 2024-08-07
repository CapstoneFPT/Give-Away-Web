import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Typography, Space, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { ShopApi, ResultStatus } from '../../api';

const BranchNavbar: React.FC = () => {
  const [branches, setBranches] = useState<any[]>([]);
  const navigate = useNavigate();
  const shopApi = new ShopApi();
  const { shopId } = useParams<{ shopId: string }>();

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await shopApi.apiShopsGet();
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
    const selectedBranch = branches.find(branch => branch.shopId === key);
    const address = selectedBranch ? selectedBranch.address : '';

    navigate(`/shopBranch/${key}`, { state: { address } });
  };

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
          <Space style={{ color: 'black', fontSize: '17px' }}>
            Branch
            <DownOutlined style={{ fontSize: '15px' }} />
          </Space>
        </Typography.Link>
      </Dropdown>
    </div>
  );
};

export default BranchNavbar;
