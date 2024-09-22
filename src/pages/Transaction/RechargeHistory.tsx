import React, { useState } from 'react';
import { Table, Input, Select, Card, Row, Col, Tag } from 'antd';
import { AccountApi, RechargeListResponse, RechargeStatus } from '../../api';
import useRecharges from '../../hooks/useRecharges';
import NavProfile from '../../components/NavProfile/NavProfile';
import { ColumnsType } from 'antd/es/table';
import { getPaymentStatus, getRechargeStatus } from '../../utils/types';
import { useAuth } from '../../components/Auth/Auth';

const { Option } = Select;

const RechargeHistory: React.FC = () => {
	const { currentUser } = useAuth();
	const userId = currentUser?.id || '';
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [rechargeCode, setRechargeCode] = useState('');
	const [status, setStatus] = useState<RechargeStatus | undefined>(undefined);

	const { data, isLoading, error } = useRecharges({
		accountId: userId,
		page,
		pageSize,
		rechargeCode,
		rechargeStatus: status,
	});

	const columns: ColumnsType<RechargeListResponse> = [
		{
			title: 'Recharge Code',
			dataIndex: 'rechargeCode',
			key: 'rechargeCode',
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			key: 'amount',
			render: (amount: number) => `${formatBalance(amount)} VND`,
		},
		{
			title: 'Created Date',
			dataIndex: 'createdDate',
			key: 'createdDate',
			render: (date: string) => new Date(date).toLocaleString(),
		},
		{
			title: 'Payment Method',
			dataIndex: 'paymentMethod',
			key: 'paymentMethod',
			render: (paymentMethod: string) => (
				<Tag color={getPaymentStatus(paymentMethod)}>
					{paymentMethod}
				</Tag>
			),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			render: (status: RechargeStatus) => (
				<Tag color={getRechargeStatus(status)}>
					{status}
				</Tag>
			),
		},
	];

	const handleStatusChange = (selectedStatus: RechargeStatus | undefined) => {
		setStatus(selectedStatus);
		setPage(1);
	};

	const handleTableChange = (pagination: any) => {
		setPage(pagination.current);
		setPageSize(pagination.pageSize);
	};

	if (error) {
		return <div>Error loading recharge history</div>;
	}

	const formatBalance = (price: number): string => {
		return new Intl.NumberFormat("de-DE").format(price);
	};

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
							Recharge History
						</h3>
						<Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
							<Col span={12}>
								<Input
									placeholder="Recharge Code"
									value={rechargeCode}
									onChange={(e) => setRechargeCode(e.target.value)}
								/>
							</Col>
							<Col span={12}>
								<Select
									style={{ width: '100%' }}
									placeholder="Select status"
									onChange={handleStatusChange}
									allowClear
								>
									{Object.values(RechargeStatus).map((status) => (
										<Option key={status} value={status}>
											{status}
										</Option>
									))}
								</Select>
							</Col>
						</Row>
						<Table
							columns={columns}
							dataSource={data?.items || []}
							rowKey="rechargeId"
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

export default RechargeHistory;