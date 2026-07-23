/**
 * D:\DuAnLapTrinh\backend\index.js
 * Khởi tạo Firebase Cloud Functions cho Backend API
 */
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

// API Kiểm tra trạng thái hệ thống (Health Check)
exports.apiHealthCheck = onRequest((req, res) => {
    logger.info("Health Check Requested", { structuredData: true });
    res.status(200).json({
        status: "success",
        message: "C++ Online Judge Backend is running",
        timestamp: new Date().toISOString()
    });
});

// Các module Auth và Problem sẽ được export tại đây trong các bước tiếp theo