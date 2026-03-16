import React from 'react';

interface ValveDialProps {
  angle: number; // 0-90
  status: 'ok' | 'warn';
  className?: string;
  size?: number;
}

/**
 * 밸브 다이얼 게이지 컴포넌트
 * @param angle - 밸브 개방 각도 (0-90도)
 * @param status - 상태 ('ok' = 정상, 'warn' = 경고)
 * @param className - 추가 CSS 클래스
 * @param size - 게이지 크기 (기본 68px)
 */
export const ValveDial: React.FC<ValveDialProps> = ({
  angle,
  status,
  className,
  size = 68
}) => {
  // 각도를 stroke-dasharray 값으로 변환 (0-90도 -> 0-82 비율)
  const circumference = 163; // 원의 둘레 (2 * PI * 26)
  const maxDash = 82; // 90도일 때 최대 dash 길이
  const dashLength = (angle / 90) * maxDash;

  // 상태에 따른 색상
  const colors = {
    ok: {
      track: '#E2E7EE',
      progress: '#059669'
    },
    warn: {
      track: '#FCD34D',
      progress: '#D97706'
    }
  };

  const { track, progress } = colors[status];

  return (
    <svg
      viewBox="0 0 68 68"
      width={size}
      height={size}
      className={className}
    >
      {/* 배경 트랙 */}
      <circle
        cx="34"
        cy="34"
        r="26"
        fill="none"
        stroke={track}
        strokeWidth="4"
      />
      {/* 진행 표시 */}
      <circle
        cx="34"
        cy="34"
        r="26"
        fill="none"
        stroke={progress}
        strokeWidth="4"
        strokeDasharray={`${dashLength} ${circumference}`}
        strokeDashoffset="41"
        strokeLinecap="round"
        style={{
          transition: 'stroke-dasharray 0.3s ease-in-out'
        }}
      />
    </svg>
  );
};

// 프리셋 컴포넌트들

/**
 * 완전개방 (90도) - 정상 상태 프리셋
 */
export const ValveDialFullOpen: React.FC<{ className?: string; size?: number }> = (props) => (
  <ValveDial angle={90} status="ok" {...props} />
);

/**
 * 부분개방 (45도) - 경고 상태 프리셋
 */
export const ValveDialPartialOpen: React.FC<{ className?: string; size?: number }> = (props) => (
  <ValveDial angle={45} status="warn" {...props} />
);

export default ValveDial;
