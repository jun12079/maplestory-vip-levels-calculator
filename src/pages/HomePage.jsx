import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className="display-4 fw-bold mb-4">新楓之谷 VIP 階級計算機</h1>
          <div className="bg-light p-4 rounded-3 shadow-sm mb-5">
            <p className="lead text-muted mb-0">輕鬆計算 VIP 階級所需的點數與花費</p>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-10 col-lg-8">
          <div className="card border-0 shadow">
            <div className="card-body p-4 p-md-5">
              <h2 className="h4 fw-bold mb-4 border-bottom pb-2">關於計算機</h2>
              <p className="mb-3">
                計算機僅方便玩家快速計算 VIP 階級所需點數與花費，減少手動計算時間，並提供算法讓玩家自行複驗。
              </p>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle me-3 d-flex justify-content-center align-items-center" style={{ width: "56px", height: "56px" }}>
                  <i className="bi bi-calculator fs-4 text-primary"></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold mb-1">快速計算</h3>
                  <p className="mb-0 text-muted">根據新版VIP制度計算點數花費成本</p>
                </div>
              </div>

              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 rounded-circle me-3 d-flex justify-content-center align-items-center" style={{ width: "56px", height: "56px" }}>
                  <i className="bi bi-graph-up fs-4 text-primary"></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold mb-1">多重比較</h3>
                  <p className="mb-0 text-muted">比較自用與送禮方案，解決不同情境需求</p>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 rounded-circle me-3 d-flex justify-content-center align-items-center" style={{ width: "56px", height: "56px" }}>
                  <i className="bi bi-shield-check fs-4 text-primary"></i>
                </div>
                <div>
                  <h3 className="h5 fw-bold mb-1">簡單操作</h3>
                  <p className="mb-0 text-muted">輸入條件與需求，即可快速獲得計算結果</p>
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
              維持階級計算機
            </Link>
            <Link to="/multi-calculator" className="btn btn-secondary btn-lg px-4 py-3 shadow disabled">
              <i className="bi bi-layers-fill me-2"></i>
              多段階級計算機
            </Link>
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