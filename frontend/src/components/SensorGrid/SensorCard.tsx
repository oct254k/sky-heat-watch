import React from 'react';
import './SensorGrid.css';

export type SensorStatus = 'ok' | 'warn' | 'danger';

export interface SensorCardProps {
  /** Sensor ID (e.g., TEMP-01) */
  id: string;
  /** Location description (e.g., A구역 · 배관 #1) */
  location: string;
  /** Temperature value in Celsius */
  temperature: number;
  /** Displacement value in mm */
  displacement: number;
  /** Sensor status */
  status: SensorStatus;
  /** Optional: Show displacement as "변위없음" when no displacement */
  noDisplacement?: boolean;
  /** Optional: Show warning badge near location */
  nearThreshold?: boolean;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * Get displacement display color based on value
 */
const getDisplacementColor = (displacement: number): string => {
  if (displacement >= 0.20) return 'var(--danger)';
  if (displacement >= 0.12) return 'var(--warn)';
  if (displacement > 0) return 'var(--ok)';
  return 'var(--txt3)';
};

/**
 * Get status class for card styling
 */
const getStatusClass = (status: SensorStatus): string => {
  if (status === 'warn') return 'warn';
  if (status === 'danger') return 'danger';
  return '';
};

/**
 * SensorCard Component
 *
 * Displays individual sensor data with temperature and displacement values.
 * Based on the design from index_original.html lines 1815-1831.
 *
 * Structure:
 * ┌───────────────────────┐
 * │ ● TEMP-01             │  <- .sc-id (dot + ID)
 * │ A구역 · 배관 #1       │  <- .sc-loc
 * │ 42.3°C                │  <- .sc-temp
 * │ ↕ 0.08mm              │  <- .sc-disp
 * └───────────────────────┘
 */
export const SensorCard: React.FC<SensorCardProps> = ({
  id,
  location,
  temperature,
  displacement,
  status,
  noDisplacement = false,
  nearThreshold = false,
  onClick,
}) => {
  const statusClass = getStatusClass(status);
  const dotColor = status === 'warn' ? 'var(--warn)'
                 : status === 'danger' ? 'var(--danger)'
                 : 'var(--ok)';
  const tempColor = status === 'warn' || status === 'danger'
                  ? `var(--${status})`
                  : undefined;
  const dispColor = noDisplacement
                  ? 'var(--txt3)'
                  : getDisplacementColor(displacement);

  return (
    <div
      className={`sc ${statusClass}`.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="sc-id">
        <span className="sc-dot" style={{ background: dotColor }} />
        {id}
      </div>
      <div className="sc-loc">
        {location}
        {nearThreshold && (
          <b className="sc-threshold-badge">근접</b>
        )}
      </div>
      <div className="sc-temp" style={tempColor ? { color: tempColor } : undefined}>
        {temperature.toFixed(1)}
        <span className="sc-unit">°C</span>
      </div>
      <div className="sc-disp" style={{ color: dispColor }}>
        {noDisplacement
          ? '— 변위없음'
          : `↕ ${displacement.toFixed(2)}mm`
        }
      </div>
    </div>
  );
};

export default SensorCard;
