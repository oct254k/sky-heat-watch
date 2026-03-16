/**
 * CorrelationChart - 온도/변위 상관관계 산점도
 * 12개 센서 데이터 포인트와 선형 회귀 추세선 표시
 */
import { useMemo } from 'react';
import type { ChartOptions, ChartData } from 'chart.js';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import './Charts.css';

// Chart.js 컴포넌트 등록
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export interface CorrelationDataPoint {
  temp: number;
  disp: number;
  sensorId?: string;
}

interface CorrelationChartProps {
  data?: CorrelationDataPoint[];
  title?: string;
  showTrendLine?: boolean;
  className?: string;
}

// 기본 12개 센서 데이터
const defaultCorrelationData: CorrelationDataPoint[] = [
  { temp: 42.3, disp: 0.08, sensorId: 'T-01' },
  { temp: 44.8, disp: 0.45, sensorId: 'T-02' },
  { temp: 41.2, disp: 0.05, sensorId: 'T-03' },
  { temp: 46.5, disp: 0.62, sensorId: 'T-04' },
  { temp: 43.1, disp: 0.18, sensorId: 'T-05' },
  { temp: 45.7, disp: 0.55, sensorId: 'T-06' },
  { temp: 40.8, disp: 0.03, sensorId: 'T-07' },
  { temp: 47.2, disp: 0.78, sensorId: 'T-08' },
  { temp: 44.0, disp: 0.32, sensorId: 'T-09' },
  { temp: 42.9, disp: 0.15, sensorId: 'T-10' },
  { temp: 45.3, disp: 0.48, sensorId: 'T-11' },
  { temp: 43.6, disp: 0.25, sensorId: 'T-12' },
];

/**
 * 선형 회귀 계산 (최소제곱법)
 */
function calculateLinearRegression(data: CorrelationDataPoint[]) {
  const n = data.length;
  if (n === 0) return { slope: 0, intercept: 0, r2: 0 };

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (const point of data) {
    sumX += point.temp;
    sumY += point.disp;
    sumXY += point.temp * point.disp;
    sumX2 += point.temp * point.temp;
    sumY2 += point.disp * point.disp;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // R-squared 계산
  const meanY = sumY / n;
  let ssTotal = 0;
  let ssResidual = 0;
  for (const point of data) {
    ssTotal += (point.disp - meanY) ** 2;
    const predicted = slope * point.temp + intercept;
    ssResidual += (point.disp - predicted) ** 2;
  }
  const r2 = ssTotal !== 0 ? 1 - ssResidual / ssTotal : 0;

  return { slope, intercept, r2 };
}

export function CorrelationChart({
  data = defaultCorrelationData,
  title = '온도-변위 상관관계',
  showTrendLine = true,
  className = '',
}: CorrelationChartProps) {
  // CSS 변수에서 색상 가져오기
  const iafcGreen = getComputedStyle(document.documentElement)
    .getPropertyValue('--iafc-green')
    .trim() || '#00AAB5';

  const txt2 = getComputedStyle(document.documentElement)
    .getPropertyValue('--txt2')
    .trim() || '#455060';

  const borderColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--border')
    .trim() || '#E2E7EE';

  // 선형 회귀 계산
  const regression = useMemo(() => calculateLinearRegression(data), [data]);

  // 추세선 데이터 포인트 생성
  const trendLineData = useMemo(() => {
    if (!showTrendLine) return [];
    const temps = data.map((d) => d.temp);
    const minTemp = Math.min(...temps) - 1;
    const maxTemp = Math.max(...temps) + 1;
    return [
      { x: minTemp, y: regression.slope * minTemp + regression.intercept },
      { x: maxTemp, y: regression.slope * maxTemp + regression.intercept },
    ];
  }, [data, regression, showTrendLine]);

  // 차트 데이터 구성 (mixed chart: scatter + line for trendline)
  const chartData = {
    datasets: [
      {
        label: '센서 데이터',
        data: data.map((d) => ({ x: d.temp, y: d.disp })),
        backgroundColor: iafcGreen,
        borderColor: iafcGreen,
        pointRadius: 8,
        pointHoverRadius: 10,
        pointStyle: 'circle' as const,
      },
      ...(showTrendLine
        ? [
            {
              label: `추세선 (R² = ${regression.r2.toFixed(3)})`,
              data: trendLineData,
              type: 'line' as const,
              borderColor: iafcGreen,
              borderWidth: 2,
              borderDash: [5, 5],
              pointRadius: 0,
              fill: false,
              tension: 0,
            },
          ]
        : []),
    ],
  } as ChartData<'scatter'>;

  // 차트 옵션
  const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: txt2,
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 12,
          },
          usePointStyle: true,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(22, 27, 34, 0.95)',
        titleColor: '#E6EDF3',
        bodyColor: '#9BADC0',
        borderColor: borderColor,
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          family: "'Noto Sans KR', sans-serif",
          size: 13,
          weight: 600,
        },
        bodyFont: {
          family: "'Noto Sans KR', sans-serif",
          size: 12,
        },
        callbacks: {
          label: (context) => {
            const dataIndex = context.dataIndex;
            const point = data[dataIndex];
            const sensorId = point?.sensorId || `센서 ${dataIndex + 1}`;
            return [
              `${sensorId}`,
              `온도: ${context.parsed.x?.toFixed(1) ?? ''}°C`,
              `변위: ${context.parsed.y?.toFixed(2) ?? ''}mm`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: '온도 (°C)',
          color: txt2,
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 12,
            weight: 500,
          },
        },
        grid: {
          color: borderColor,
          lineWidth: 1,
        },
        ticks: {
          color: txt2,
          font: {
            family: "'JetBrains Mono', monospace",
            size: 11,
          },
        },
      },
      y: {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: '변위 (mm)',
          color: txt2,
          font: {
            family: "'Noto Sans KR', sans-serif",
            size: 12,
            weight: 500,
          },
        },
        grid: {
          color: borderColor,
          lineWidth: 1,
        },
        ticks: {
          color: txt2,
          font: {
            family: "'JetBrains Mono', monospace",
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className={`chart-container ${className}`}>
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="chart-wrapper">
        <Scatter data={chartData} options={options} />
      </div>
      {showTrendLine && (
        <div className="chart-stats">
          <span className="stat-item">
            <span className="stat-label">상관계수 (R²):</span>
            <span className="stat-value">{regression.r2.toFixed(4)}</span>
          </span>
          <span className="stat-item">
            <span className="stat-label">기울기:</span>
            <span className="stat-value">{regression.slope.toFixed(4)}</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default CorrelationChart;
