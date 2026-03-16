import { useState, useEffect, useCallback } from 'react';
import type { CctvCamera, CameraROI } from '@/components/CctvGrid/CctvCard';
import { DEFAULT_CAMERAS } from '@/components/CctvGrid/CctvGrid';
import defaultConfig from '@/config/cameraConfig.json';

// LocalStorage 키 (AdminSettingsPanel과 동일)
const STORAGE_KEY = 'heatSourceCameraConfig';

// cameraConfig.json의 기본 이미지/ROI를 DEFAULT_CAMERAS와 병합
const getDefaultCamerasWithConfig = (): CctvCamera[] => {
  return DEFAULT_CAMERAS.map(cam => {
    const configCam = defaultConfig.cameras.find(c => c.id === cam.id);
    if (configCam) {
      return {
        ...cam,
        customImage: configCam.customImage || undefined,
        rois: configCam.rois || [],
      };
    }
    return cam;
  });
};

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
 * cameraConfig.json의 이미지/ROI를 기본값으로 사용
 */
export const useCameraConfig = () => {
  // cameraConfig.json의 기본 이미지/ROI가 포함된 카메라 데이터
  const defaultCamerasWithConfig = getDefaultCamerasWithConfig();
  const [cameras, setCameras] = useState<CctvCamera[]>(defaultCamerasWithConfig);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // 설정 불러오기 (localStorage가 있으면 추가 병합)
  const loadConfig = useCallback(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      console.log('[useCameraConfig] localStorage 데이터:', saved ? '있음' : '없음');
      console.log('[useCameraConfig] cameraConfig.json 기본값 적용됨');

      // 기본값: cameraConfig.json의 이미지/ROI
      const baseCameras = getDefaultCamerasWithConfig();

      if (saved) {
        const parsed = JSON.parse(saved) as ConfigData;
        console.log('[useCameraConfig] 파싱된 카메라 수:', parsed.cameras.length);

        // localStorage 설정이 있으면 추가 병합 (localStorage가 cameraConfig.json보다 우선)
        const mergedCameras = baseCameras.map(baseCam => {
          const savedCam = parsed.cameras.find(c => c.id === baseCam.id);
          if (savedCam && savedCam.customImage) {
            // localStorage에 커스텀 이미지가 있으면 그것을 사용
            console.log(`[useCameraConfig] ${savedCam.id}: localStorage 커스텀이미지 사용`);
            return {
              ...baseCam,
              customImage: savedCam.customImage,
              rois: savedCam.rois || baseCam.rois || [],
            };
          }
          // localStorage에 없으면 cameraConfig.json 기본값 사용
          return baseCam;
        });

        setCameras(mergedCameras);
        setLastUpdated(parsed.lastUpdated);
      } else {
        // localStorage가 없으면 cameraConfig.json 기본값만 사용
        setCameras(baseCameras);
      }
    } catch (e) {
      console.warn('카메라 설정 불러오기 실패:', e);
      // 오류 시에도 cameraConfig.json 기본값 사용
      setCameras(getDefaultCamerasWithConfig());
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
