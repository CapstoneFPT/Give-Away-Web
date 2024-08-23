import React, { useEffect, useState } from "react";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { ShopApi, ResultStatus } from '../../api';

interface navBranchProps {
  navBranch: (searchTerm: string) => void;
}

const BranchNavbar: React.FC<navBranchProps> = ({navBranch}) => {
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
      <Dropdown overlay={menu} trigger={['hover']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Branch <DownOutlined />
        </a>
      </Dropdown>
  );
};

export default BranchNavbar;