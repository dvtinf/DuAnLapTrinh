/**
 * D:\DuAnLapTrinh\frontend\src\pages\problem_list_page.js
 * Giao diện danh sách bài tập lập trình
 */
export default class ProblemListPage {
    render() {
        return `
            <div class="row">
                <div class="col-md-12">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2 class="fw-bold">Danh sách bài tập</h2>
                        <div class="dropdown">
                            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                Độ khó
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Dễ</a></li>
                                <li><a class="dropdown-item" href="#">Trung bình</a></li>
                                <li><a class="dropdown-item" href="#">Khó</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card border-0 shadow-sm">
                        <table class="table table-hover mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th class="ps-4">Trạng thái</th>
                                    <th>Tiêu đề</th>
                                    <th>Độ khó</th>
                                    <th>Tỷ lệ chấp nhận</th>
                                    <th class="text-end pe-4">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="ps-4"><i class="bi bi-check-circle-fill text-success"></i></td>
                                    <td><a href="/editor?id=1" class="text-decoration-none fw-medium">A + B Problem</a></td>
                                    <td><span class="badge bg-success-light text-success">Dễ</span></td>
                                    <td>85%</td>
                                    <td class="text-end pe-4"><a href="/editor?id=1" class="btn btn-sm btn-outline-primary">Làm bài</a></td>
                                </tr>
                                <!-- Dữ liệu mẫu sẽ được thay thế bằng dữ liệu thực từ ProblemService -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
}