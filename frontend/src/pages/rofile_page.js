/**
 * D:\DuAnLapTrinh\frontend\src\pages\profile_page.js
 * Giao diện hồ sơ cá nhân và lịch sử học tập
 */
export default class ProfilePage {
    render(user = { displayName: "Người dùng", email: "user@example.com", solved: 0 }) {
        return `
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card shadow-sm border-0 text-center p-4">
                            <div class="rounded-circle bg-primary text-white mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; font-size: 32px;">
                                ${user.displayName.charAt(0)}
                            </div>
                            <h4 class="fw-bold">${user.displayName}</h4>
                            <p class="text-muted small">${user.email}</p>
                            <hr>
                            <div class="row text-center">
                                <div class="col-6 border-end">
                                    <h5 class="mb-0 fw-bold">${user.solved}</h5>
                                    <small class="text-muted">Đã giải</small>
                                </div>
                                <div class="col-6">
                                    <h5 class="mb-0 fw-bold">0</h5>
                                    <small class="text-muted">Hạng</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="card shadow-sm border-0">
                            <div class="card-header bg-white p-3">
                                <h5 class="mb-0 fw-bold">Lịch sử nộp bài gần đây</h5>
                            </div>
                            <div class="card-body p-0">
                                <table class="table table-hover mb-0">
                                    <thead class="table-light">
                                        <tr>
                                            <th class="ps-3">Ngày nộp</th>
                                            <th>Bài tập</th>
                                            <th>Trạng thái</th>
                                            <th class="text-end pe-3">Điểm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="ps-3 text-muted small">23/07/2026</td>
                                            <td><a href="/editor?id=1" class="text-decoration-none">A + B Problem</a></td>
                                            <td><span class="text-success fw-bold">Accepted</span></td>
                                            <td class="text-end pe-3">100</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}