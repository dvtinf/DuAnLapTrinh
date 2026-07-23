/**
 * D:\DuAnLapTrinh\frontend\src\pages\result_page.js
 * Giao diện hiển thị chi tiết kết quả chấm bài
 */
export default class ResultPage {
    render(result = { status: 'Pending', score: 0, runtime: 0, memory: 0, message: 'Đang đợi chấm...' }) {
        const statusClass = result.status === 'Accepted' ? 'text-success' : 'text-danger';
        
        return `
            <div class="container mt-4">
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-white border-bottom p-3">
                        <h4 class="mb-0 fw-bold">Kết quả bài nộp</h4>
                    </div>
                    <div class="card-body p-4">
                        <div class="row text-center mb-4">
                            <div class="col-md-3 border-end">
                                <h6 class="text-muted small uppercase">Trạng thái</h6>
                                <h4 class="${statusClass} fw-bold">${result.status}</h4>
                            </div>
                            <div class="col-md-3 border-end">
                                <h6 class="text-muted small uppercase">Điểm số</h6>
                                <h4 class="fw-bold">${result.score}</h4>
                            </div>
                            <div class="col-md-3 border-end">
                                <h6 class="text-muted small uppercase">Thời gian</h6>
                                <h4>${result.runtime} ms</h4>
                            </div>
                            <div class="col-md-3">
                                <h6 class="text-muted small uppercase">Bộ nhớ</h6>
                                <h4>${result.memory} KB</h4>
                            </div>
                        </div>

                        ${result.message ? `
                            <div class="mt-3">
                                <h6 class="fw-bold">Thông báo chi tiết:</h6>
                                <pre class="bg-dark text-light p-3 rounded"><code>${result.message}</code></pre>
                            </div>
                        ` : ''}

                        <div class="mt-4">
                            <a href="/problems" class="btn btn-outline-primary">Quay lại danh sách</a>
                            <button onclick="window.location.reload()" class="btn btn-primary px-4 ms-2">Cập nhật kết quả</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}