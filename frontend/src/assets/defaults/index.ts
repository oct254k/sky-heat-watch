/**
 * Default Assets Index
 *
 * CCTV, 장비 도면, ROI 영역의 기본값 모듈 진입점
 */

export {
  // 색상 정의
  StatusColors,
  AiStatusColors,
  CategoryColors,

  // ROI 영역 정의
  DefaultROIAreas,

  // 기본 CCTV 카메라 설정
  DefaultCctvCameras,

  // 다이어그램 매핑
  DiagramMapping,

  // 장비 카테고리
  EquipmentCategories,

  // 구역 정의
  Zones,

  // AI 알림 메시지
  AiAlertMessages,

  // 임계값 설정
  DefaultThresholds,

  // 유틸리티 함수
  getCameraById,
  getCamerasByCategory,
  getCamerasByZone,
  getCamerasByStatus,
  getROIsByCameraId,
  getDiagramName,

  // 기본 export
  default as DefaultAssets,
} from './DefaultAssets';
