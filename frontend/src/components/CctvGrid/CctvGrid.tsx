import React, { useMemo, useState } from 'react';
import type { CctvCamera, CameraCategory } from './CctvCard';
import { CctvCard } from './CctvCard';
import { DiagramDetailModal } from './DiagramDetailModal';
import {
  CAM01Diagram,
  CAM02Diagram,
  CAM05Diagram,
  CoolingTowerDiagram,
  FanAHUDiagram,
  CctvIcon,
} from '../Diagrams';
import './CctvCard.css';

// 열원사업소 카메라 데이터 (8대)
// 스크류냉동기 6대 + 냉각탑 1대 + 팬류 1대
export const DEFAULT_CAMERAS: CctvCamera[] = [
  // AICC 건물 (3대)
  {
    id: 'CAM-01',
    name: '냉동기 #1',
    location: '스크류냉동기',
    zone: 'AICC',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '82.24 USRT',
    category: 'chiller',
  },
  {
    id: 'CAM-02',
    name: '냉동기 #2',
    location: '스크류냉동기',
    zone: 'AICC',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '82.24 USRT',
    category: 'chiller',
  },
  {
    id: 'CAM-03',
    name: '냉각탑',
    location: '냉각탑 설비',
    zone: 'AICC',
    type: 'ptz',
    status: 'normal',
    aiStatus: 'n',
    value: '32°C',
    category: 'coolingTower',
  },
  // 관제탑 건물 (3대)
  {
    id: 'CAM-04',
    name: '냉동기 #1',
    location: '스크류냉동기',
    zone: '관제탑',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '40 USRT',
    category: 'chiller',
  },
  {
    id: 'CAM-05',
    name: '냉동기 #2',
    location: '스크류냉동기',
    zone: '관제탑',
    type: 'fixed',
    status: 'warning',
    aiStatus: 'n',
    value: '40 USRT',
    category: 'chiller',
  },
  {
    id: 'CAM-06',
    name: '팬류/공조기',
    location: '팬류 설비',
    zone: '관제탑',
    type: 'ptz',
    status: 'normal',
    aiStatus: 'n',
    category: 'fan',
  },
  // 공항청사 건물 (2대)
  {
    id: 'CAM-07',
    name: '냉동기 #1',
    location: '스크류냉동기',
    zone: '공항청사',
    type: 'fixed',
    status: 'danger',
    aiStatus: 'd',
    value: '60.19 USRT',
    category: 'chiller',
  },
  {
    id: 'CAM-08',
    name: '냉동기 #2',
    location: '스크류냉동기',
    zone: '공항청사',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '60.19 USRT',
    category: 'chiller',
  },
];

// 열원사업소 탭 구성
export const CCTV_TABS = [
  { key: 'all' as CameraCategory, label: '전체', count: 8 },
  { key: 'chiller' as CameraCategory, label: '냉동기', count: 6 },
  { key: 'coolingTower' as CameraCategory, label: '냉각탑', count: 1 },
  { key: 'fan' as CameraCategory, label: '팬류/공조기', count: 1 },
];

// 열원사업소 카메라별 도면 매핑
// TODO: 관리자 모드에서 업로드한 도면으로 교체 가능
const getDiagramForCamera = (cameraId: string): React.ReactNode => {
  const diagrams: Record<string, React.ReactNode> = {
    // AICC 건물 (3대)
    'CAM-01': <CAM01Diagram />,        // AICC 스크류냉동기 #1
    'CAM-02': <CAM02Diagram />,        // AICC 스크류냉동기 #2
    'CAM-03': <CoolingTowerDiagram />, // AICC 냉각탑
    // 관제탑 건물 (3대)
    'CAM-04': <CAM01Diagram />,        // 관제탑 스크류냉동기 #1
    'CAM-05': <CAM05Diagram />,        // 관제탑 스크류냉동기 #2 (경고)
    'CAM-06': <FanAHUDiagram />,       // 관제탑 팬류/공조기
    // 공항청사 건물 (2대)
    'CAM-07': <CAM01Diagram />,        // 공항청사 스크류냉동기 #1
    'CAM-08': <CAM02Diagram />,        // 공항청사 스크류냉동기 #2
  };

  return diagrams[cameraId] || <CAM01Diagram />;
};

export interface CctvGridProps {
  cameras?: CctvCamera[];
  showDiagram?: boolean;
  onToggleDiagram?: () => void;
  activeTab?: CameraCategory;
  onTabChange?: (tab: CameraCategory) => void;
  onCameraClick?: (camera: CctvCamera) => void;
}

/**
 * CCTV Grid Component
 * Displays a grid of CCTV camera feeds with filtering and view toggle
 */
export const CctvGrid: React.FC<CctvGridProps> = ({
  cameras = DEFAULT_CAMERAS,
  showDiagram = true,
  onToggleDiagram,
  activeTab = 'all',
  onTabChange,
  onCameraClick,
}) => {
  // 도면 상세 모달 상태
  const [selectedCamera, setSelectedCamera] = useState<CctvCamera | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 더블클릭 시 상세 모달 열기
  const handleCameraDoubleClick = (camera: CctvCamera) => {
    setSelectedCamera(camera);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCamera(null);
  };

  // Filter cameras based on active tab
  const filteredCameras = useMemo(() => {
    if (activeTab === 'all') return cameras;
    return cameras.filter((camera) => camera.category === activeTab);
  }, [cameras, activeTab]);

  // 카테고리별 카메라 수 계산
  const tabCounts = useMemo(() => {
    const counts: Record<CameraCategory, number> = {
      all: cameras.length,
      chiller: cameras.filter((c) => c.category === 'chiller').length,
      coolingTower: cameras.filter((c) => c.category === 'coolingTower').length,
      fan: cameras.filter((c) => c.category === 'fan').length,
    };
    return counts;
  }, [cameras]);

  // Count connected cameras
  const connectedCount = cameras.length;
  const totalCount = cameras.length;

  // Count fixed and PTZ cameras
  const fixedCount = cameras.filter((c) => c.type === 'fixed').length;
  const ptzCount = cameras.filter((c) => c.type === 'ptz').length;

  const handleToggleChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    if (onToggleDiagram) {
      onToggleDiagram();
    }
  };

  const handleTabClick = (tab: CameraCategory) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <div className="card">
      {/* Card Header */}
      <div className="card-hd">
        <div
          className="card-icon"
          style={{
            background: 'var(--iafc-green-lt)',
            color: 'var(--iafc-green)',
          }}
        >
          <CctvIcon />
        </div>
        <h3>CCTV 실시간 모니터링</h3>
        <span className="sub">
          고정형 {fixedCount}ch · PTZ {ptzCount}ch
        </span>
        <div className="ml">
          <span className="cctv-tag-pill">
            {connectedCount}/{totalCount} 연결
          </span>

          {/* View Toggle */}
          <div className="cctv-view-toggle">
            <span className={`cvt-lbl ${showDiagram ? 'on' : ''}`}>
              도면
            </span>
            <label className="view-switch" onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                checked={!showDiagram}
                onChange={handleToggleChange}
              />
              <span className="view-track"></span>
            </label>
            <span className={`cvt-lbl ${!showDiagram ? 'on' : ''}`}>
              실사
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ctabs">
        {CCTV_TABS.map((tab) => (
          <button
            key={tab.key}
            className={`ctab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label} ({tabCounts[tab.key]})
          </button>
        ))}
      </div>

      {/* Camera Grid */}
      <div className="cctv-grid">
        {filteredCameras.map((camera) => (
          <CctvCard
            key={camera.id}
            camera={camera}
            diagram={getDiagramForCamera(camera.id)}
            showDiagram={showDiagram}
            onClick={() => onCameraClick?.(camera)}
            onDoubleClick={() => handleCameraDoubleClick(camera)}
          />
        ))}
      </div>

      {/* 도면 상세 모달 */}
      {selectedCamera && (
        <DiagramDetailModal
          camera={selectedCamera}
          diagram={getDiagramForCamera(selectedCamera.id)}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CctvGrid;
