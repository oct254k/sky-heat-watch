import React from 'react';
import type { AlarmLevel } from './AlarmItem';
import { AlarmItem } from './AlarmItem';
import './AlarmPanel.css';

export interface AlarmData {
  /** Unique alarm ID */
  id: string;
  /** Alarm severity level */
  level: AlarmLevel;
  /** Display text for the level */
  levelText: string;
  /** Relative time string */
  time: string;
  /** Alarm title/message */
  title: string;
  /** Alarm description */
  desc: string;
  /** Current value (optional) */
  current?: string;
  /** Threshold value (optional) */
  threshold?: string;
  /** Whether this is a new alarm */
  isNew?: boolean;
}

export interface AlarmPanelProps {
  /** Array of alarm data */
  alarms: AlarmData[];
  /** Panel title (default: "실시간 알람") */
  title?: string;
  /** Maximum height for the panel */
  maxHeight?: string;
  /** Handler when an alarm is clicked */
  onAlarmClick?: (alarm: AlarmData) => void;
}

/**
 * Default alarm data for demonstration
 */
export const defaultAlarms: AlarmData[] = [
  {
    id: 'alarm-1',
    level: 'danger',
    levelText: '긴급',
    time: '2분 전',
    title: 'A구역 구간2 배관#3 변위 임계값 초과',
    desc: 'CAM-02 구간2',
    current: '0.52mm',
    threshold: '0.50mm',
    isNew: true,
  },
  {
    id: 'alarm-2',
    level: 'danger',
    levelText: '긴급',
    time: '5분 전',
    title: 'B구역 온도 급상승 감지',
    desc: 'TEMP-07',
    current: '68°C',
    threshold: '65°C',
  },
  {
    id: 'alarm-3',
    level: 'warn',
    levelText: '경고',
    time: '8분 전',
    title: 'C구역 밸브 #12 응답 지연',
    desc: 'VALVE-12 C구역',
    current: '3.2초',
    threshold: '2.0초',
  },
  {
    id: 'alarm-4',
    level: 'warn',
    levelText: '경고',
    time: '12분 전',
    title: 'D구역 압력 센서 불안정',
    desc: 'PRESS-04',
    current: '4.8bar',
    threshold: '5.0bar',
  },
  {
    id: 'alarm-5',
    level: 'info',
    levelText: '정보',
    time: '15분 전',
    title: 'A구역 정기 점검 시작',
    desc: 'CAM-01 ~ CAM-04',
  },
];

/**
 * AlarmPanel Component
 *
 * Displays a real-time alarm panel with severity-based styling.
 * Shows a list of alarms sorted by urgency and time.
 */
export const AlarmPanel: React.FC<AlarmPanelProps> = ({
  alarms,
  title = '실시간 알람',
  maxHeight,
  onAlarmClick,
}) => {
  const alarmCount = alarms.length;

  return (
    <div
      className="alarm-panel"
      style={maxHeight ? { maxHeight } : undefined}
    >
      {/* Header */}
      <div className="alarm-panel-header">
        <div className="alarm-panel-title">
          <span className="alarm-panel-title-icon">⚠</span>
          <span>{title}</span>
        </div>
        <span className="alarm-panel-badge">{alarmCount}</span>
      </div>

      {/* Alarm List */}
      <div className="alarm-panel-list">
        {alarms.length > 0 ? (
          alarms.map((alarm) => (
            <AlarmItem
              key={alarm.id}
              level={alarm.level}
              levelText={alarm.levelText}
              time={alarm.time}
              title={alarm.title}
              desc={alarm.desc}
              current={alarm.current}
              threshold={alarm.threshold}
              isNew={alarm.isNew}
              onClick={() => onAlarmClick?.(alarm)}
            />
          ))
        ) : (
          <div className="alarm-panel-empty">
            <div className="alarm-panel-empty-icon">✓</div>
            <div className="alarm-panel-empty-text">알람이 없습니다</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlarmPanel;
