import React from 'react';
import type { KpiCardProps } from './KpiCard';
import { KpiCard } from './KpiCard';
import './KpiCard.css';

// SVG Icons from ASSETS_REFERENCE.md

/** CCTV Camera Icon */
const CctvIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M23 7l-7 5 7 5V7z"/>
    <rect x="1" y="5" width="15" height="14" rx="2"/>
  </svg>
);

/** Temperature Sensor Icon */
const TemperatureIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/>
  </svg>
);

/** Expansion/Displacement Icon (진동 센서에도 사용) */
const DisplacementIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
  </svg>
);

/** Valve Status Icon */
const ValveIcon = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
);

/** Emergency Alarm Icon */
const AlarmIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

/** Building Icon */
const BuildingIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01"/>
  </svg>
);

/** Chiller/Refrigerator Icon */
const ChillerIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M12 8v8M8 12h8"/>
    <circle cx="6" cy="8" r="1"/>
    <circle cx="18" cy="8" r="1"/>
  </svg>
);

// Default KPI data based on 열원사업소 specifications
export const defaultKpiData: KpiCardProps[] = [
  {
    title: 'CCTV 상태',
    value: '8',
    valueUnit: '/8',
    sub: '고정형 4 · PTZ 4',
    status: 'ok',
    statusText: '정상',
    color: 'iafc-green',
    icon: <CctvIcon />,
  },
  {
    title: '진동 센서',
    value: '12',
    valueUnit: '/12',
    sub: '냉동기 진동 감지',
    status: 'ok',
    statusText: '정상',
    color: 'iafc-blue',
    icon: <DisplacementIcon />,
  },
  {
    title: '온도 센서',
    value: '8',
    valueUnit: '/8',
    sub: '배관 표면 접촉식',
    status: 'ok',
    statusText: '정상',
    color: 'ok',
    icon: <TemperatureIcon />,
  },
  {
    title: '건물 현황',
    value: '3',
    valueUnit: '/3 건물',
    sub: 'AICC·관제탑·공항청사',
    status: 'ok',
    statusText: '정상',
    color: 'iafc-yellow',
    icon: <BuildingIcon />,
  },
  {
    title: '냉동기 상태',
    value: '6',
    valueUnit: '/6 가동',
    sub: '전체 냉동기 운전중',
    status: 'ok',
    statusText: '정상',
    color: 'iafc-green',
    icon: <ChillerIcon />,
  },
];

export interface KpiRowProps {
  /** Array of KPI card data. Uses default data if not provided. */
  kpiData?: KpiCardProps[];
  /** Additional CSS class name */
  className?: string;
}

/**
 * KpiRow Component
 *
 * Displays a grid of KPI cards (5 columns by default).
 * Based on the design from index_original.html lines 1096-1152.
 */
export const KpiRow: React.FC<KpiRowProps> = ({
  kpiData = defaultKpiData,
  className = '',
}) => {
  return (
    <div className={`kpi-row ${className}`.trim()}>
      {kpiData.map((kpi, index) => (
        <KpiCard key={index} {...kpi} />
      ))}
    </div>
  );
};

// Export icons for reuse
export const KpiIcons = {
  Cctv: CctvIcon,
  Temperature: TemperatureIcon,
  Displacement: DisplacementIcon,
  Valve: ValveIcon,
  Alarm: AlarmIcon,
  Building: BuildingIcon,
  Chiller: ChillerIcon,
};

export default KpiRow;
