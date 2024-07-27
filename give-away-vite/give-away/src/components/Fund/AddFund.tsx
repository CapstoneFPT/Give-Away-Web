import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResultStatus, ShopApi } from '../../api';
import { Select } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


const { Option } = Select;

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

  const handleSelectChange = (value: string) => {
    const branch = branches.find(branch => branch.id === value);
    setSelectedBranch(branch);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Select style={{ width: '100%' }} onChange={handleSelectChange} placeholder="Select a branch">
          {branches.map(branch => (
            <Option key={branch.id} value={branch.id}>
              {branch.address}
            </Option>
          ))}
        </Select>
      </div>
      <div style={{ flex: 2, height: '500px' }}>
        <MapContainer center={[10.762622, 106.660172]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
  );
};

export default Branches;
