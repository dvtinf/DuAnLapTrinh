/**
 * D:\DuAnLapTrinh\frontend\src\pages\register_page.js
 * Giao diện trang đăng ký tài khoản mới
 */
export default class RegisterPage {
    render() {
        return `
            <div class="row justify-content-center mt-5">
                <div class="col-md-5">
                    <div class="card shadow-lg border-0 p-4">
                        <div class="card-body">
                            <h3 class="text-center fw-bold mb-4">Đăng ký tài khoản</h3>
                            <form id="register-form">
                                <div class="mb-3">
                                    <label class="form-label">Tên hiển thị</label>
                                    <input type="text" id="reg-display-name" class="form-control" required placeholder="Nguyễn Văn A">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Email</label>
                                    <input type="email" id="reg-email" class="form-control" required placeholder="email@example.com">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Mật khẩu</label>
                                    <input type="password" id="reg-password" class="form-control" required placeholder="Tối thiểu 8 ký tự">
                                </div>
                                <div class="mb-4">
                                    <label class="form-label">Xác nhận mật khẩu</label>
                                    <input type="password" id="reg-confirm-password" class="form-control" required>
                                </div>
                                <button type="submit" class="btn btn-primary w-100 py-2 fw-bold">Tạo tài khoản</button>
                            </form>
                            <div class="text-center mt-3">
                                <small class="text-muted">Đã có tài khoản? <a href="/login" class="text-primary">Đăng nhập</a></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}