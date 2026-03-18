import React, { useState, useRef, useEffect } from 'react';
import './InspectionLogPage.css';

/**
 * InspectionLogPage (p8) - 점검일지
 *
 * 일일 점검일지 자동 생성 및 조회
 * - 스크류냉동기 운전 현황 테이블 (더블클릭 수기 수정 가능)
 * - 진동 센서 측정값 테이블 (더블클릭 수기 수정 가능)
 * - 알람 발생 이력
 * - 특이사항 입력란
 * - 수기 수정 이력 (PDF/인쇄 시 포함)
 * - 담당자 확인
 */

// 수기 수정 이력 타입
interface ManualEditRecord {
  id: string;
  field: string;        // 항목명 (예: "AICC #1 고압")
  originalValue: string | number | null;
  editedValue: string | number;
  editedBy: string;
  editedAt: string;
  reason: string;
}

// 냉동기 데이터 타입
interface ChillerData {
  id: string;
  status: string;
  highPressure: number | null;
  lowPressure: number | null;
  oilLevel: number | null;
  dischargeTemp: number | null;
}

// 진동 센서 데이터 타입
interface VibrationData {
  id: string;
  location: string;
  rms: number;
  peak: number;
  status: string;
}

// 수정된 값 추적용 타입
interface EditedValues {
  [key: string]: {
    value: string | number;
    originalValue: string | number | null;
  };
}

// 냉동기 운전 현황 목데이터 (핵심 4대)
const initialChillerData: ChillerData[] = [
  { id: 'AICC #1', status: '가동', highPressure: 13.5, lowPressure: 4.2, oilLevel: 65, dischargeTemp: 72 },
  { id: 'AICC #2', status: '가동', highPressure: 13.2, lowPressure: 4.0, oilLevel: 68, dischargeTemp: 70 },
  { id: '관제탑 #1', status: '가동', highPressure: 14.0, lowPressure: 4.5, oilLevel: 60, dischargeTemp: 75 },
  { id: '공항청사 #1', status: '대기', highPressure: null, lowPressure: null, oilLevel: null, dischargeTemp: null },
];

// 진동 센서 측정값 목데이터 (핵심 4개)
const initialVibrationData: VibrationData[] = [
  { id: 'VIB-01', location: 'AICC 냉각탑', rms: 2.1, peak: 3.2, status: '정상' },
  { id: 'VIB-02', location: 'AICC 팬류', rms: 3.8, peak: 5.1, status: '주의' },
  { id: 'VIB-03', location: '관제탑 냉동기', rms: 1.8, peak: 2.6, status: '정상' },
  { id: 'VIB-04', location: '공항청사 냉동기', rms: 1.7, peak: 2.5, status: '정상' },
];

// 알람 발생 이력 목데이터 (핵심 2건)
const mockAlarmHistory = [
  { time: '14:32', source: 'DX', level: '긴급', message: '팬류 F-01 진동 임계값 초과' },
  { time: '09:15', source: 'AI', level: '경고', message: '냉동기 #1 베어링 결함 징후' },
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

// 수정 사유 프리셋
const editReasonPresets = [
  '센서 오류',
  'CCTV 인식 불가',
  '현장 재측정',
  '장비 교체 후 확인',
  '기타',
];

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
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  // 데이터 상태
  const [chillerData, setChillerData] = useState<ChillerData[]>(initialChillerData);
  const [vibrationData, setVibrationData] = useState<VibrationData[]>(initialVibrationData);

  // 수정된 값 추적
  const [editedValues, setEditedValues] = useState<EditedValues>({});

  // 수기 수정 이력
  const [editHistory, setEditHistory] = useState<ManualEditRecord[]>([]);

  // 인라인 편집 상태
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const editInputRef = useRef<HTMLInputElement>(null);

  // 수정 사유 모달 상태
  const [showReasonModal, setShowReasonModal] = useState<boolean>(false);
  const [pendingEdit, setPendingEdit] = useState<{
    cellKey: string;
    field: string;
    originalValue: string | number | null;
    newValue: string | number;
    dataType: 'chiller' | 'vibration';
    dataId: string;
    fieldKey: string;
  } | null>(null);
  const [editReason, setEditReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');

  // 편집 인풋 포커스
  useEffect(() => {
    if (editingCell && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingCell]);

  // 필터링된 냉동기 데이터
  const filteredChillerData = selectedBuilding === '전체'
    ? chillerData
    : chillerData.filter(chiller => chiller.id.includes(selectedBuilding));

  // 필터링된 진동 센서 데이터
  const filteredVibrationData = selectedBuilding === '전체'
    ? vibrationData
    : vibrationData.filter(sensor => sensor.location.includes(selectedBuilding));

  // PDF 다운로드 핸들러
  const handlePdfDownload = () => {
    console.log('PDF 다운로드 클릭:', { selectedDate, selectedBuilding, editHistory });
    alert('PDF 다운로드 기능은 프로토타입입니다.\n수기 수정 이력 ' + editHistory.length + '건이 포함됩니다.');
  };

  // Excel 다운로드 핸들러
  const handleExcelDownload = () => {
    console.log('Excel 다운로드 클릭:', { selectedDate, selectedBuilding, editHistory });
    alert('Excel 다운로드 기능은 프로토타입입니다.\n수기 수정 이력 ' + editHistory.length + '건이 포함됩니다.');
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
    setIsConfirmed(true);
    console.log('확인 완료:', { confirmedBy, confirmedAt: now.toLocaleString('ko-KR') });
    alert('점검일지 확인이 완료되었습니다.\n확인 후에는 수정이 불가합니다.');
  };

  // 더블클릭으로 편집 시작
  const handleCellDoubleClick = (
    cellKey: string,
    currentValue: string | number | null,
    _dataType: 'chiller' | 'vibration',
    _dataId: string,
    _fieldKey: string
  ) => {
    // 확인 완료된 경우 수정 불가
    if (isConfirmed) {
      alert('확인 완료된 점검일지는 수정할 수 없습니다.');
      return;
    }
    // 대기 상태(null 값)인 경우도 수정 가능
    setEditingCell(cellKey);
    setEditingValue(currentValue?.toString() ?? '');
  };

  // 편집 완료 (Enter 또는 blur)
  const handleEditComplete = (
    cellKey: string,
    field: string,
    originalValue: string | number | null,
    dataType: 'chiller' | 'vibration',
    dataId: string,
    fieldKey: string
  ) => {
    const newValue = parseFloat(editingValue) || editingValue;

    // 값이 변경되지 않은 경우
    if (newValue.toString() === originalValue?.toString()) {
      setEditingCell(null);
      return;
    }

    // 수정 사유 모달 표시
    setPendingEdit({
      cellKey,
      field,
      originalValue,
      newValue,
      dataType,
      dataId,
      fieldKey,
    });
    setShowReasonModal(true);
    setEditingCell(null);
  };

  // 편집 취소 (Escape)
  const handleEditCancel = () => {
    setEditingCell(null);
    setEditingValue('');
  };

  // 키 입력 핸들러
  const handleEditKeyDown = (
    e: React.KeyboardEvent,
    cellKey: string,
    field: string,
    originalValue: string | number | null,
    dataType: 'chiller' | 'vibration',
    dataId: string,
    fieldKey: string
  ) => {
    if (e.key === 'Enter') {
      handleEditComplete(cellKey, field, originalValue, dataType, dataId, fieldKey);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  // 수정 사유 확인
  const handleReasonConfirm = () => {
    if (!pendingEdit) return;

    const finalReason = editReason === '기타' ? customReason : editReason;
    if (!finalReason.trim()) {
      alert('수정 사유를 입력해주세요.');
      return;
    }

    const { cellKey, field, originalValue, newValue, dataType, dataId, fieldKey } = pendingEdit;

    // 데이터 업데이트
    if (dataType === 'chiller') {
      setChillerData(prev => prev.map(item => {
        if (item.id === dataId) {
          return { ...item, [fieldKey]: newValue };
        }
        return item;
      }));
    } else {
      setVibrationData(prev => prev.map(item => {
        if (item.id === dataId) {
          return { ...item, [fieldKey]: newValue };
        }
        return item;
      }));
    }

    // 수정된 값 기록
    setEditedValues(prev => ({
      ...prev,
      [cellKey]: {
        value: newValue,
        originalValue,
      },
    }));

    // 수정 이력 추가
    const now = new Date();
    const newRecord: ManualEditRecord = {
      id: `edit-${Date.now()}`,
      field,
      originalValue,
      editedValue: newValue,
      editedBy: confirmedBy || '미지정',
      editedAt: now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      reason: finalReason,
    };
    setEditHistory(prev => [...prev, newRecord]);

    // 모달 닫기 및 상태 초기화
    setShowReasonModal(false);
    setPendingEdit(null);
    setEditReason('');
    setCustomReason('');
  };

  // 수정 사유 취소
  const handleReasonCancel = () => {
    setShowReasonModal(false);
    setPendingEdit(null);
    setEditReason('');
    setCustomReason('');
  };

  // 셀 값 렌더링 (수기 표시 포함)
  const renderCellValue = (
    cellKey: string,
    value: string | number | null,
    dataType: 'chiller' | 'vibration',
    dataId: string,
    fieldKey: string,
    fieldLabel: string
  ) => {
    const isEditing = editingCell === cellKey;
    const isEdited = editedValues[cellKey];
    const displayValue = value ?? '-';

    if (isEditing) {
      return (
        <input
          ref={editInputRef}
          type="text"
          className="cell-edit-input"
          value={editingValue}
          onChange={(e) => setEditingValue(e.target.value)}
          onBlur={() => handleEditComplete(cellKey, fieldLabel, isEdited?.originalValue ?? value, dataType, dataId, fieldKey)}
          onKeyDown={(e) => handleEditKeyDown(e, cellKey, fieldLabel, isEdited?.originalValue ?? value, dataType, dataId, fieldKey)}
        />
      );
    }

    return (
      <span
        className={`cell-value-wrapper ${isEdited ? 'cell-edited' : ''} ${value !== null ? 'cell-editable' : ''}`}
        onDoubleClick={() => handleCellDoubleClick(cellKey, value, dataType, dataId, fieldKey)}
        title={isEdited ? `원본: ${isEdited.originalValue ?? '-'} → 수정: ${value}\n더블클릭하여 수정` : '더블클릭하여 수정'}
      >
        {displayValue}
        {isEdited && <span className="manual-badge">(수기)</span>}
      </span>
    );
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
            {editHistory.length > 0 && (
              <span className="meta-item edit-count-badge">
                <strong>{editHistory.length}건</strong> 수기 수정
              </span>
            )}
          </div>
        </div>

        <div className="card-bd">
          {/* 편집 안내 메시지 */}
          {!isConfirmed && (
            <div className="edit-guide">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>값을 <strong>더블클릭</strong>하면 수정할 수 있습니다. 수정된 값은 노란색으로 표시되며 "(수기)" 라벨이 붙습니다.</span>
            </div>
          )}

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
                    <th>고압 (kg/cm²)</th>
                    <th>저압 (kg/cm²)</th>
                    <th>유면 (%)</th>
                    <th>토출온도 (°C)</th>
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
                      <td className="cell-value">
                        {renderCellValue(
                          `chiller-${chiller.id}-highPressure`,
                          chiller.highPressure,
                          'chiller',
                          chiller.id,
                          'highPressure',
                          `${chiller.id} 고압`
                        )}
                      </td>
                      <td className="cell-value">
                        {renderCellValue(
                          `chiller-${chiller.id}-lowPressure`,
                          chiller.lowPressure,
                          'chiller',
                          chiller.id,
                          'lowPressure',
                          `${chiller.id} 저압`
                        )}
                      </td>
                      <td className="cell-value">
                        {renderCellValue(
                          `chiller-${chiller.id}-oilLevel`,
                          chiller.oilLevel,
                          'chiller',
                          chiller.id,
                          'oilLevel',
                          `${chiller.id} 유면`
                        )}
                      </td>
                      <td className="cell-value">
                        {renderCellValue(
                          `chiller-${chiller.id}-dischargeTemp`,
                          chiller.dischargeTemp,
                          'chiller',
                          chiller.id,
                          'dischargeTemp',
                          `${chiller.id} 토출온도`
                        )}
                      </td>
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
                      <td className="cell-value">
                        {renderCellValue(
                          `vibration-${sensor.id}-rms`,
                          sensor.rms,
                          'vibration',
                          sensor.id,
                          'rms',
                          `${sensor.id} RMS`
                        )}
                      </td>
                      <td className="cell-value">
                        {renderCellValue(
                          `vibration-${sensor.id}-peak`,
                          sensor.peak,
                          'vibration',
                          sensor.id,
                          'peak',
                          `${sensor.id} Peak`
                        )}
                      </td>
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
                  disabled={isConfirmed}
                />
              </div>
            </div>
          </section>

          {/* 수기 수정 이력 - 수정 건이 있을 때만 표시 */}
          {editHistory.length > 0 && (
            <section className="log-section edit-history-section">
              <h4 className="section-title">
                <span className="section-icon">&#9632;</span>
                수기 수정 이력
                <span className="edit-count">({editHistory.length}건)</span>
              </h4>
              <div className="table-wrapper">
                <table className="log-table edit-history-table">
                  <thead>
                    <tr>
                      <th>항목</th>
                      <th>원본값</th>
                      <th>수정값</th>
                      <th>수정자</th>
                      <th>수정시간</th>
                      <th>사유</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editHistory.map((record) => (
                      <tr key={record.id}>
                        <td className="cell-name">{record.field}</td>
                        <td className="cell-value cell-original">{record.originalValue ?? '-'}</td>
                        <td className="cell-value cell-edited-value">{record.editedValue}</td>
                        <td>{record.editedBy}</td>
                        <td className="cell-mono">{record.editedAt}</td>
                        <td className="cell-reason">{record.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

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
                  disabled={isConfirmed}
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
              <button
                className="btn btn-primary btn-confirm"
                onClick={handleConfirm}
                disabled={isConfirmed}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {isConfirmed ? '확인 완료됨' : '확인 완료'}
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* 수정 사유 입력 모달 */}
      {showReasonModal && (
        <div className="modal-overlay" onClick={handleReasonCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>수정 사유 입력</h4>
              <button className="modal-close" onClick={handleReasonCancel}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="edit-summary">
                <span className="summary-label">변경 내용:</span>
                <span className="summary-field">{pendingEdit?.field}</span>
                <span className="summary-arrow">→</span>
                <span className="summary-original">{pendingEdit?.originalValue ?? '-'}</span>
                <span className="summary-to">를</span>
                <span className="summary-new">{pendingEdit?.newValue}</span>
                <span className="summary-suffix">로 변경</span>
              </div>
              <div className="reason-presets">
                <label>사유 선택:</label>
                <div className="preset-buttons">
                  {editReasonPresets.map((preset) => (
                    <button
                      key={preset}
                      className={`preset-btn ${editReason === preset ? 'active' : ''}`}
                      onClick={() => setEditReason(preset)}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
              {editReason === '기타' && (
                <div className="custom-reason">
                  <label htmlFor="custom-reason-input">사유 직접 입력:</label>
                  <input
                    id="custom-reason-input"
                    type="text"
                    className="custom-reason-input"
                    placeholder="수정 사유를 입력하세요..."
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    autoFocus
                  />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleReasonCancel}>
                취소
              </button>
              <button className="btn btn-primary" onClick={handleReasonConfirm}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionLogPage;
