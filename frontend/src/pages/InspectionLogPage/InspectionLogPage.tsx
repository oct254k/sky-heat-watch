import React, { useState } from 'react';
import './InspectionLogPage.css';

/**
 * InspectionLogPage (p8) - 점검일지
 *
 * 일일 점검일지 자동 생성 및 조회
 * - 스크류냉동기 운전 현황 테이블
 * - 진동 센서 측정값 테이블
 * - 알람 발생 이력
 * - 특이사항 입력란
 * - 담당자 확인
 */

// 냉동기 운전 현황 목데이터
const mockChillerData = [
  { id: 'AICC #1', status: '가동', highPressure: 13.5, lowPressure: 4.2, oilLevel: 65, dischargeTemp: 72 },
  { id: 'AICC #2', status: '가동', highPressure: 13.2, lowPressure: 4.0, oilLevel: 68, dischargeTemp: 70 },
  { id: '관제탑 #1', status: '가동', highPressure: 14.0, lowPressure: 4.5, oilLevel: 60, dischargeTemp: 75 },
  { id: '관제탑 #2', status: '대기', highPressure: null, lowPressure: null, oilLevel: null, dischargeTemp: null },
  { id: '공항청사 #1', status: '가동', highPressure: 13.8, lowPressure: 4.3, oilLevel: 62, dischargeTemp: 73 },
  { id: '공항청사 #2', status: '대기', highPressure: null, lowPressure: null, oilLevel: null, dischargeTemp: null },
];

// 진동 센서 측정값 목데이터
const mockVibrationData = [
  { id: 'VIB-01', location: 'AICC 냉각탑 #1', rms: 2.1, peak: 3.2, status: '정상' },
  { id: 'VIB-02', location: 'AICC 냉각탑 #2', rms: 2.3, peak: 3.5, status: '정상' },
  { id: 'VIB-03', location: 'AICC 팬류 F-01', rms: 3.8, peak: 5.1, status: '주의' },
  { id: 'VIB-04', location: 'AICC 팬류 F-02', rms: 1.9, peak: 2.8, status: '정상' },
  { id: 'VIB-05', location: '관제탑 냉동기 #1', rms: 1.8, peak: 2.6, status: '정상' },
  { id: 'VIB-06', location: '관제탑 팬류 F-03', rms: 2.4, peak: 3.6, status: '정상' },
  { id: 'VIB-07', location: '공항청사 냉동기 #1', rms: 1.7, peak: 2.5, status: '정상' },
  { id: 'VIB-08', location: '공항청사 팬류 F-04', rms: 2.1, peak: 3.1, status: '정상' },
];

// 알람 발생 이력 목데이터
const mockAlarmHistory = [
  { time: '14:32', source: 'DX', level: '긴급', message: '팬류 F-01 진동 임계값 초과 (3.8mm/s > 3.0mm/s)' },
  { time: '09:15', source: 'AI', level: '경고', message: '냉동기 #1 베어링 결함 징후 감지' },
  { time: '08:30', source: 'DX', level: '정보', message: '일일 점검 시작' },
];

// 담당자 목록 목데이터
const mockStaffList = [
  { id: 'staff-1', name: '김관리' },
  { id: 'staff-2', name: '이운영' },
  { id: 'staff-3', name: '박설비' },
  { id: 'staff-4', name: '최기술' },
];

// 건물 필터 옵션
const buildingOptions = ['전체', 'AICC', '관제탑', '공항청사'];

export const InspectionLogPage: React.FC = () => {
  // 상태 관리
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedBuilding, setSelectedBuilding] = useState<string>('전체');
  const [manualRemark, setManualRemark] = useState<string>('');
  const [confirmedBy, setConfirmedBy] = useState<string>('');
  const [confirmedAt, setConfirmedAt] = useState<string>('');

  // 필터링된 냉동기 데이터
  const filteredChillerData = selectedBuilding === '전체'
    ? mockChillerData
    : mockChillerData.filter(chiller => chiller.id.includes(selectedBuilding));

  // 필터링된 진동 센서 데이터
  const filteredVibrationData = selectedBuilding === '전체'
    ? mockVibrationData
    : mockVibrationData.filter(sensor => sensor.location.includes(selectedBuilding));

  // PDF 다운로드 핸들러
  const handlePdfDownload = () => {
    console.log('PDF 다운로드 클릭:', { selectedDate, selectedBuilding });
    alert('PDF 다운로드 기능은 프로토타입입니다.');
  };

  // Excel 다운로드 핸들러
  const handleExcelDownload = () => {
    console.log('Excel 다운로드 클릭:', { selectedDate, selectedBuilding });
    alert('Excel 다운로드 기능은 프로토타입입니다.');
  };

  // 조회 핸들러
  const handleSearch = () => {
    console.log('조회 클릭:', { selectedDate, selectedBuilding });
  };

  // 확인 완료 핸들러
  const handleConfirm = () => {
    if (!confirmedBy) {
      alert('확인자를 선택해주세요.');
      return;
    }
    const now = new Date();
    setConfirmedAt(now.toLocaleString('ko-KR'));
    console.log('확인 완료:', { confirmedBy, confirmedAt: now.toLocaleString('ko-KR') });
    alert('점검일지 확인이 완료되었습니다.');
  };

  // 상태에 따른 배지 클래스
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case '가동':
        return 'badge badge-ok';
      case '대기':
        return 'badge badge-standby';
      case '정상':
        return 'badge badge-ok';
      case '주의':
        return 'badge badge-warn';
      case '긴급':
        return 'badge badge-danger';
      case '경고':
        return 'badge badge-warn';
      case '정보':
        return 'badge badge-info';
      default:
        return 'badge';
    }
  };

  // 알람 소스에 따른 배지 클래스
  const getSourceBadgeClass = (source: string) => {
    return source === 'AI' ? 'source-badge source-ai' : 'source-badge source-dx';
  };

  return (
    <div className="page-container inspection-log-page">
      {/* 상단 필터 및 액션 바 */}
      <div className="card filter-bar">
        <div className="filter-group">
          <div className="filter-item">
            <label htmlFor="date-select">날짜 선택</label>
            <input
              type="date"
              id="date-select"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-date"
            />
          </div>
          <div className="filter-item">
            <label htmlFor="building-select">건물</label>
            <select
              id="building-select"
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="input-select"
            >
              {buildingOptions.map((building) => (
                <option key={building} value={building}>
                  {building}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleSearch}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            조회
          </button>
        </div>
        <div className="action-group">
          <button className="btn btn-secondary" onClick={handlePdfDownload}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            PDF 다운로드
          </button>
          <button className="btn btn-secondary" onClick={handleExcelDownload}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            Excel 다운로드
          </button>
        </div>
      </div>

      {/* 일일 점검일지 본문 */}
      <div className="card inspection-log-body">
        <div className="card-hd">
          <h3>
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            일일 점검일지 (자동 생성)
          </h3>
          <div className="log-meta">
            <span className="meta-item">
              <strong>작성일:</strong> {selectedDate}
            </span>
            <span className="meta-item">
              <strong>작성자:</strong> 시스템 (자동)
            </span>
            <span className="meta-item">
              <strong>점검 구분:</strong> 정기 점검
            </span>
          </div>
        </div>

        <div className="card-bd">
          {/* 스크류냉동기 운전 현황 */}
          <section className="log-section">
            <h4 className="section-title">
              <span className="section-icon">&#9632;</span>
              스크류냉동기 운전 현황
            </h4>
            <div className="table-wrapper">
              <table className="log-table">
                <thead>
                  <tr>
                    <th>설비</th>
                    <th>상태</th>
                    <th>고압 (kg/cm2)</th>
                    <th>저압 (kg/cm2)</th>
                    <th>유면 (%)</th>
                    <th>토출온도 (C)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChillerData.map((chiller) => (
                    <tr key={chiller.id}>
                      <td className="cell-name">{chiller.id}</td>
                      <td>
                        <span className={getStatusBadgeClass(chiller.status)}>
                          {chiller.status}
                        </span>
                      </td>
                      <td className="cell-value">{chiller.highPressure ?? '-'}</td>
                      <td className="cell-value">{chiller.lowPressure ?? '-'}</td>
                      <td className="cell-value">{chiller.oilLevel ?? '-'}</td>
                      <td className="cell-value">{chiller.dischargeTemp ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 진동 센서 측정값 */}
          <section className="log-section">
            <h4 className="section-title">
              <span className="section-icon">&#9632;</span>
              진동 센서 측정값 (일 평균)
            </h4>
            <div className="table-wrapper">
              <table className="log-table">
                <thead>
                  <tr>
                    <th>센서</th>
                    <th>위치</th>
                    <th>RMS (mm/s)</th>
                    <th>Peak (mm/s)</th>
                    <th>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVibrationData.map((sensor) => (
                    <tr key={sensor.id}>
                      <td className="cell-mono">{sensor.id}</td>
                      <td className="cell-name">{sensor.location}</td>
                      <td className="cell-value">{sensor.rms}</td>
                      <td className="cell-value">{sensor.peak}</td>
                      <td>
                        <span className={getStatusBadgeClass(sensor.status)}>
                          {sensor.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 알람 발생 이력 */}
          <section className="log-section">
            <h4 className="section-title">
              <span className="section-icon">&#9632;</span>
              알람 발생 이력 (당일)
            </h4>
            <div className="alarm-history-list">
              {mockAlarmHistory.map((alarm, index) => (
                <div key={index} className="alarm-history-item">
                  <span className="alarm-time">[{alarm.time}]</span>
                  <span className={getSourceBadgeClass(alarm.source)}>[{alarm.source}]</span>
                  <span className={getStatusBadgeClass(alarm.level)}>{alarm.level}</span>
                  <span className="alarm-message">{alarm.message}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 특이사항 */}
          <section className="log-section">
            <h4 className="section-title">
              <span className="section-icon">&#9632;</span>
              특이사항
            </h4>
            <div className="remarks-section">
              <div className="remark-item remark-auto">
                <span className="remark-label">[자동 기록]</span>
                <span className="remark-content">팬류 F-01 점검 필요 (14일 내)</span>
              </div>
              <div className="remark-item remark-manual">
                <span className="remark-label">[수동 입력]</span>
                <input
                  type="text"
                  className="remark-input"
                  placeholder="특이사항을 입력하세요..."
                  value={manualRemark}
                  onChange={(e) => setManualRemark(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* 담당자 확인 */}
          <section className="log-section confirm-section">
            <h4 className="section-title">
              <span className="section-icon">&#9632;</span>
              담당자 확인
            </h4>
            <div className="confirm-form">
              <div className="confirm-item">
                <label htmlFor="confirmer-select">확인자</label>
                <select
                  id="confirmer-select"
                  value={confirmedBy}
                  onChange={(e) => setConfirmedBy(e.target.value)}
                  className="input-select"
                >
                  <option value="">선택하세요</option>
                  {mockStaffList.map((staff) => (
                    <option key={staff.id} value={staff.name}>
                      {staff.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="confirm-item">
                <label>확인일시</label>
                <span className="confirm-datetime">{confirmedAt || '-'}</span>
              </div>
              <button className="btn btn-primary btn-confirm" onClick={handleConfirm}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                확인 완료
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InspectionLogPage;
