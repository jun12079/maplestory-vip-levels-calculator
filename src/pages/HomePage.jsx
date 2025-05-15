import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className="display-4 fw-bold mb-4">新楓之谷 VIP 階級計算器</h1>
          <div className="bg-light p-4 rounded-3 shadow-sm mb-5">
            <p className="lead text-muted mb-0">專為楓之谷玩家打造的精準計算工具，幫您規劃 VIP 點數最佳利用方案</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-10 col-lg-8">
          <div className="card border-0 shadow">
            <div className="card-body p-4 p-md-5">
              <h2 className="h4 fw-bold mb-4 border-bottom pb-2">關於本工具</h2>
              <p className="mb-3">
                本計算工具提供精確的 VIP 點數規劃方案，幫助您做出最具成本效益的決策。無論您是要維持現有階級，還是規劃升級路徑，我們都能提供準確的資源需求評估。
              </p>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle me-3 d-flex justify-content-center align-items-center" style={{ width: "56px", height: "56px" }}>
                  <i className="bi bi-calculator fs-4 text-primary"></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold mb-1">精準計算</h3>
                  <p className="mb-0 text-muted">根據最新遊戲機制提供精確的點數花費預估</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle me-3 d-flex justify-content-center align-items-center" style={{ width: "56px", height: "56px" }}>
                  <i className="bi bi-graph-up fs-4 text-primary"></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold mb-1">多重比較</h3>
                  <p className="mb-0 text-muted">比較自用與送禮方案，找出最省錢的策略</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 rounded-circle me-3 d-flex justify-content-center align-items-center" style={{ width: "56px", height: "56px" }}>
                  <i className="bi bi-shield-check fs-4 text-primary"></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold mb-1">即時更新</h3>
                  <p className="mb-0 text-muted">我們持續跟進遊戲更新，確保計算結果準確可靠</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
            <Link to="/maintain-calculator" className="btn btn-primary btn-lg px-4 py-3 shadow">
              <i className="bi bi-calculator-fill me-2"></i>
              維持階級計算器
            </Link>
            <div className="position-relative">
              <Link to="/multi-calculator" className="btn btn-secondary btn-lg px-4 py-3 shadow disabled">
                <i className="bi bi-layers-fill me-2"></i>
                多段階級計算器
              </Link>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                即將推出
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-muted small">
              <strong>免責聲明：</strong>本工具僅供參考，計算結果可能因遊戲內部調整而有所變動。<br />
              使用者需自行承擔使用本工具所產生的風險。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}