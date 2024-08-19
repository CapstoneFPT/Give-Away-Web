import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import SubMenu from 'antd/es/menu/SubMenu';
import {CategoryTreeNode} from "../api";

const useMenuItems = (categories: CategoryTreeNode[], onSelectCategory: (categoryId: string) => void) => {
    const renderMenuItems = (categories: CategoryTreeNode[]): React.ReactNode => {
        return categories.map((category) => {
            if (category.children && category.children.length > 0) {
                return (
                    <SubMenu
                        key={category.categoryId}
                        icon={<AppstoreOutlined />}
                        title={category.name}
                        onTitleClick={() => onSelectCategory(category.categoryId!)}
                    >
                        <Menu.Item key={`${category.categoryId}-all`}>All {category.name}</Menu.Item>
                        {renderMenuItems(category.children)}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item
                    key={category.categoryId}
                    icon={<AppstoreOutlined />}
                    onClick={() => onSelectCategory(category.categoryId!)}
                >
                    {category.name}
                </Menu.Item>
            );
        });
    };

    return renderMenuItems(categories);
};

export default useMenuItems;