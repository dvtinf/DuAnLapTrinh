/**
 * D:\DuAnLapTrinh\backend\functions\ai_assistant.js
 * Cloud Function kết nối với LLM để hỗ trợ học sinh
 */
const { onCall } = require("firebase-functions/v2/https");

exports.analyzeCode = onCall(async (request) => {
    const { sourceCode, problemDesc } = request.data;
    
    // Tạo Prompt gửi cho AI
    const prompt = `
        Bạn là chuyên gia lập trình C++. Hãy phân tích đoạn mã sau:
        Mã nguồn: ${sourceCode}
        Đề bài: ${problemDesc}
        Hãy đưa ra:
        1. Nhận xét về thuật toán.
        2. Gợi ý tối ưu hóa (nếu có).
        3. Phát hiện lỗi logic tiềm ẩn.
    `;

    // Gọi API của mô hình AI và trả kết quả về cho Frontend
    // const aiResponse = await callAIModel(prompt);
    return { suggestion: "Thuật toán của bạn có độ phức tạp O(N^2), có thể tối ưu về O(N log N) bằng cách..." };
});