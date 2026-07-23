/**
 * D:\DuAnLapTrinh\backend\functions\public_api.js
 * Cung cấp API cho các bên thứ ba tích hợp lõi chấm bài
 */
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

exports.v1_submit = onRequest(async (req, res) => {
    // 1. Xác thực API Key của bên thứ ba
    const apiKey = req.headers['x-api-key'];
    const partner = await admin.firestore().collection('api_keys').doc(apiKey).get();
    
    if (!partner.exists) {
        return res.status(401).json({ error: "API Key không hợp lệ" });
    }

    // 2. Tiếp nhận dữ liệu bài nộp (Source Code, Problem ID)
    const { source_code, problem_id } = req.body;
    
    // 3. Đẩy vào hàng đợi chấm bài (Judge Queue)
    const submission = await admin.firestore().collection('submissions').add({
        source_code,
        problem_id,
        partner_id: partner.id,
        status: 'pending',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(202).json({ 
        message: "Đã tiếp nhận bài nộp", 
        submission_id: submission.id 
    });
});