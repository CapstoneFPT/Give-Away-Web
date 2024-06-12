
import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import { Link } from "react-router-dom";
const { Column } = Table;
const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const Aunction = () => {
  return (
    <>
      
        <div style={{width:'90%',marginLeft:'80px'}}>
        <h1 style={{textAlign:'center', margin:'30px'}}>Aunction List</h1>
          <Table dataSource={data}>
            
              <Column title="Store Name" dataIndex="firstName" key="firstName" />
              <Column title="Product name" dataIndex="lastName" key="lastName" />
            
            <Column title="Store address" dataIndex="address" key="address" />
            <Column title="Time" dataIndex="age" key="age" />

            <Column
              title="Status"
              dataIndex="tags"
              key="tags"
              render={(tags) => (
                <>
                  {tags.map((tag:any) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                      color = 'volcano';
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                      </Tag>
                    );
                  })}
                </>
              )}
            />
            <Column
              title="Action"
              key="action"
              render={(_, record) => (
                <Space size="middle">
                  <Link to='/detailProductAunction'> 
                    <Button>Detail</Button>
                  </Link>
                  <Link to='/ruleAunction'> 
                    <Button>Deposit</Button>
                  </Link>
                  <Link to=''> 
                    <Button>Aunction</Button>
                  </Link>
                </Space>
              )}
            />
          </Table>
        </div>
      
    </>
  )



};

export default Aunction;
