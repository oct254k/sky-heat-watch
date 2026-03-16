import React from 'react';
import { ValveCard } from './ValveCard';
import './ValveCard.css';

/** 밸브 데이터 타입 */
export interface ValveData {
  id: string;
  angle: number;
  status: 'ok' | 'warn';
  statusText: string;
  zone: string;
  cameraId: string;
}

export interface ValveGridProps {
  /** 밸브 데이터 배열 */
  valves: ValveData[];
  /** 그리드 제목 (선택사항) */
  title?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 밸브 카드 클릭 핸들러 */
  onValveClick?: (valve: ValveData) => void;
}

/** 기본 밸브 데이터 (4개) */
export const DEFAULT_VALVES: ValveData[] = [
  {
    id: '밸브 #1',
    angle: 90,
    status: 'ok',
    statusText: '완전개방',
    zone: 'C구역',
    cameraId: 'CAM-06'
  },
  {
    id: '밸브 #2',
    angle: 90,
    status: 'ok',
    statusText: '완전개방',
    zone: 'A구역',
    cameraId: 'CAM-02'
  },
  {
    id: '밸브 #3',
    angle: 45,
    status: 'warn',
    statusText: '부분개방',
    zone: 'B구역',
    cameraId: 'CAM-04'
  },
  {
    id: '밸브 #4',
    angle: 90,
    status: 'ok',
    statusText: '완전개방',
    zone: 'D구역',
    cameraId: 'CAM-08'
  }
];

/**
 * 밸브 그리드 컴포넌트
 *
 * 여러 개의 밸브 카드를 4열 그리드로 배치합니다.
 *
 * @example
 * ```tsx
 * // 기본 밸브 데이터 사용
 * <ValveGrid valves={DEFAULT_VALVES} title="밸브 모니터링" />
 *
 * // 커스텀 밸브 데이터 사용
 * <ValveGrid
 *   valves={myValveData}
 *   onValveClick={(valve) => console.log(valve)}
 * />
 * ```
 */
export const ValveGrid: React.FC<ValveGridProps> = ({
  valves,
  title,
  className = '',
  onValveClick
}) => {
  return (
    <div className={className}>
      {title && <h3 className="section-title">{title}</h3>}
      <div className="valve-grid">
        {valves.map((valve, index) => (
          <ValveCard
            key={`${valve.id}-${index}`}
            id={valve.id}
            angle={valve.angle}
            status={valve.status}
            statusText={valve.statusText}
            zone={valve.zone}
            cameraId={valve.cameraId}
            onClick={() => onValveClick?.(valve)}
          />
        ))}
      </div>
    </div>
  );
};

export default ValveGrid;
