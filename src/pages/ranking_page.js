/**
 * D:\DuAnLapTrinh\frontend\src\pages\ranking_page.js
 * Giao diện bảng xếp hạng học sinh
 */
export default class RankingPage {
    render() {
        return `
            <div class="container mt-4">
                <div class="text-center mb-5">
                    <h2 class="fw-bold">Bảng Xếp Hạng</h2>
                    <p class="text-muted">Vinh danh những lập trình viên xuất sắc nhất</p>
                </div>
                <div class="card border-0 shadow-sm">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th class="ps-4">Hạng</th>
                                    <th>Người dùng</th>
                                    <th>Bài đã giải</th>
                                    <th>Tổng điểm</th>
                                    <th class="text-end pe-4">Thành tích</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="ps-4"><span class="badge bg-warning text-dark">#1</span></td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <div class="rounded-circle bg-primary text-white p-2 me-2" style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-size: 12px;">NV</div>
                                            <span class="fw-bold">Nguyễn Văn A</span>
                                        </div>
                                    </td>
                                    <td>45 bài</td>
                                    <td class="fw-bold text-primary">4500</td>
                                    <td class="text-end pe-4"><i class="bi bi-star-fill text-warning"></i></td>
                                </tr>
                                <!-- Thêm dữ liệu xếp hạng khác tại đây -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
}