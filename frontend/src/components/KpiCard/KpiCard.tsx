import React from 'react';
import './KpiCard.css';

export type KpiStatus = 'ok' | 'warn' | 'danger';
export type KpiColor = 'iafc-green' | 'iafc-blue' | 'iafc-yellow' | 'ok' | 'warn' | 'danger';

export interface KpiCardProps {
  /** KPI title/name */
  title: string;
  /** Main value (e.g., "14/14", "4 구간") */
  value: string;
  /** Unit or secondary part of value */
  valueUnit?: string;
  /** Sub description text */
  sub: string;
  /** Status for the tag badge */
  status: KpiStatus;
  /** Status text displayed in tag */
  statusText: string;
  /** Color theme for the card */
  color: KpiColor;
  /** Icon SVG element */
  icon: React.ReactNode;
}

/**
 * Get CSS variable name for color
 */
const getColorVar = (color: KpiColor): string => {
  const colorMap: Record<KpiColor, string> = {
    'iafc-green': 'var(--iafc-green)',
    'iafc-blue': 'var(--iafc-blue)',
    'iafc-yellow': 'var(--iafc-yellow)',
    'ok': 'var(--ok)',
    'warn': 'var(--warn)',
    'danger': 'var(--danger)',
  };
  return colorMap[color];
};

/**
 * Get light background CSS variable name for color
 */
const getColorLtVar = (color: KpiColor): string => {
  const colorMap: Record<KpiColor, string> = {
    'iafc-green': 'var(--iafc-green-lt)',
    'iafc-blue': 'var(--iafc-blue-lt)',
    'iafc-yellow': 'var(--iafc-yellow-lt)',
    'ok': 'var(--ok-lt)',
    'warn': 'var(--warn-lt)',
    'danger': 'var(--danger-lt)',
  };
  return colorMap[color];
};

/**
 * Get tag class based on status
 */
const getTagClass = (status: KpiStatus): string => {
  const statusMap: Record<KpiStatus, string> = {
    ok: 'tag-ok',
    warn: 'tag-warn',
    danger: 'tag-danger',
  };
  return statusMap[status];
};

/**
 * Get status indicator symbol
 */
const getStatusIndicator = (status: KpiStatus): string => {
  const indicatorMap: Record<KpiStatus, string> = {
    ok: '\●', // Filled circle
    warn: '\▲', // Triangle up
    danger: '\●', // Filled circle
  };
  return indicatorMap[status];
};

/**
 * KpiCard Component
 *
 * Displays a single KPI metric card with icon, value, description and status tag.
 * Based on the design from index_original.html lines 1096-1152.
 */
export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  valueUnit,
  sub,
  status,
  statusText,
  color,
  icon,
}) => {
  const colorVar = getColorVar(color);
  const colorLtVar = getColorLtVar(color);
  const tagClass = getTagClass(status);
  const statusIndicator = getStatusIndicator(status);

  return (
    <div
      className="kpi"
      style={{ '--kc': colorVar } as React.CSSProperties}
    >
      <div
        className="kpi-icon"
        style={{
          background: colorLtVar,
          color: colorVar
        }}
      >
        {icon}
      </div>
      <div className="kpi-info">
        <div className="kpi-name">{title}</div>
        <div className="kpi-num" style={{ color: colorVar }}>
          {value}
          {valueUnit && <span className="kpi-num-unit">{valueUnit}</span>}
        </div>
        <div className="kpi-sub">{sub}</div>
        <div className={`tag ${tagClass}`}>
          {statusIndicator} {statusText}
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
