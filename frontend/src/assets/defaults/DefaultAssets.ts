/**
 * DefaultAssets.ts
 *
 * CCTV, 장비 도면, ROI 영역의 기본값 정의
 * 인천공항 열원사업소 AI 모니터링 시스템
 */

import type { CameraStatus, CameraCategory, CameraROI, CctvCamera } from '../../components/CctvGrid/CctvCard';

// ============================================================================
// 상태 색상 정의
// ============================================================================
export const StatusColors = {
  normal: '#10B981',   // 정상 (에메랄드 그린)
  warning: '#F59E0B',  // 경고 (앰버)
  danger: '#DC2626',   // 긴급 (레드)
  info: '#3B82F6',     // 정보 (블루)
  muted: '#6B7280',    // 비활성 (그레이)
} as const;

// AI 상태 색상
export const AiStatusColors = {
  normal: '#00AAB5',   // 정상 감시중 (시안)
  detected: '#FF6B6B', // 이상 감지 (코랄)
} as const;

// 장비 카테고리 색상
export const CategoryColors = {
  chiller: '#FFB088',      // 냉동기 (파스텔 오렌지)
  coolingTower: '#7DD3FC', // 냉각탑 (스카이 블루)
  fan: '#6AC0E0',          // 팬류/공조기 (시안)
  pipe: '#3A9A7A',         // 배관 (그린)
  valve: '#5ABF9F',        // 밸브 (민트)
  gauge: '#E8B84B',        // 게이지 (골드)
} as const;

// ============================================================================
// 기본 ROI (관심영역) 영역 정의
// ============================================================================
export const DefaultROIAreas: Record<string, CameraROI[]> = {
  // CAM-01: 스크류냉동기 #1 ROI
  'CAM-01': [
    {
      id: 'roi-cam01-screw',
      name: '스크류 압축기',
      x: 16,
      y: 36,
      width: 45,
      height: 32,
      color: 'rgba(255,176,136,0.3)',
    },
    {
      id: 'roi-cam01-evap',
      name: '증발기',
      x: 65,
      y: 38,
      width: 42,
      height: 28,
      color: 'rgba(192,144,112,0.3)',
    },
    {
      id: 'roi-cam01-motor',
      name: '모터',
      x: 116,
      y: 38,
      width: 32,
      height: 28,
      color: 'rgba(255,192,160,0.3)',
    },
    {
      id: 'roi-cam01-gauge',
      name: '온도/압력 게이지',
      x: 50,
      y: 18,
      width: 34,
      height: 14,
      color: 'rgba(16,185,129,0.3)',
    },
  ],

  // CAM-02: 스크류냉동기 #2 ROI
  'CAM-02': [
    {
      id: 'roi-cam02-screw',
      name: '스크류 압축기',
      x: 16,
      y: 36,
      width: 45,
      height: 32,
      color: 'rgba(255,176,136,0.3)',
    },
    {
      id: 'roi-cam02-cond',
      name: '응축기',
      x: 65,
      y: 38,
      width: 42,
      height: 28,
      color: 'rgba(192,144,112,0.3)',
    },
    {
      id: 'roi-cam02-motor',
      name: '모터',
      x: 116,
      y: 38,
      width: 32,
      height: 28,
      color: 'rgba(255,192,160,0.3)',
    },
  ],

  // CAM-03: 수직배관 ROI
  'CAM-03': [
    {
      id: 'roi-cam03-vpipe',
      name: '수직배관',
      x: 22,
      y: 10,
      width: 12,
      height: 65,
      color: 'rgba(58,154,122,0.3)',
    },
    {
      id: 'roi-cam03-hpipe',
      name: '수평배관',
      x: 34,
      y: 38,
      width: 90,
      height: 12,
      color: 'rgba(58,154,122,0.3)',
    },
    {
      id: 'roi-cam03-gauge',
      name: '온도계',
      x: 82,
      y: 22,
      width: 16,
      height: 16,
      color: 'rgba(0,170,181,0.3)',
    },
  ],

  // CAM-05: 압력 게이지 ROI
  'CAM-05': [
    {
      id: 'roi-cam05-gauge',
      name: '압력 게이지',
      x: 58,
      y: 20,
      width: 44,
      height: 44,
      color: 'rgba(220,38,38,0.3)',
    },
    {
      id: 'roi-cam05-needle',
      name: '게이지 바늘',
      x: 72,
      y: 30,
      width: 16,
      height: 20,
      color: 'rgba(255,68,68,0.3)',
    },
  ],

  // CAM-06: 밸브 완전개방 ROI
  'CAM-06': [
    {
      id: 'roi-cam06-valve',
      name: '밸브 본체',
      x: 72,
      y: 30,
      width: 16,
      height: 26,
      color: 'rgba(58,154,122,0.3)',
    },
    {
      id: 'roi-cam06-handle',
      name: '핸들',
      x: 74,
      y: 20,
      width: 12,
      height: 14,
      color: 'rgba(90,191,159,0.3)',
    },
  ],

  // CAM-07: 밸브 부분개방 ROI
  'CAM-07': [
    {
      id: 'roi-cam07-valve',
      name: '밸브 디스크',
      x: 68,
      y: 38,
      width: 24,
      height: 24,
      color: 'rgba(232,184,75,0.3)',
    },
    {
      id: 'roi-cam07-handle',
      name: '핸들',
      x: 74,
      y: 34,
      width: 12,
      height: 14,
      color: 'rgba(232,184,75,0.3)',
    },
  ],

  // PTZ-01: 배관터널 ROI
  'PTZ-01': [
    {
      id: 'roi-ptz01-upper',
      name: '상층 배관',
      x: 0,
      y: 8,
      width: 160,
      height: 8,
      color: 'rgba(58,106,138,0.3)',
    },
    {
      id: 'roi-ptz01-middle',
      name: '중층 배관',
      x: 0,
      y: 30,
      width: 160,
      height: 10,
      color: 'rgba(30,77,58,0.3)',
    },
    {
      id: 'roi-ptz01-lower',
      name: '하층 배관',
      x: 0,
      y: 55,
      width: 160,
      height: 8,
      color: 'rgba(58,106,138,0.3)',
    },
  ],

  // PTZ-04: 열화상 ROI
  'PTZ-04': [
    {
      id: 'roi-ptz04-hotspot',
      name: '열점 영역',
      x: 63,
      y: 31,
      width: 44,
      height: 36,
      color: 'rgba(255,100,0,0.3)',
    },
    {
      id: 'roi-ptz04-pipe',
      name: '배관 전체',
      x: 5,
      y: 42,
      width: 150,
      height: 14,
      color: 'rgba(204,34,34,0.2)',
    },
  ],

  // PTZ-07: 펌프실 ROI
  'PTZ-07': [
    {
      id: 'roi-ptz07-pump1',
      name: '펌프 #1',
      x: 10,
      y: 45,
      width: 30,
      height: 30,
      color: 'rgba(58,106,154,0.3)',
    },
    {
      id: 'roi-ptz07-pump2',
      name: '펌프 #2',
      x: 120,
      y: 45,
      width: 30,
      height: 30,
      color: 'rgba(58,106,154,0.3)',
    },
    {
      id: 'roi-ptz07-mainpipe',
      name: '메인배관',
      x: 40,
      y: 55,
      width: 80,
      height: 10,
      color: 'rgba(58,106,154,0.3)',
    },
  ],

  // 냉각탑 ROI
  'CT-01': [
    {
      id: 'roi-ct01-fan',
      name: '냉각탑 팬',
      x: 72,
      y: 7,
      width: 16,
      height: 16,
      color: 'rgba(90,175,207,0.3)',
    },
    {
      id: 'roi-ct01-fill',
      name: '충전재',
      x: 40,
      y: 28,
      width: 80,
      height: 35,
      color: 'rgba(58,122,154,0.3)',
    },
    {
      id: 'roi-ct01-basin',
      name: '수조',
      x: 45,
      y: 65,
      width: 70,
      height: 17,
      color: 'rgba(74,138,186,0.3)',
    },
  ],

  // 공조기 ROI
  'AHU-01': [
    {
      id: 'roi-ahu01-filter',
      name: '필터 섹션',
      x: 16,
      y: 30,
      width: 25,
      height: 40,
      color: 'rgba(74,122,154,0.3)',
    },
    {
      id: 'roi-ahu01-coil',
      name: '냉각코일',
      x: 45,
      y: 30,
      width: 30,
      height: 40,
      color: 'rgba(74,154,186,0.3)',
    },
    {
      id: 'roi-ahu01-fan',
      name: '팬',
      x: 80,
      y: 30,
      width: 40,
      height: 40,
      color: 'rgba(74,138,181,0.3)',
    },
    {
      id: 'roi-ahu01-motor',
      name: '모터',
      x: 124,
      y: 35,
      width: 20,
      height: 30,
      color: 'rgba(74,138,181,0.3)',
    },
  ],
};

// ============================================================================
// 기본 CCTV 카메라 설정
// ============================================================================
export const DefaultCctvCameras: CctvCamera[] = [
  // =========== 냉동기 (chiller) ===========
  {
    id: 'CAM-01',
    name: 'AICC 스크류냉동기 #1',
    location: '1층 기계실',
    zone: 'A구역',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '82.24 USRT',
    category: 'chiller',
    realImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    rois: DefaultROIAreas['CAM-01'],
  },
  {
    id: 'CAM-02',
    name: 'AICC 스크류냉동기 #2',
    location: '1층 기계실',
    zone: 'A구역',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '82.24 USRT',
    category: 'chiller',
    realImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
    rois: DefaultROIAreas['CAM-02'],
  },
  {
    id: 'CAM-03',
    name: '수축팽창 구간3 수직배관',
    location: 'B동 배관실',
    zone: 'B구역',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '48°C',
    category: 'chiller',
    realImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    rois: DefaultROIAreas['CAM-03'],
  },
  {
    id: 'CAM-05',
    name: '압력 게이지 모니터링',
    location: 'C동 제어실',
    zone: 'C구역',
    type: 'fixed',
    status: 'danger',
    aiStatus: 'd',
    value: '4.2 bar',
    category: 'chiller',
    realImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    rois: DefaultROIAreas['CAM-05'],
  },

  // =========== 밸브 ===========
  {
    id: 'CAM-06',
    name: '밸브 완전개방 모니터링',
    location: 'C동 기계실',
    zone: 'C구역',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '완전개방',
    category: 'chiller',
    realImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    rois: DefaultROIAreas['CAM-06'],
  },
  {
    id: 'CAM-07',
    name: '밸브 부분개방 모니터링',
    location: 'D동 기계실',
    zone: 'D구역',
    type: 'fixed',
    status: 'warning',
    aiStatus: 'd',
    value: '45°',
    category: 'chiller',
    realImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    rois: DefaultROIAreas['CAM-07'],
  },

  // =========== PTZ 카메라 ===========
  {
    id: 'PTZ-01',
    name: 'A구역 배관터널 광역',
    location: '지하1층 터널',
    zone: 'A구역',
    type: 'ptz',
    status: 'normal',
    aiStatus: 'n',
    category: 'chiller',
    realImageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
    rois: DefaultROIAreas['PTZ-01'],
  },
  {
    id: 'PTZ-04',
    name: '열화상 감지 카메라',
    location: 'B동 배관실',
    zone: 'B구역',
    type: 'ptz',
    status: 'danger',
    aiStatus: 'd',
    value: '68°C',
    category: 'chiller',
    realImageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
    rois: DefaultROIAreas['PTZ-04'],
  },
  {
    id: 'PTZ-07',
    name: '메인 기계실 (펌프실)',
    location: '1층 펌프실',
    zone: 'A구역',
    type: 'ptz',
    status: 'normal',
    aiStatus: 'n',
    category: 'chiller',
    realImageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800',
    rois: DefaultROIAreas['PTZ-07'],
  },

  // =========== 냉각탑 (coolingTower) ===========
  {
    id: 'CT-01',
    name: 'AICC 옥상 냉각탑 #1',
    location: '옥상',
    zone: 'A구역',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '32°C',
    category: 'coolingTower',
    realImageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
    rois: DefaultROIAreas['CT-01'],
  },
  {
    id: 'CT-02',
    name: 'AICC 옥상 냉각탑 #2',
    location: '옥상',
    zone: 'A구역',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '31°C',
    category: 'coolingTower',
    realImageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
    rois: DefaultROIAreas['CT-01'], // 동일한 ROI 구조
  },
  {
    id: 'CT-03',
    name: '관제탑 냉각탑',
    location: '관제탑 옥상',
    zone: 'B구역',
    type: 'fixed',
    status: 'warning',
    aiStatus: 'd',
    value: '36°C',
    category: 'coolingTower',
    realImageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
    rois: DefaultROIAreas['CT-01'],
  },

  // =========== 팬류/공조기 (fan) ===========
  {
    id: 'AHU-01',
    name: '관제탑 공조기 #1',
    location: '관제탑 기계실',
    zone: 'B구역',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '2,400 CMH',
    category: 'fan',
    realImageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800',
    rois: DefaultROIAreas['AHU-01'],
  },
  {
    id: 'AHU-02',
    name: '관제탑 공조기 #2',
    location: '관제탑 기계실',
    zone: 'B구역',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '2,200 CMH',
    category: 'fan',
    realImageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800',
    rois: DefaultROIAreas['AHU-01'],
  },
  {
    id: 'AHU-03',
    name: '공항청사 AHU',
    location: '청사 기계실',
    zone: 'C구역',
    type: 'fixed',
    status: 'normal',
    aiStatus: 'n',
    value: '3,600 CMH',
    category: 'fan',
    realImageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800',
    rois: DefaultROIAreas['AHU-01'],
  },
];

// ============================================================================
// 다이어그램 매핑 (카메라 ID -> 다이어그램 컴포넌트 이름)
// ============================================================================
export const DiagramMapping: Record<string, string> = {
  'CAM-01': 'CAM01Diagram',
  'CAM-02': 'CAM02Diagram',
  'CAM-03': 'CAM03Diagram',
  'CAM-05': 'CAM05Diagram',
  'CAM-06': 'CAM06Diagram',
  'CAM-07': 'CAM07Diagram',
  'PTZ-01': 'PTZ01Diagram',
  'PTZ-04': 'PTZ04Diagram',
  'PTZ-07': 'PTZ07Diagram',
  'CT-01': 'CoolingTowerDiagram',
  'CT-02': 'CoolingTowerDiagram',
  'CT-03': 'CoolingTowerDiagram',
  'AHU-01': 'FanAHUDiagram',
  'AHU-02': 'FanAHUDiagram',
  'AHU-03': 'FanAHUDiagram',
};

// ============================================================================
// 장비 카테고리 정의
// ============================================================================
export const EquipmentCategories = {
  chiller: {
    id: 'chiller',
    name: '스크류냉동기',
    nameEn: 'Screw Chiller',
    icon: 'snowflake',
    color: CategoryColors.chiller,
    description: '냉수 생산 및 공급을 담당하는 핵심 냉동 설비',
  },
  coolingTower: {
    id: 'coolingTower',
    name: '냉각탑',
    nameEn: 'Cooling Tower',
    icon: 'tower',
    color: CategoryColors.coolingTower,
    description: '냉각수를 대기 중으로 열을 방출하여 냉각하는 설비',
  },
  fan: {
    id: 'fan',
    name: '팬류/공조기',
    nameEn: 'AHU/Fan',
    icon: 'fan',
    color: CategoryColors.fan,
    description: '공기를 조절하여 실내 환경을 쾌적하게 유지하는 설비',
  },
} as const;

// ============================================================================
// 구역 정의
// ============================================================================
export const Zones = [
  { id: 'A', name: 'A구역', location: 'AICC 본관', building: 'AICC' },
  { id: 'B', name: 'B구역', location: '관제탑', building: '관제탑' },
  { id: 'C', name: 'C구역', location: '공항청사', building: '청사' },
  { id: 'D', name: 'D구역', location: '화물터미널', building: '화물' },
] as const;

// ============================================================================
// AI 알림 메시지 템플릿
// ============================================================================
export const AiAlertMessages = {
  normal: {
    chiller: 'AI: 냉동기 운전 정상',
    coolingTower: 'AI: 냉각탑 정상 운전',
    fan: 'AI: 공조기 정상 운전',
    valve: 'AI: 밸브 정상개방',
    pipe: 'AI: 배관 전체 정상',
  },
  warning: {
    temperature: 'AI: 온도 상승 주의',
    pressure: 'AI: 압력 임계값 근접',
    vibration: 'AI: 진동 이상 감지',
    valve: 'AI: 밸브 부분개방 경고',
    flow: 'AI: 유량 변동 감지',
  },
  danger: {
    temperature: 'AI: 온도 급상승! 긴급대응',
    pressure: 'AI: 압력 임계초과!',
    thermal: 'AI: 열화상 이상 감지',
    leak: 'AI: 누수 가능성 감지',
    failure: 'AI: 장비 이상 감지',
  },
} as const;

// ============================================================================
// 임계값 기본 설정
// ============================================================================
export const DefaultThresholds = {
  temperature: {
    chiller: { min: 5, max: 12, unit: '°C' },
    coolingTower: { min: 28, max: 38, unit: '°C' },
    pipe: { min: 40, max: 55, unit: '°C' },
  },
  pressure: {
    low: { min: 2.0, max: 3.5, unit: 'bar' },
    high: { min: 3.5, max: 4.5, unit: 'bar' },
    critical: { min: 4.5, max: 5.0, unit: 'bar' },
  },
  vibration: {
    normal: { min: 0, max: 0.5, unit: 'mm' },
    warning: { min: 0.5, max: 1.0, unit: 'mm' },
    danger: { min: 1.0, max: 2.0, unit: 'mm' },
  },
  power: {
    voltage: { min: -5, max: 5, unit: '%' },      // 전압 변동률
    current: { min: 0, max: 100, unit: 'A' },     // 정격 전류
    frequency: { min: 59.5, max: 60.5, unit: 'Hz' },
  },
} as const;

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * 카메라 ID로 기본 카메라 설정 조회
 */
export const getCameraById = (id: string): CctvCamera | undefined => {
  return DefaultCctvCameras.find(camera => camera.id === id);
};

/**
 * 카테고리별 카메라 목록 조회
 */
export const getCamerasByCategory = (category: CameraCategory): CctvCamera[] => {
  if (category === 'all') return DefaultCctvCameras;
  return DefaultCctvCameras.filter(camera => camera.category === category);
};

/**
 * 구역별 카메라 목록 조회
 */
export const getCamerasByZone = (zone: string): CctvCamera[] => {
  return DefaultCctvCameras.filter(camera => camera.zone === zone);
};

/**
 * 상태별 카메라 목록 조회
 */
export const getCamerasByStatus = (status: CameraStatus): CctvCamera[] => {
  return DefaultCctvCameras.filter(camera => camera.status === status);
};

/**
 * 카메라 ID로 ROI 영역 조회
 */
export const getROIsByCameraId = (id: string): CameraROI[] => {
  return DefaultROIAreas[id] || [];
};

/**
 * 다이어그램 컴포넌트 이름 조회
 */
export const getDiagramName = (cameraId: string): string => {
  return DiagramMapping[cameraId] || 'CAM01Diagram';
};

export default {
  StatusColors,
  AiStatusColors,
  CategoryColors,
  DefaultROIAreas,
  DefaultCctvCameras,
  DiagramMapping,
  EquipmentCategories,
  Zones,
  AiAlertMessages,
  DefaultThresholds,
  getCameraById,
  getCamerasByCategory,
  getCamerasByZone,
  getCamerasByStatus,
  getROIsByCameraId,
  getDiagramName,
};
