import React from 'react';

export type AlarmLevel = 'danger' | 'warn' | 'info';

export interface AlarmItemProps {
  /** Alarm severity level */
  level: AlarmLevel;
  /** Display text for the level (e.g., "긴급", "경고", "정보") */
  levelText: string;
  /** Relative time string (e.g., "2분 전", "5분 전") */
  time: string;
  /** Alarm title/message */
  title: string;
  /** Alarm description (e.g., device ID, location) */
  desc: string;
  /** Current value (optional) */
  current?: string;
  /** Threshold value (optional) */
  threshold?: string;
  /** Whether this is a new alarm (for animation) */
  isNew?: boolean;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Get the CSS class for alarm item based on level
 */
const getItemClass = (level: AlarmLevel): string => {
  const levelMap: Record<AlarmLevel, string> = {
    danger: 'al-red',
    warn: 'al-orange',
    info: 'al-blue',
  };
  return levelMap[level];
};

/**
 * Get the CSS class for level badge
 */
const getLevelClass = (level: AlarmLevel): string => {
  const levelMap: Record<AlarmLevel, string> = {
    danger: 'al-level-danger',
    warn: 'al-level-warn',
    info: 'al-level-info',
  };
  return levelMap[level];
};

/**
 * AlarmItem Component
 *
 * Displays a single alarm entry with severity indicator, time, title, description, and values.
 */
export const AlarmItem: React.FC<AlarmItemProps> = ({
  level,
  levelText,
  time,
  title,
  desc,
  current,
  threshold,
  isNew = false,
  onClick,
}) => {
  const itemClass = getItemClass(level);
  const levelClass = getLevelClass(level);

  return (
    <div
      className={`al-item ${itemClass}${isNew ? ' al-new' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      {/* Header: Level badge + Time */}
      <div className="al-hd">
        <span className={`al-level ${levelClass}`}>{levelText}</span>
        <span className="al-time">{time}</span>
      </div>

      {/* Title */}
      <div className="al-title">{title}</div>

      {/* Description */}
      <div className="al-desc">{desc}</div>

      {/* Values (if provided) */}
      {(current || threshold) && (
        <div className="al-vals">
          {current && (
            <span className="al-val-item">
              <span className="al-val-label">현재:</span>
              <span className="al-val-value">{current}</span>
            </span>
          )}
          {threshold && (
            <span className="al-val-item">
              <span className="al-val-label">임계:</span>
              <span className="al-val-value">{threshold}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AlarmItem;
