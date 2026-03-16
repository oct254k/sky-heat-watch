import React from 'react';
import type { SensorStatus } from './SensorCard';
import { SensorCard } from './SensorCard';
import './SensorGrid.css';

export interface SensorData {
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
}

export interface SensorGridProps {
  /** Array of sensor data */
  sensors: SensorData[];
  /** Optional title for the grid section */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Optional click handler for individual sensors */
  onSensorClick?: (sensorId: string) => void;
}

/**
 * Default sensor data for demo purposes (12 sensors - 2 rows x 6 columns)
 */
export const defaultSensorData: SensorData[] = [
  { id: 'TEMP-01', location: 'A구역 · 배관 #1', temperature: 42.3, displacement: 0.08, status: 'ok' },
  { id: 'TEMP-02', location: 'A구역 · 배관 #2', temperature: 43.1, displacement: 0.07, status: 'ok' },
  { id: 'TEMP-03', location: 'A구역 · 배관 #3', temperature: 44.5, displacement: 0.12, status: 'ok' },
  { id: 'TEMP-04', location: 'A구역 · 배관 #4', temperature: 45.2, displacement: 0.11, status: 'ok' },
  { id: 'TEMP-05', location: 'B구역 · 배관 #5', temperature: 52.8, displacement: 0.23, status: 'warn' },
  { id: 'TEMP-06', location: 'B구역 · 배관 #6', temperature: 51.2, displacement: 0.19, status: 'ok' },
  { id: 'TEMP-07', location: 'B구역 · 배관 #7', temperature: 49.7, displacement: 0.15, status: 'warn', nearThreshold: true },
  { id: 'TEMP-08', location: 'B구역 · 배관 #8', temperature: 48.3, displacement: 0.14, status: 'ok' },
  { id: 'TEMP-09', location: 'C구역 · 분기배관 #1', temperature: 38.4, displacement: 0, status: 'ok', noDisplacement: true },
  { id: 'TEMP-10', location: 'C구역 · 분기배관 #2', temperature: 39.1, displacement: 0, status: 'ok', noDisplacement: true },
  { id: 'TEMP-11', location: 'D구역 · 분기배관 #3', temperature: 40.2, displacement: 0, status: 'ok', noDisplacement: true },
  { id: 'TEMP-12', location: 'D구역 · 분기배관 #4', temperature: 41.5, displacement: 0, status: 'ok', noDisplacement: true },
];

/**
 * Thermometer icon SVG component
 */
const ThermometerIcon: React.FC = () => (
  <svg viewBox="0 0 24 24">
    <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" />
  </svg>
);

/**
 * SensorGrid Component
 *
 * Displays a grid of sensor cards showing temperature and displacement data.
 * Based on the design from index_original.html lines 1815-1831.
 *
 * Layout: 6 columns with 8px gap
 */
export const SensorGrid: React.FC<SensorGridProps> = ({
  sensors = defaultSensorData,
  title = '센서 데이터 요약',
  subtitle = 'IoT 온도센서 12ea · 변위 측정 4구간 8배관',
  onSensorClick,
}) => {
  return (
    <div className="card">
      <div className="card-hd">
        <div
          className="card-icon"
          style={{
            background: 'var(--iafc-blue-lt)',
            color: 'var(--iafc-blue)'
          }}
        >
          <ThermometerIcon />
        </div>
        <h3>{title}</h3>
        <span className="sub">{subtitle}</span>
      </div>
      <div className="sensor-grid">
        {sensors.map((sensor) => (
          <SensorCard
            key={sensor.id}
            id={sensor.id}
            location={sensor.location}
            temperature={sensor.temperature}
            displacement={sensor.displacement}
            status={sensor.status}
            noDisplacement={sensor.noDisplacement}
            nearThreshold={sensor.nearThreshold}
            onClick={onSensorClick ? () => onSensorClick(sensor.id) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default SensorGrid;
