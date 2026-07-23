/**
 * D:\DuAnLapTrinh\frontend\src\pages\code_editor_page.js
 * Giao diện làm bài tập với trình soạn thảo mã nguồn
 */
export default class CodeEditorPage {
    render(problem = { title: "Đang tải...", description: "", time_limit: 1, memory_limit: 256 }) {
        return `
            <div class="row g-0" style="height: calc(100vh - 70px);">
                <!-- Cột bên trái: Nội dung đề bài -->
                <div class="col-md-4 border-end bg-white overflow-auto p-4">
                    <h3 class="fw-bold">${problem.title}</h3>
                    <div class="d-flex gap-2 mb-3">
                        <span class="badge bg-light text-dark border">Time: ${problem.time_limit}s</span>
                        <span class="badge bg-light text-dark border">Memory: ${problem.memory_limit}MB</span>
                    </div>
                    <hr>
                    <div class="problem-description">
                        ${problem.description || "Nội dung đề bài đang được cập nhật..."}
                    </div>
                </div>

                <!-- Cột bên phải: Trình soạn thảo & Nộp bài -->
                <div class="col-md-8 d-flex flex-column">
                    <div id="monaco-editor-container" class="flex-grow-1">
                        <!-- Monaco Editor sẽ được render vào đây qua JS -->
                    </div>
                    <div class="p-3 bg-light border-top d-flex justify-content-between align-items-center">
                        <select class="form-select w-auto" id="language-select">
                            <option value="cpp">C++ 17 (g++)</option>
                        </select>
                        <button id="submit-code-btn" class="btn btn-primary px-5 fw-bold">
                            <i class="bi bi-send-fill me-2"></i>Nộp bài
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}