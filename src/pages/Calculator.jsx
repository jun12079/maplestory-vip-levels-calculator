import { useCallback, useEffect, useState } from "react";
import normalIcon from "../assets/images/normal.png";
import silverIcon from "../assets/images/silver.png";
import goldIcon from "../assets/images/gold.png";
import diamondIcon from "../assets/images/diamond.png";
import royalBlackIcon from "../assets/images/royalBlack.png";

const vipLevels = {
  normal: { self: 20, gift: 16, maintain: 0 },
  silver: { self: 20, gift: 16, maintain: 0 },
  gold: { self: 30, gift: 24, maintain: 225000 },
  diamond: { self: 40, gift: 32, maintain: 1000000 },
  royalBlack: { self: 50, gift: 40, maintain: 5000000 },
};

const maplePointsToVIP = 300;

export default function Calculator() {

  const [calculationResults, setCalculationResults] = useState({
    cost: 0,
    incomeByGift: 102500,
    incomeByMapleCoins: 12500,
    toRoyalTierCashByGift: 115000,
    toRoyalTierPointsByGift: 125000,
    vipPointsEquivalentMapleCoins: 277777777750,
    coinValue: 22222222.22
  });
  const [currentVipLevel, setCurrentVipLevel] = useState('royalBlack');
  const [selectedMethod, setSelectedMethod] = useState('gift');
  const [vipMethodPoints, setVipMethodPoints] = useState(50);
  const [vipMaintainPoints, setVipMaintainPoints] = useState(5000000);
  const [pointToCash, setPointToCash] = useState(92);
  const [giftDiscount, setGiftDiscount] = useState(82);
  const [maplePointsTomapleCoins, setMaplePointsTomapleCoins] = useState(6);
  const [coinValueMethod, setCoinValueMethod] = useState('auto');
  const [coinValue, setCoinValue] = useState(21200000);

  // 表單驗證狀態
  const [errors, setErrors] = useState({
    vipMaintainPoints: "",
    pointToCash: "",
    giftDiscount: "",
    maplePointsTomapleCoins: "",
    coinValue: ""
  });
  // 表單是否有效狀態
  const [isFormValid, setIsFormValid] = useState(true);

  // 當VIP等級變化時，更新相關狀態
  useEffect(() => {
    if (selectedMethod === 'self') {
      setVipMethodPoints(vipLevels[currentVipLevel].self);
    } else {
      setVipMethodPoints(vipLevels[currentVipLevel].gift);
    }
    setVipMaintainPoints(vipLevels[currentVipLevel].maintain);
  }, [currentVipLevel, selectedMethod]);

  // 驗證表單
  const validateForm = useCallback(() => {
    const newErrors = {
      vipMaintainPoints: "",
      pointToCash: "",
      giftDiscount: "",
      maplePointsTomapleCoins: "",
      coinValue: ""
    };

    let valid = true;

    // 驗證VIP維持點數
    if (vipMaintainPoints === "" || vipMaintainPoints < 0) {
      newErrors.vipMaintainPoints = "數值不能小於0";
      valid = false;
    }

    // 驗證點數折數
    if (pointToCash === "" || pointToCash < 0 || pointToCash > 100) {
      newErrors.pointToCash = "範圍僅1~100";
      valid = false;
    }

    // 驗證送禮折數
    if (giftDiscount === "" || giftDiscount < 0 || giftDiscount > 100) {
      newErrors.giftDiscount = "範圍僅1~100";
      valid = false;
    }

    // 驗證楓幣商城匯率
    if (maplePointsTomapleCoins === "" || maplePointsTomapleCoins <= 0) {
      newErrors.maplePointsTomapleCoins = "不能低於0";
      valid = false;
    }

    // 驗證幣值 (只有當手動輸入幣值時才驗證)
    if (coinValueMethod === 'manual' && (coinValue === "" || coinValue <= 0)) {
      newErrors.coinValue = "不能低於0";
      valid = false;
    }

    setErrors(newErrors);
    setIsFormValid(valid);

    return valid;
  }, [vipMaintainPoints, pointToCash, giftDiscount, maplePointsTomapleCoins, coinValue, coinValueMethod]);

  // 處理VIP等級按鈕點擊
  const handleVipLevelChange = (level) => {
    setCurrentVipLevel(level);
    setVipMaintainPoints(vipLevels[level].maintain);
  };

  // 通用function：處理此畫面的input輸入
  const handleNumericInput = (e, setter, min = 0, max = Infinity) => {
    const value = e.target.value;

    // 空值直接設為空字串
    if (value === "") {
      setter("");
      return;
    }

    const numValue = Number(value);

    // 檢查有沒有在有效範圍內，如果在範圍內就設置狀態
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      setter(numValue);
    }
  };

  // 切換使用方式
  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    if (method === 'self') {
      setVipMethodPoints(vipLevels[currentVipLevel].self);
    } else {
      setVipMethodPoints(vipLevels[currentVipLevel].gift);
    }
  };

  // 計算結果
  const calculateResults = useCallback(() => {
    if (!isFormValid) return;

    const pointToCashDecimal = pointToCash * 0.01;
    const giftDiscountDecimal = giftDiscount * 0.01;
    const diamondTierPointToVIP = Number(vipMethodPoints);

    // 計算
    const mapleCoinMallExchangeRate = 100000000 / maplePointsTomapleCoins;  // 1楓點:x楓幣
    const vipPointsEquivalentMaplePoints = vipMaintainPoints / maplePointsToVIP;  // VIP點數換楓點
    const vipPointsEquivalentMapleCoins = vipPointsEquivalentMaplePoints * mapleCoinMallExchangeRate; // VIP點數換楓幣

    const toRoyalTierPointsByGift = vipMaintainPoints / diamondTierPointToVIP;  // 送禮需要多少點數
    const toRoyalTierCashByGift = toRoyalTierPointsByGift * pointToCashDecimal;  // 送禮需要多少現金
    const incomeByGift = toRoyalTierPointsByGift * giftDiscountDecimal;  // 送禮折扣後的現金收入

    let calculatedCoinValue;
    if (coinValueMethod === 'auto') {
      // 自動計算幣值
      calculatedCoinValue = vipPointsEquivalentMapleCoins / (toRoyalTierCashByGift - incomeByGift);
    } else {
      // 使用手動輸入的幣值
      calculatedCoinValue = coinValue;
    }

    const incomeByMapleCoins = vipPointsEquivalentMapleCoins / calculatedCoinValue; // 賣幣收入
    const cost = incomeByGift + incomeByMapleCoins - toRoyalTierCashByGift;

    // 更新計算結果
    setCalculationResults({
      cost,
      incomeByGift,
      incomeByMapleCoins,
      toRoyalTierCashByGift,
      toRoyalTierPointsByGift,
      vipPointsEquivalentMapleCoins,
      coinValue: calculatedCoinValue
    });
  }, [vipMaintainPoints, pointToCash, giftDiscount, maplePointsTomapleCoins, coinValue, coinValueMethod, vipMethodPoints, isFormValid]);

  // 即時表單驗證
  useEffect(() => {
    validateForm();
  }, [vipMaintainPoints, pointToCash, giftDiscount, maplePointsTomapleCoins, coinValue, coinValueMethod, validateForm]);

  // 即時計算結果
  useEffect(() => {
    if (isFormValid) {
      calculateResults();
    }
  }, [vipMaintainPoints, pointToCash, giftDiscount, maplePointsTomapleCoins, coinValue, coinValueMethod, vipMethodPoints, isFormValid, calculateResults]);

  // 格式化數字為台灣地區格式
  const formatNumber = (num) => {
    return num.toLocaleString('zh-TW', { maximumFractionDigits: 2 });
  };

  // 結果卡片的樣式類別
  const getResultClass = () => {
    if (calculationResults.cost > 0) {
      return 'profit';
    } else if (calculationResults.cost < 0) {
      return 'loss';
    }
    return 'break-even';
  };

  const renderVipLevelButtons = () => {
    const levels = [
      { key: 'normal', name: '非VIP', className: 'btn-outline-primary', icon: normalIcon },
      { key: 'silver', name: '銀', className: 'btn-outline-secondary', icon: silverIcon },
      { key: 'gold', name: '金', className: 'btn-outline-warning', icon: goldIcon },
      { key: 'diamond', name: '鑽石', className: 'btn-outline-info', icon: diamondIcon },
      { key: 'royalBlack', name: '皇家黑', className: 'btn-outline-dark', icon: royalBlackIcon }
    ];

    return levels.map(level => (
      <button
        key={level.key}
        type="button"
        data-level={level.key}
        className={`btn btn-sm ${level.className} me-2 mb-2 ${currentVipLevel === level.key ? 'active' : ''}`}
        onClick={() => handleVipLevelChange(level.key)}
      >
        <img src={level.icon} alt={`${level.name}圖標`} className="level-icon" /> {level.name}
      </button>
    ));
  };

  return (
    <>
      <div className="container mb-4">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h2 className="h4 mb-0 fw-bold">維持階級</h2>
              </div>
              <div className="card-body">
                <div id="calculatorForm">
                  <div className="row mb-3">
                    <label className="col-lg-3 col-form-label">VIP階級</label>
                    <div id="vipLevel" className="col-lg-9 d-flex flex-wrap align-items-center">
                      {renderVipLevelButtons()}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-3 col-form-label">使用方式</label>
                    <div className="col-lg-9 d-flex align-items-center">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="vipMethod"
                          id="vipBySelf"
                          value={vipLevels[currentVipLevel].self}
                          checked={selectedMethod === 'self'}
                          onChange={() => handleMethodChange('self')}
                        />
                        <label className="form-check-label" htmlFor="vipBySelf">自用 ({vipLevels[currentVipLevel].self}VIP點/點)</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="vipMethod"
                          id="vipByGift"
                          value={vipLevels[currentVipLevel].gift}
                          checked={selectedMethod === 'gift'}
                          onChange={() => handleMethodChange('gift')}
                        />
                        <label className="form-check-label" htmlFor="vipByGift">送禮 ({vipLevels[currentVipLevel].gift}VIP點/點)</label>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="vipMaintainPoints" className="col-lg-3 col-form-label">
                      VIP維持點數 <span className="text-danger">*</span>
                    </label>
                    <div className="col-lg-9">
                      <input
                        type="number"
                        className={`form-control ${errors.vipMaintainPoints ? 'is-invalid' : ''}`}
                        id="vipMaintainPoints"
                        value={vipMaintainPoints}
                        onChange={(e) => handleNumericInput(e, setVipMaintainPoints, 1)}
                      />
                      {errors.vipMaintainPoints ? (
                        <div className="invalid-feedback">{errors.vipMaintainPoints}</div>
                      ) : (
                        <div className="form-text">還差多少VIP點數</div>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="pointToCash" className="col-lg-3 col-form-label">
                      點數折數 <span className="text-danger">*</span>
                    </label>
                    <div className="col-lg-9">
                      <div className="input-group">
                        <input
                          type="number"
                          className={`form-control ${errors.pointToCash ? 'is-invalid' : ''}`}
                          id="pointToCash"
                          value={pointToCash}
                          onChange={(e) => handleNumericInput(e, setPointToCash, 1, 100)}
                        />
                        <span className="input-group-text">%</span>
                      </div>
                      {errors.pointToCash ? (
                        <div className="invalid-feedback d-block">{errors.pointToCash}</div>
                      ) : (
                        <div className="form-text">點數折扣百分比</div>
                      )}
                    </div>
                  </div>

                  <div id="giftDiscountInputContainer" className="row mb-3">
                    <label htmlFor="giftDiscount" className="col-lg-3 col-form-label">
                      送禮折數 <span className="text-danger">*</span>
                    </label>
                    <div className="col-lg-9">
                      <div className="input-group">
                        <input
                          type="number"
                          className={`form-control ${errors.giftDiscount ? 'is-invalid' : ''}`}
                          id="giftDiscount"
                          value={giftDiscount}
                          onChange={(e) => handleNumericInput(e, setGiftDiscount, 1, 100)}
                        />
                        <span className="input-group-text">%</span>
                      </div>
                      {errors.giftDiscount ? (
                        <div className=" invalid-feedback d-block">{errors.giftDiscount}</div>
                      ) : (
                        <div className="form-text">送禮折扣百分比</div>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="maplePointsTomapleCoins" className="col-lg-3 col-form-label">
                      楓幣商城匯率 <span className="text-danger">*</span>
                    </label>
                    <div className="col-lg-9">
                      <input
                        type="number"
                        className={`form-control ${errors.maplePointsTomapleCoins ? 'is-invalid' : ''}`}
                        id="maplePointsTomapleCoins"
                        value={maplePointsTomapleCoins}
                        onChange={(e) => handleNumericInput(e, setMaplePointsTomapleCoins, 1)}
                      />
                      {errors.maplePointsTomapleCoins ? (
                        <div className="invalid-feedback">{errors.maplePointsTomapleCoins}</div>
                      ) : (
                        <div className="form-text">楓點兌換楓幣比例</div>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label className="col-lg-3 col-form-label">幣值</label>
                    <div className="col-lg-9 my-2">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="coinValueMethod"
                          id="coinValueAuto"
                          value="auto"
                          onChange={() => setCoinValueMethod('auto')}
                          checked={coinValueMethod === 'auto'}
                        />
                        <label className="form-check-label" htmlFor="coinValueAuto">自動計算</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="coinValueMethod"
                          id="coinValueManual"
                          value="manual"
                          onChange={() => setCoinValueMethod('manual')}
                          checked={coinValueMethod === 'manual'}
                        />
                        <label className="form-check-label" htmlFor="coinValueManual">手動輸入</label>
                      </div>
                      {coinValueMethod === "manual" && (
                        <div className="mt-2">
                          <input
                            type="number"
                            className={`form-control ${errors.coinValue ? 'is-invalid' : ''}`}
                            id="coinValue"
                            value={coinValue}
                            onChange={(e) => handleNumericInput(e, setCoinValue, 1)}
                          />
                          {errors.coinValue ? (
                            <div className="invalid-feedback">{errors.coinValue}</div>
                          ) : (
                            <div className="form-text">賣幣的幣值</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div id="results" className="card">
              <div className="card-header">
                <h4 className="h4 mb-0 fw-bold">計算結果</h4>
              </div>
              <div className="card-body">
                {!isFormValid ? (
                  <div className="p-4 rounded mb-4 text-center break-even">
                    <div className="fw-bold fs-4 text-warning">
                      請檢查輸入的數值
                    </div>
                  </div>
                ) : (
                  <>
                    <div id="finalResult" className={`p-4 rounded mb-4 text-center ${getResultClass()}`}>
                      <div className="mb-2 fw-bold">點數 {pointToCash}折 | 送禮 {giftDiscount}折</div>
                      <div className={`fw-bold fs-4 ${calculationResults.cost > 0 ? 'text-success' :
                        calculationResults.cost < 0 ? 'text-danger' : 'text-warning'}`
                      }>
                        總{calculationResults.cost > 0 ? '盈利' : calculationResults.cost < 0 ? '虧損' : '盈虧'}:
                        {formatNumber(calculationResults.cost)}
                      </div>
                      <div className="mt-1 text-muted" style={{ fontSize: '0.9em' }}>
                        (基於 {formatNumber(vipMaintainPoints)} VIP點數計算)
                      </div>
                    </div>

                    <div className="calculation-steps">
                      <div className="calc-row border-bottom p-2">
                        <div className="d-flex justify-content-between">
                          <span>送禮收入</span>
                          <span>{formatNumber(calculationResults.incomeByGift)}</span>
                        </div>
                        <div className="calc-formula-text">消費點數 × 送禮折數</div>
                        <div className="calculation-formula text-muted">
                          {formatNumber(calculationResults.toRoyalTierPointsByGift)} × {giftDiscount}%
                        </div>
                      </div>

                      <div className="calc-row border-bottom p-2">
                        <div className="d-flex justify-content-between">
                          <span>賣幣收入</span>
                          <span>{formatNumber(calculationResults.incomeByMapleCoins)}</span>
                        </div>
                        <div className="calc-formula-text">
                          (VIP點數 ÷ VIP點數換楓點) × (100000000 ÷ 楓幣商城匯率) ÷ 幣值
                        </div>
                        <div className="calculation-formula text-muted">
                          ({formatNumber(vipMaintainPoints)} ÷ {formatNumber(maplePointsToVIP)}) ×
                          (100000000 ÷ {formatNumber(maplePointsTomapleCoins)}) ÷ {formatNumber(calculationResults.coinValue)}
                        </div>
                      </div>

                      <div className="calc-row border-bottom p-2">
                        <div className="d-flex justify-content-between">
                          <span>花費金額</span>
                          <span>{formatNumber(calculationResults.toRoyalTierCashByGift)}</span>
                        </div>
                        <div className="calc-formula-text">消費點數 × 點數折數</div>
                        <div className="calculation-formula text-muted">
                          {formatNumber(calculationResults.toRoyalTierPointsByGift)} × {pointToCash}%
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}