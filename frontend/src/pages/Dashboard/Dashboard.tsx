import React, { useState, useCallback } from 'react';
import { KpiRow } from '@/components/KpiCard';
import type { CameraCategory, CctvCamera } from '@/components/CctvGrid';
import { CctvGrid } from '@/components/CctvGrid';
import type { AlarmData } from '@/components/AlarmPanel';
import { AlarmPanel, defaultAlarms } from '@/components/AlarmPanel';
import { SensorGrid, defaultSensorData } from '@/components/SensorGrid';
import type { ValveData } from '@/components/ValveCard';
import { ValveGrid } from '@/components/ValveCard';
import {
  ChillerStatusChart,
  AlarmTrendChart,
  TrendChart,
} from '@/components/Charts';
import { AdminSettingsPanel } from '@/components/AdminSettingsPanel';
import { useCameraConfig } from '@/hooks/useCameraConfig';
import './Dashboard.css';

// 냉동기 목데이터 (열원사업소 기준)
const CHILLER_DATA: ValveData[] = [
  {
    id: 'AICC #1',
    angle: 90,
    status: 'ok',
    statusText: '82.24 USRT',
    zone: 'AICC',
    cameraId: 'CAM-01'
  },
  {
    id: 'AICC #2',
    angle: 90,
    status: 'ok',
    statusText: '82.24 USRT',
    zone: 'AICC',
    cameraId: 'CAM-02'
  },
  {
    id: '관제탑 #1',
    angle: 90,
    status: 'ok',
    statusText: '40 USRT',
    zone: '관제탑',
    cameraId: 'CAM-03'
  },
  {
    id: '관제탑 #2',
    angle: 90,
    status: 'ok',
    statusText: '40 USRT',
    zone: '관제탑',
    cameraId: 'CAM-04'
  },
  {
    id: '공항청사 #1',
    angle: 90,
    status: 'ok',
    statusText: '60.19 USRT',
    zone: '공항청사',
    cameraId: 'CAM-05'
  },
  {
    id: '공항청사 #2',
    angle: 90,
    status: 'ok',
    statusText: '60.19 USRT',
    zone: '공항청사',
    cameraId: 'CAM-06'
  },
];

export interface DashboardProps {
  isAdminMode?: boolean;
}

/**
 * Dashboard Page (p1) - 실시간 관제
 *
 * 열원사업소 모니터링 메인 대시보드:
 * - KPI 카드 행 (5열)
 * - CCTV 실시간 모니터링 그리드 (4열) + 알람 패널 사이드바
 * - 트렌드 차트 영역 (냉동기 가동 현황, 알람 추이, 온도/변위 트렌드)
 * - 센서 데이터 그리드 (6열, 12개 센서)
 * - 냉동기 상태 그리드 (6대 냉동기)
 *
 * 열원사업소 장비 현황:
 * - 스크류냉동기 6대 (AICC 2대, 관제탑 2대, 공항청사 2대)
 * - 진동 센서 12개
 * - 온도 센서 8개
 * - CCTV 8대
 *
 * 관리자 모드:
 * - 상단 헤더의 관리자 버튼을 더블클릭하면 관리자 설정 패널이 표시됩니다.
 * - CCTV 도면/이미지 업로드, ROI 설정, 임계값 설정 등이 가능합니다.
 */
export const Dashboard: React.FC<DashboardProps> = ({ isAdminMode = false }) => {
  // 저장된 카메라 설정 불러오기 (ROI, 커스텀 이미지 포함)
  const { cameras: configuredCameras } = useCameraConfig();

  // CCTV diagram/real view toggle state
  const [showDiagram, setShowDiagram] = useState<boolean>(true);

  // CCTV tab filter state
  const [activeTab, setActiveTab] = useState<CameraCategory>('all');

  // Toggle handler for diagram/real view
  const handleToggleDiagram = useCallback(() => {
    setShowDiagram((prev) => !prev);
  }, []);

  // Tab change handler
  const handleTabChange = useCallback((tab: CameraCategory) => {
    setActiveTab(tab);
  }, []);

  // Camera click handler
  const handleCameraClick = useCallback((camera: CctvCamera) => {
    console.log('Camera clicked:', camera.id, camera.name);
    // TODO: Implement camera detail view or modal
  }, []);

  // Alarm click handler
  const handleAlarmClick = useCallback((alarm: AlarmData) => {
    console.log('Alarm clicked:', alarm.id, alarm.title);
    // TODO: Implement alarm detail view or navigation
  }, []);

  // Sensor click handler
  const handleSensorClick = useCallback((sensorId: string) => {
    console.log('Sensor clicked:', sensorId);
    // TODO: Implement sensor detail view
  }, []);

  // Chiller click handler
  const handleChillerClick = useCallback((chiller: ValveData) => {
    console.log('Chiller clicked:', chiller.id, chiller.zone);
    // TODO: Implement chiller detail view or control modal
  }, []);

  return (
    <div className="dashboard">
      {/* Admin Settings Panel - 관리자 모드일 때만 표시 */}
      {isAdminMode && (
        <section className="dashboard-section">
          <AdminSettingsPanel />
        </section>
      )}

      {/* KPI Cards Row - 5 columns */}
      <section className="dashboard-section">
        <KpiRow />
      </section>

      {/* Main Content Area - CCTV Grid + Alarm Panel */}
      <section className="dashboard-main">
        {/* CCTV Monitoring Grid */}
        <div className="dashboard-content">
          <CctvGrid
            cameras={configuredCameras}
            showDiagram={showDiagram}
            onToggleDiagram={handleToggleDiagram}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onCameraClick={handleCameraClick}
          />
        </div>

        {/* Real-time Alarm Panel Sidebar */}
        <aside className="dashboard-sidebar">
          <AlarmPanel
            alarms={defaultAlarms}
            onAlarmClick={handleAlarmClick}
          />
        </aside>
      </section>

      {/* Charts Section - 실시간 트렌드 및 통계 */}
      <section className="dashboard-section">
        <div className="card">
          <div className="card-hd">
            <div
              className="card-icon"
              style={{
                background: 'var(--iafc-blue-lt)',
                color: 'var(--iafc-blue)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M7 16l4-4 4 4 5-6" />
              </svg>
            </div>
            <h3>실시간 운영 현황</h3>
            <span className="sub">냉동기 가동률 / 알람 추이 / 온도 트렌드</span>
          </div>
          <div className="charts-grid charts-grid-3">
            <ChillerStatusChart
              title="냉동기 가동 현황"
              className="chart-sm"
            />
            <AlarmTrendChart
              title="최근 7일 알람 발생 추이"
              className="chart-sm"
            />
            <TrendChart
              title="24시간 온도/변위 트렌드"
              className="chart-sm"
            />
          </div>
        </div>
      </section>

      {/* Sensor Data Grid - 6 columns, 12 sensors */}
      <section className="dashboard-section">
        <SensorGrid
          sensors={defaultSensorData}
          onSensorClick={handleSensorClick}
        />
      </section>

      {/* Chiller Status Grid - 6 chillers */}
      <section className="dashboard-section">
        <div className="card">
          <div className="card-hd">
            <div
              className="card-icon"
              style={{
                background: 'var(--iafc-green-lt)',
                color: 'var(--iafc-green)',
              }}
            >
              <svg viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M12 8v8M8 12h8"/>
                <circle cx="6" cy="8" r="1"/>
                <circle cx="18" cy="8" r="1"/>
              </svg>
            </div>
            <h3>냉동기 운전 상태</h3>
            <span className="sub">3개 건물 6대 냉동기</span>
          </div>
          <ValveGrid
            valves={CHILLER_DATA}
            onValveClick={handleChillerClick}
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
