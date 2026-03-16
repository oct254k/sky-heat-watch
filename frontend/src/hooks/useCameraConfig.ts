import { useState, useEffect, useCallback } from 'react';
import type { CctvCamera, CameraROI } from '@/components/CctvGrid/CctvCard';
import { DEFAULT_CAMERAS } from '@/components/CctvGrid/CctvGrid';

// LocalStorage 키 (AdminSettingsPanel과 동일)
const STORAGE_KEY = 'heatSourceCameraConfig';

// 저장된 설정 타입
interface SavedCameraConfig {
  id: string;
  name: string;
  building: string;
  equipment: string;
  customImage?: string | null;
  rois: CameraROI[];
  thresholds?: {
    tempWarning: number;
    tempDanger: number;
    vibrationWarning: number;
    vibrationDanger: number;
  };
}

interface ConfigData {
  cameras: SavedCameraConfig[];
  globalSettings: {
    aiDetectionEnabled: boolean;
    alertSoundEnabled: boolean;
    autoSaveInterval: number;
  };
  lastUpdated: string | null;
}

/**
 * 저장된 카메라 설정을 불러와 기본 카메라 데이터와 병합하는 훅
 */
export const useCameraConfig = () => {
  const [cameras, setCameras] = useState<CctvCamera[]>(DEFAULT_CAMERAS);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // 설정 불러오기
  const loadConfig = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      console.log('[useCameraConfig] localStorage 데이터:', saved ? '있음' : '없음');

      if (saved) {
        const parsed = JSON.parse(saved) as ConfigData;
        console.log('[useCameraConfig] 파싱된 카메라 수:', parsed.cameras.length);

        // 기본 카메라 데이터와 저장된 설정 병합
        const mergedCameras = DEFAULT_CAMERAS.map(defaultCam => {
          const savedCam = parsed.cameras.find(c => c.id === defaultCam.id);
          if (savedCam) {
            const hasCustomImage = !!savedCam.customImage;
            const hasRois = savedCam.rois?.length > 0;
            if (hasCustomImage || hasRois) {
              console.log(`[useCameraConfig] ${savedCam.id}: 커스텀이미지=${hasCustomImage}, ROI=${hasRois ? savedCam.rois.length : 0}개`);
            }
            return {
              ...defaultCam,
              customImage: savedCam.customImage,
              rois: savedCam.rois || [],
            };
          }
          return defaultCam;
        });

        setCameras(mergedCameras);
        setLastUpdated(parsed.lastUpdated);
      }
    } catch (e) {
      console.warn('카메라 설정 불러오기 실패:', e);
    }
  }, []);

  // 초기 로드 및 storage 이벤트 감지
  useEffect(() => {
    loadConfig();

    // 다른 탭/창에서 저장 시 감지
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadConfig();
      }
    };

    // 같은 탭에서 저장 시 감지 (커스텀 이벤트)
    const handleConfigUpdate = () => {
      loadConfig();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cameraConfigUpdated', handleConfigUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cameraConfigUpdated', handleConfigUpdate);
    };
  }, [loadConfig]);

  return {
    cameras,
    lastUpdated,
    reload: loadConfig,
  };
};

export default useCameraConfig;
