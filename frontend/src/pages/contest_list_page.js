/**
 * D:\DuAnLapTrinh\frontend\src\pages\contest_list_page.js
 * Giao diện hiển thị danh sách các kỳ thi lập trình
 */
export default class ContestListPage {
    render() {
        return `
            <div class="container mt-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">Kỳ thi lập trình</h2>
                    <span class="badge bg-primary">Online: 128 thí sinh</span>
                </div>
                <div class="row" id="contest-container">
                    <div class="col-md-6 mb-4">
                        <div class="card shadow-sm border-0 h-100">
                            <div class="card-body p-4">
                                <div class="d-flex justify-content-between mb-2">
                                    <span class="badge bg-success">Đang diễn ra</span>
                                    <small class="text-muted">Kết thúc trong: 01:24:10</small>
                                </div>
                                <h4 class="fw-bold">Olympic Tin học Sinh viên 2026</h4>
                                <p class="text-muted small">Kỳ thi dành cho sinh viên khối ngành CNTT trên toàn hệ thống.</p>
                                <div class="d-grid mt-3">
                                    <a href="/contest/1" class="btn btn-primary fw-bold">Vào phòng thi</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}