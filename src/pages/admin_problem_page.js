/**
 * D:\DuAnLapTrinh\frontend\src\pages\admin_problem_page.js
 * Giao diện dành cho giáo viên tạo/sửa bài tập
 */
export default class AdminProblemPage {
    render() {
        return `
            <div class="container mt-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="fw-bold">Quản lý bài tập</h2>
                    <button class="btn btn-success" id="save-problem-btn">
                        <i class="bi bi-save me-2"></i>Lưu bài tập
                    </button>
                </div>
                <div class="row">
                    <div class="col-md-8">
                        <div class="card shadow-sm p-4 mb-4">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Tiêu đề bài tập</label>
                                <input type="text" class="form-control" id="prob-title" placeholder="VD: Tính tổng A + B">
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Nội dung đề bài (Markdown/HTML)</label>
                                <textarea class="form-control" id="prob-desc" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card shadow-sm p-4">
                            <h5 class="fw-bold mb-3">Cấu hình giới hạn</h5>
                            <div class="mb-3">
                                <label class="form-label">Độ khó</label>
                                <select class="form-select" id="prob-difficulty">
                                    <option value="Easy">Dễ</option>
                                    <option value="Medium">Trung bình</option>
                                    <option value="Hard">Khó</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Thời gian (giây)</label>
                                <input type="number" class="form-control" id="prob-time" value="1">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Bộ nhớ (MB)</label>
                                <input type="number" class="form-control" id="prob-memory" value="256">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Trạng thái</label>
                                <select class="form-select" id="prob-status">
                                    <option value="Public">Công khai</option>
                                    <option value="Private">Ẩn</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
