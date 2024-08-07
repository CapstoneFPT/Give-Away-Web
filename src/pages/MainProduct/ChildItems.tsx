import React from 'react'
import { Table } from 'antd';

const dataSource = [
  { key: '1', name: 'Item 1', description: 'Description 1' },
  { key: '2', name: 'Item 2', description: 'Description 2' },
  // ... thêm các item khác nếu cần
];

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Description', dataIndex: 'description', key: 'description' },
];

const ChildItems = () => {
  return (
    <Table dataSource={dataSource} columns={columns} />
  )
}

export default ChildItems   