/**
 * D:\DuAnLapTrinh\frontend\src\pages\login_page.js
 * Giao diện trang đăng nhập hệ thống
 */
export default class LoginPage {
    render() {
        return `
            <div class="row justify-content-center mt-5">
                <div class="col-md-4">
                    <div class="card shadow-lg border-0 p-4">
                        <div class="card-body">
                            <h3 class="text-center fw-bold mb-4">Đăng nhập</h3>
                            <form id="login-form">
                                <div class="mb-3">
                                    <label class="form-label">Email</label>
                                    <input type="email" id="login-email" class="form-control" required placeholder="name@example.com">
                                </div>
                                <div class="mb-4">
                                    <label class="form-label">Mật khẩu</label>
                                    <input type="password" id="login-password" class="form-control" required placeholder="********">
                                </div>
                                <button type="submit" class="btn btn-primary w-100 py-2">Đăng nhập</button>
                            </form>
                            <div class="text-center mt-3">
                                <small class="text-muted">Chưa có tài khoản? <a href="/register" class="text-primary">Đăng ký ngay</a></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}