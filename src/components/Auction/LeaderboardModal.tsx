import React from 'react';
import { Modal, Table, Button } from 'antd';
import { AuctionLeaderboardResponse, LeaderboardItemListResponse } from '../../api';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import { formatBalance } from '../../utils/utils';

interface LeaderboardModalProps {
  visible: boolean;
  onClose: () => void;
  leaderboardData: AuctionLeaderboardResponse | null;
  onPageChange: (page: number, pageSize: number) => void;
  onRedirect: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ visible, onClose, leaderboardData, onPageChange, onRedirect }) => {
  const columns: ColumnType<LeaderboardItemListResponse>[] = [
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Highest Bid',
      dataIndex: 'highestBid',
      key: 'highestBid',
      render: (value: number) => `${formatBalance(value)} VND`
    },
    {
      title: 'Won',
      dataIndex: 'isWon',
      key: 'isWon',
      render: (value: boolean) => value ? 'Yes' : 'No',
    },
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current && pagination.pageSize) {
      onPageChange(pagination.current, pagination.pageSize);
    }
  };

  const handleClose = () => {
    onClose();
    onRedirect();
  };

  return (
    <Modal
      title="Auction Leaderboard"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={handleClose}>
          Close and Redirect
        </Button>
      ]}
      width={800}
    >
      <Table
        dataSource={leaderboardData?.leaderboard?.items || []}
        columns={columns}
        rowKey="memberId"
        pagination={{
          total: leaderboardData?.leaderboard?.totalCount,
          pageSize: leaderboardData?.leaderboard?.pageSize,
          current: leaderboardData?.leaderboard?.pageNumber,
          onChange: (page, pageSize) => onPageChange(page, pageSize),
        }}
        onChange={handleTableChange}
      />
    </Modal>
  );
};

export default LeaderboardModal;
