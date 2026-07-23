/**
 * D:\DuAnLapTrinh\frontend\src\pages\admin_testcase_page.js
 * Giao diện quản lý bộ test case cho từng bài tập
 */
export default class AdminTestcasePage {
    render(problemId = "") {
        return `
            <div class="container mt-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/admin/problems">Quản lý bài tập</a></li>
                        <li class="breadcrumb-item active">Thiết lập Test Case</li>
                    </ol>
                </nav>
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-header bg-white p-3 d-flex justify-content-between align-items-center">
                        <h4 class="mb-0 fw-bold">Test Cases cho bài tập ID: ${problemId}</h4>
                        <button class="btn btn-primary btn-sm" id="add-test-btn">
                            <i class="bi bi-plus-lg me-1"></i> Thêm Test Case
                        </button>
                    </div>
                    <div class="card-body">
                        <div id="test-case-list">
                            <!-- Danh sách các test case sẽ hiển thị ở đây -->
                            <div class="border rounded p-3 mb-3 bg-light">
                                <div class="row">
                                    <div class="col-md-5">
                                        <label class="form-label small fw-bold">Input mẫu</label>
                                        <textarea class="form-control form-control-sm" rows="3">1 2</textarea>
                                    </div>
                                    <div class="col-md-5">
                                        <label class="form-label small fw-bold">Output mẫu</label>
                                        <textarea class="form-control form-control-sm" rows="3">3</textarea>
                                    </div>
                                    <div class="col-md-2 d-flex flex-column justify-content-between">
                                        <div>
                                            <label class="form-label small fw-bold">Điểm</label>
                                            <input type="number" class="form-control form-control-sm" value="10">
                                        </div>
                                        <button class="btn btn-outline-danger btn-sm mt-2">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}