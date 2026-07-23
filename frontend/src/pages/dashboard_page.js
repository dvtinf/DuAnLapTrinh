/**
 * D:\DuAnLapTrinh\frontend\src\pages\dashboard_page.js
 * Giao diện trang chủ điều hướng người dùng
 */
export default class DashboardPage {
    render() {
        return `
            <div class="row">
                <div class="col-md-12">
                    <h2 class="mb-4">Chào mừng đến với C++ Online Judge</h2>
                </div>
                <div class="col-md-4">
                    <div class="card shadow-sm border-0 mb-4">
                        <div class="card-body text-center p-4">
                            <i class="bi bi-code-square text-primary display-4 mb-3"></i>
                            <h4>Bài tập</h4>
                            <p class="text-muted">Bắt đầu luyện tập các thuật toán C++</p>
                            <a href="/problems" class="btn btn-primary px-4">Xem ngay</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card shadow-sm border-0 mb-4">
                        <div class="card-body text-center p-4">
                            <i class="bi bi-trophy text-warning display-4 mb-3"></i>
                            <h4>Xếp hạng</h4>
                            <p class="text-muted">Xem thành tích của bạn trên bảng tổng sắp</p>
                            <a href="/ranking" class="btn btn-outline-primary px-4">Bảng điểm</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}