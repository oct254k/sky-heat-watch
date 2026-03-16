import React from 'react';
import './CctvCard.css';

export type CameraType = 'fixed' | 'ptz';
export type CameraStatus = 'normal' | 'warning' | 'danger';
export type AiStatus = 'n' | 'd';
// 열원사업소 카메라 분류: 냉동기, 냉각탑, 팬류/공조기
export type CameraCategory = 'all' | 'chiller' | 'coolingTower' | 'fan';

// ROI (관심영역) 타입
export interface CameraROI {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface CctvCamera {
  id: string;
  name: string;
  location: string;
  zone: string;
  type: CameraType;
  status: CameraStatus;
  aiStatus: AiStatus;
  value?: string;
  category: CameraCategory;
  realImageUrl?: string;
  customImage?: string | null;  // 관리자가 업로드한 이미지
  rois?: CameraROI[];           // 관심영역 목록
}

export interface CctvCardProps {
  camera: CctvCamera;
  diagram: React.ReactNode;
  showDiagram: boolean;
  onClick?: () => void;
  onDoubleClick?: () => void;
}

/**
 * CCTV Card Component
 * Displays a single CCTV camera feed with diagram or real image view
 */
export const CctvCard: React.FC<CctvCardProps> = ({
  camera,
  diagram,
  showDiagram,
  onClick,
  onDoubleClick,
}) => {
  const {
    id,
    name,
    location,
    zone,
    type,
    status,
    aiStatus,
    value,
    realImageUrl,
    customImage,
    rois = [],
  } = camera;

  // Determine CSS classes based on camera status
  const camClasses = [
    'cam',
    status === 'danger' ? 'alert-cam' : '',
  ].filter(Boolean).join(' ');

  // 카메라 타입/상태에 따른 배경 클래스
  const getBgClass = () => {
    if (status === 'danger') return 'cam-bg3';
    if (type === 'ptz' || zone === '관제탑') return 'cam-bg2';
    return 'cam-bg1';
  };

  // Get type label in Korean
  const getTypeLabel = () => {
    return type === 'fixed' ? '고정형' : 'PTZ';
  };

  // Get live status class
  const getLiveClass = () => {
    return status === 'danger' ? 'al' : 'ok';
  };

  // 열원사업소 장비 이미지 URL (관리자 모드에서 업로드한 이미지 우선)
  const getDefaultRealImage = () => {
    // 관리자가 업로드한 커스텀 이미지 우선
    if (customImage) {
      console.log(`[CctvCard] ${id}: 커스텀 이미지 사용 (${customImage.substring(0, 50)}...)`);
      return customImage;
    }
    if (realImageUrl) return realImageUrl;

    // 냉동기/냉각탑/팬류 장비 이미지
    const imageUrls: Record<string, string> = {
      // 스크류냉동기 이미지
      'CAM-01': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80&auto=format&fit=crop', // 산업용 냉동기
      'CAM-02': 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80&auto=format&fit=crop',
      'CAM-04': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80&auto=format&fit=crop', // 기계실
      'CAM-05': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80&auto=format&fit=crop',
      'CAM-07': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format&fit=crop', // 공조 설비
      'CAM-08': 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80&auto=format&fit=crop',
      // 냉각탑 이미지
      'CAM-03': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop', // 냉각탑
      // 팬류/공조기 이미지
      'CAM-06': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop', // 환기 설비
    };

    return imageUrls[id] || 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80&auto=format&fit=crop';
  };

  return (
    <div className={camClasses} onClick={onClick} onDoubleClick={onDoubleClick}>
      <div className={`cam-inner ${getBgClass()}`}>
        {/* SVG Diagram View */}
        {showDiagram && (
          <div className="cam-svg cam-svg-diagram">
            {diagram}
          </div>
        )}

        {/* Real Image View */}
        {!showDiagram && (
          <div className="cam-svg cam-svg-real real-cam-wrap">
            <img
              src={getDefaultRealImage()}
              alt={`${id} ${name}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Scan line animation */}
        <div className="cam-scan"></div>

        {/* Grid overlay */}
        <div className="cam-grid"></div>

        {/* AI status badge */}
        <div className={`cam-ai ${aiStatus}`}>AI</div>

        {/* Camera type badge */}
        <div className="cam-type">{getTypeLabel()}</div>

        {/* Value display */}
        {value && (
          <div className={`cam-val ${status === 'warning' ? 'warning' : ''}`}>
            {value}
          </div>
        )}

        {/* ROI 오버레이 (관리자가 설정한 관심영역) */}
        {rois.length > 0 && rois.map(roi => (
          <div
            key={roi.id}
            className="cam-roi"
            style={{
              left: `${roi.x}%`,
              top: `${roi.y}%`,
              width: `${roi.width}%`,
              height: `${roi.height}%`,
              borderColor: roi.color,
            }}
          >
            <span className="cam-roi-label">{roi.name}</span>
          </div>
        ))}
      </div>

      {/* Bottom overlay with camera info */}
      <div className="cam-ov">
        <div>
          <div className="cam-id">{id} {name}</div>
          <div className="cam-loc">{location} · {zone}</div>
        </div>
        <div className={`cam-live ${getLiveClass()}`}>LIVE</div>
      </div>
    </div>
  );
};

export default CctvCard;
