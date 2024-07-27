import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ResultStatus, ShopApi } from '../../api';
import { EnvironmentOutlined } from '@ant-design/icons';
import backgroundImageUrl from "../../components/Assets/background-quang-cao-thoi-trang-quan-ao_025656570.jpg";


const Branches: React.FC = () => {
  const shopApi = new ShopApi();
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<any | null>(null);

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
  }, []);

  const handleBranchClick = (branch: any) => {
    setSelectedBranch(branch);
  };

  return (
   <Card style={{
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "65vh",
   
  }}>
     <div style={{ display: 'flex', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <Card  title="Branches">
          <List
            dataSource={branches}
            renderItem={branch => (
              <List.Item onClick={() => handleBranchClick(branch)} style={{ cursor: 'pointer' }}>
                <EnvironmentOutlined style={{ marginRight: '8px' }}/> 
                {branch.address}
              </List.Item>
            )}
          />
        </Card>
      </div>
      <div style={{ flex: 1.5, height: '600px' }}>
        <MapContainer center={selectedBranch ? [selectedBranch.latitude, selectedBranch.longitude] : [10.762622, 106.660172]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {selectedBranch && (
            <Marker
              position={[selectedBranch.latitude, selectedBranch.longitude]}
              icon={L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
              })}
            >
              <Popup>
                {selectedBranch.address}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
   </Card>
  );
};

export default Branches;
