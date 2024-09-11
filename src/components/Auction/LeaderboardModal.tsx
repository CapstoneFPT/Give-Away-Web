import React from 'react';
import { Modal, Table } from 'antd';
import { AuctionLeaderboardResponse } from '../../api';

interface LeaderboardModalProps {
  visible: boolean;
  onClose: () => void;
  leaderboardData: AuctionLeaderboardResponse | null;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ visible, onClose, leaderboardData }) => {
  const columns = [
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Highest Bid',
      dataIndex: 'highestBid',
      key: 'highestBid',
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    {
      title: 'Won',
      dataIndex: 'isWon',
      key: 'isWon',
      render: (value: boolean) => value ? 'Yes' : 'No',
    },
  ];

  return (
    <Modal
      title="Auction Leaderboard"
      open={visible}
      onCancel={onClose}
      footer={null}
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
        }}
      />
    </Modal>
  );
};

export default LeaderboardModal;