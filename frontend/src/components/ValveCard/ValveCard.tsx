import React from 'react';
import { ValveDial } from '../Diagrams/ValveDial';
import './ValveCard.css';

export interface ValveCardProps {
  /** 밸브 ID (예: "밸브 #1") */
  id: string;
  /** 밸브 개방 각도 (0-90도) */
  angle: number;
  /** 밸브 상태 ('ok' = 정상/완전개방, 'warn' = 경고/부분개방) */
  status: 'ok' | 'warn';
  /** 상태 텍스트 (예: "완전개방", "부분개방") */
  statusText: string;
  /** 구역 정보 (예: "C구역") */
  zone: string;
  /** 연결된 카메라 ID (예: "CAM-06") */
  cameraId: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 카드 클릭 핸들러 */
  onClick?: () => void;
}

/**
 * 밸브 상태 카드 컴포넌트
 *
 * 밸브의 현재 상태, 개방 각도, 연결된 카메라 정보를 표시합니다.
 *
 * @example
 * ```tsx
 * <ValveCard
 *   id="밸브 #1"
 *   angle={90}
 *   status="ok"
 *   statusText="완전개방"
 *   zone="C구역"
 *   cameraId="CAM-06"
 * />
 * ```
 */
export const ValveCard: React.FC<ValveCardProps> = ({
  id,
  angle,
  status,
  statusText,
  zone,
  cameraId,
  className = '',
  onClick
}) => {
  const cardClassName = `vc ${status === 'warn' ? 'partial' : ''} ${className}`.trim();

  return (
    <div className={cardClassName} onClick={onClick}>
      {/* 헤더: 밸브 이름 + 상태 배지 */}
      <div className="vc-hd">
        <span className="vc-name">{id}</span>
        <span className={`vc-status ${status}`}>{statusText}</span>
      </div>

      {/* 바디: 다이얼 게이지 + 정보 */}
      <div className="vc-bd">
        {/* 다이얼 게이지 */}
        <div className="vc-dial">
          <ValveDial angle={angle} status={status} size={68} />
        </div>

        {/* 개방 각도 */}
        <span className="vc-angle">개방각 {angle}°</span>

        {/* 구역 및 카메라 정보 */}
        <span className="vc-cam">{zone} · {cameraId}</span>
      </div>
    </div>
  );
};

export default ValveCard;
