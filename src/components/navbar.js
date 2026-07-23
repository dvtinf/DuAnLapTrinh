/**
 * D:\DuAnLapTrinh\frontend\src\components\navbar.js
 * Thành phần thanh điều hướng chính
 */
export default class Navbar {
    render(user = null) {
        return `
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
                <div class="container">
                    <a class="navbar-brand fw-bold" href="/">C++ JUDGE</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item"><a class="nav-link" href="/problems">Bài tập</a></li>
                            <li class="nav-item"><a class="nav-link" href="/ranking">Xếp hạng</a></li>
                        </ul>
                        <div class="d-flex align-items-center">
                            ${user ? `
                                <span class="text-white me-3">Chào, ${user.displayName}</span>
                                <button id="logout-btn" class="btn btn-outline-light btn-sm">Đăng xuất</button>
                            ` : `
                                <a href="/login" class="btn btn-outline-light btn-sm">Đăng nhập</a>
                            `}
                        </div>
                    </div>
                </div>
            </nav>
            <div style="height: 70px;"></div> <!-- Tạo khoảng trống cho navbar fixed -->
        `;
    }
}