import React, { useState } from 'react';
import { Table, Input, Card, Row, Col, Tag } from 'antd';
import { AccountDepositsListResponse } from '../../api';
import useDepositHistory from '../../hooks/useDepositHistory';
import NavProfile from '../../components/NavProfile/NavProfile';
import { ColumnsType } from 'antd/es/table';
import { useAuth } from '../../components/Auth/Auth';

const { Search } = Input;

const DepositHistory: React.FC = () => {
	const { currentUser } = useAuth();
	const userId = currentUser?.id || '';
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [depositCode, setDepositCode] = useState('');
	const [auctionCode, setAuctionCode] = useState('');

	const { data, isLoading, error } = useDepositHistory({
		accountId: userId,
		page,
		pageSize,
		depositCode,
		auctionCode,
	});

	const formatBalance = (balance: number): string => {
		return new Intl.NumberFormat("de-DE").format(balance);
	};

	const columns: ColumnsType<AccountDepositsListResponse> = [
		{
			title: 'Deposit Code',
			dataIndex: 'depositCode',
			key: 'depositCode',
		},
		{
			title: 'Auction Code',
			dataIndex: 'auctionCode',
			key: 'auctionCode',
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
			render: (amount: number) => <strong>{`${formatBalance(amount)} VND`}</strong>,
		  },
		{
			title: 'Created Date',
			dataIndex: 'createdDate',
			key: 'createdDate',
			render: (date: string) => new Date(date).toLocaleString(),
		},
		{
			title: 'Refunded',
			dataIndex: 'hasRefunded',
			key: 'hasRefunded',
			render: (hasRefunded: boolean) => (
				<Tag color={hasRefunded ? 'green' : 'red'}>
					{hasRefunded ? 'Yes' : 'No'}
				</Tag>
			),
		},
	];

	const handleSearch = (value: string, type: 'deposit' | 'auction') => {
		if (type === 'deposit') {
			setDepositCode(value);
		} else {
			setAuctionCode(value);
		}
		setPage(1);
	};

	const handleTableChange = (pagination: any) => {
		setPage(pagination.current);
		setPageSize(pagination.pageSize);
	};

	if (error) {
		return <div>Error loading deposit history</div>;
	}

	return (
		<Card>
			<Row gutter={[16, 16]}>
				<Col span={5}>
					<NavProfile />
				</Col>
				<Col span={19}>
					<Card
						style={{
							borderRadius: "10px",
							boxShadow: "2px 2px 7px #cbc1c1",
						}}
					>
						<h3
							style={{
								fontSize: "40px",
								fontWeight: "bold",
								textAlign: "center",
								marginBottom: "10px",
							}}
						>
							Deposit History
						</h3>
						<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
							<Col span={12}>
								<Search
									placeholder="Search by Deposit Code"
									onSearch={(value) => handleSearch(value, 'deposit')}
									style={{ width: '100%' }}
								/>
							</Col>
							<Col span={12}>
								<Search
									placeholder="Search by Auction Code"
									onSearch={(value) => handleSearch(value, 'auction')}
									style={{ width: '100%' }}
								/>
							</Col>
						</Row>
						<Table
							columns={columns}
							dataSource={data?.items || []}
							rowKey="depositId"
							loading={isLoading}
							pagination={{
								current: page,
								pageSize: pageSize,
								total: data?.totalCount,
								showSizeChanger: true,
								showQuickJumper: true,
							}}
							onChange={handleTableChange}
						/>
					</Card>
				</Col>
			</Row>
		</Card>
	);
};

export default DepositHistory;