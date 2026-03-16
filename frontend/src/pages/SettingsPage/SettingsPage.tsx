import React, { useState } from 'react';
import './SettingsPage.css';

/**
 * SettingsPage (p6) - 임계값 설정
 *
 * 센서별 임계값 설정, 알람 규칙 설정을 포함합니다.
 */
export const SettingsPage: React.FC = () => {
  // Mock threshold settings
  const [thresholds, setThresholds] = useState([
    { id: 'TH-001', sensor: '온도 센서', unit: '°C', min: 0, max: 100, warningLow: 10, warningHigh: 70, dangerLow: 5, dangerHigh: 85, current: { warningLow: 10, warningHigh: 70, dangerLow: 5, dangerHigh: 85 } },
    { id: 'TH-002', sensor: '변위 센서', unit: 'mm', min: 0, max: 10, warningLow: 0.1, warningHigh: 0.4, dangerLow: 0.05, dangerHigh: 0.5, current: { warningLow: 0.1, warningHigh: 0.4, dangerLow: 0.05, dangerHigh: 0.5 } },
    { id: 'TH-003', sensor: '압력 센서', unit: 'bar', min: 0, max: 10, warningLow: 1.0, warningHigh: 4.0, dangerLow: 0.5, dangerHigh: 4.5, current: { warningLow: 1.0, warningHigh: 4.0, dangerLow: 0.5, dangerHigh: 4.5 } },
    { id: 'TH-004', sensor: '진동 센서', unit: 'Hz', min: 0, max: 10, warningLow: 0.5, warningHigh: 3.0, dangerLow: 0.2, dangerHigh: 4.0, current: { warningLow: 0.5, warningHigh: 3.0, dangerLow: 0.2, dangerHigh: 4.0 } },
    { id: 'TH-005', sensor: '수위 센서', unit: '%', min: 0, max: 100, warningLow: 20, warningHigh: 90, dangerLow: 10, dangerHigh: 95, current: { warningLow: 20, warningHigh: 90, dangerLow: 10, dangerHigh: 95 } },
  ]);

  // Mock alarm rules
  const [alarmRules, setAlarmRules] = useState([
    { id: 'AR-001', name: '온도 상한 초과 알람', condition: '온도 > 70°C', action: '이메일 발송 + 알람 생성', enabled: true },
    { id: 'AR-002', name: '변위 경고', condition: '변위 > 0.4mm', action: '알람 생성', enabled: true },
    { id: 'AR-003', name: '압력 이상 감지', condition: '압력 > 4.5bar OR 압력 < 0.5bar', action: '이메일 + SMS + 알람', enabled: true },
    { id: 'AR-004', name: 'CCTV 연결 끊김', condition: 'CCTV 연결 실패', action: '알람 생성', enabled: false },
    { id: 'AR-005', name: '시스템 리소스 경고', condition: 'CPU > 80% OR Memory > 90%', action: '이메일 발송', enabled: true },
  ]);

  const handleThresholdChange = (id: string, field: string, value: number) => {
    setThresholds(prev =>
      prev.map(th =>
        th.id === id ? { ...th, current: { ...th.current, [field]: value } } : th
      )
    );
  };

  const handleRuleToggle = (id: string) => {
    setAlarmRules(prev =>
      prev.map(rule =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  return (
    <div className="page-container settings-page">
      {/* 임계값 설정 */}
      <div className="card">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20V10" />
              <path d="M18 20V4" />
              <path d="M6 20v-4" />
            </svg>
            센서별 임계값 설정
          </h3>
          <div className="card-actions">
            <button className="btn btn-sm btn-secondary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              초기화
            </button>
          </div>
        </div>
        <div className="card-bd">
          <div className="threshold-list">
            {thresholds.map(th => (
              <div key={th.id} className="threshold-item">
                <div className="threshold-header">
                  <div className="threshold-info">
                    <span className="threshold-id">{th.id}</span>
                    <h4 className="threshold-name">{th.sensor}</h4>
                  </div>
                  <span className="threshold-unit">단위: {th.unit}</span>
                </div>

                <div className="threshold-sliders">
                  {/* 위험 하한 */}
                  <div className="slider-group">
                    <div className="slider-header">
                      <span className="slider-label danger">위험 하한</span>
                      <span className="slider-value">{th.current.dangerLow} {th.unit}</span>
                    </div>
                    <input
                      type="range"
                      min={th.min}
                      max={th.max}
                      step={(th.max - th.min) / 100}
                      value={th.current.dangerLow}
                      onChange={(e) => handleThresholdChange(th.id, 'dangerLow', parseFloat(e.target.value))}
                      className="slider slider-danger"
                    />
                  </div>

                  {/* 경고 하한 */}
                  <div className="slider-group">
                    <div className="slider-header">
                      <span className="slider-label warning">경고 하한</span>
                      <span className="slider-value">{th.current.warningLow} {th.unit}</span>
                    </div>
                    <input
                      type="range"
                      min={th.min}
                      max={th.max}
                      step={(th.max - th.min) / 100}
                      value={th.current.warningLow}
                      onChange={(e) => handleThresholdChange(th.id, 'warningLow', parseFloat(e.target.value))}
                      className="slider slider-warning"
                    />
                  </div>

                  {/* 경고 상한 */}
                  <div className="slider-group">
                    <div className="slider-header">
                      <span className="slider-label warning">경고 상한</span>
                      <span className="slider-value">{th.current.warningHigh} {th.unit}</span>
                    </div>
                    <input
                      type="range"
                      min={th.min}
                      max={th.max}
                      step={(th.max - th.min) / 100}
                      value={th.current.warningHigh}
                      onChange={(e) => handleThresholdChange(th.id, 'warningHigh', parseFloat(e.target.value))}
                      className="slider slider-warning"
                    />
                  </div>

                  {/* 위험 상한 */}
                  <div className="slider-group">
                    <div className="slider-header">
                      <span className="slider-label danger">위험 상한</span>
                      <span className="slider-value">{th.current.dangerHigh} {th.unit}</span>
                    </div>
                    <input
                      type="range"
                      min={th.min}
                      max={th.max}
                      step={(th.max - th.min) / 100}
                      value={th.current.dangerHigh}
                      onChange={(e) => handleThresholdChange(th.id, 'dangerHigh', parseFloat(e.target.value))}
                      className="slider slider-danger"
                    />
                  </div>
                </div>

                {/* 범위 시각화 */}
                <div className="threshold-visualization">
                  <div className="range-bar">
                    <div
                      className="range-danger-low"
                      style={{ width: `${((th.current.dangerLow - th.min) / (th.max - th.min)) * 100}%` }}
                    />
                    <div
                      className="range-warning-low"
                      style={{
                        left: `${((th.current.dangerLow - th.min) / (th.max - th.min)) * 100}%`,
                        width: `${((th.current.warningLow - th.current.dangerLow) / (th.max - th.min)) * 100}%`
                      }}
                    />
                    <div
                      className="range-normal"
                      style={{
                        left: `${((th.current.warningLow - th.min) / (th.max - th.min)) * 100}%`,
                        width: `${((th.current.warningHigh - th.current.warningLow) / (th.max - th.min)) * 100}%`
                      }}
                    />
                    <div
                      className="range-warning-high"
                      style={{
                        left: `${((th.current.warningHigh - th.min) / (th.max - th.min)) * 100}%`,
                        width: `${((th.current.dangerHigh - th.current.warningHigh) / (th.max - th.min)) * 100}%`
                      }}
                    />
                    <div
                      className="range-danger-high"
                      style={{
                        left: `${((th.current.dangerHigh - th.min) / (th.max - th.min)) * 100}%`,
                        width: `${((th.max - th.current.dangerHigh) / (th.max - th.min)) * 100}%`
                      }}
                    />
                  </div>
                  <div className="range-labels">
                    <span>{th.min}</span>
                    <span>{th.max}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 알람 규칙 설정 */}
      <div className="card">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            알람 규칙 설정
          </h3>
          <div className="card-actions">
            <button className="btn btn-sm btn-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              규칙 추가
            </button>
          </div>
        </div>
        <div className="card-bd">
          <div className="table-wrapper">
            <table className="rules-table">
              <thead>
                <tr>
                  <th>활성</th>
                  <th>규칙 ID</th>
                  <th>규칙명</th>
                  <th>조건</th>
                  <th>액션</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {alarmRules.map(rule => (
                  <tr key={rule.id} className={!rule.enabled ? 'row-disabled' : ''}>
                    <td>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={rule.enabled}
                          onChange={() => handleRuleToggle(rule.id)}
                        />
                        <span className="toggle-slider" />
                      </label>
                    </td>
                    <td className="cell-mono">{rule.id}</td>
                    <td className="cell-name">{rule.name}</td>
                    <td className="cell-mono cell-condition">{rule.condition}</td>
                    <td className="cell-action">{rule.action}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-action btn-edit" title="수정">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button className="btn-action btn-delete" title="삭제">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 저장 버튼 */}
      <div className="save-section">
        <div className="save-info">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>변경사항을 저장하려면 아래 버튼을 클릭하세요.</span>
        </div>
        <div className="save-buttons">
          <button className="btn btn-lg btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            취소
          </button>
          <button className="btn btn-lg btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            설정 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
