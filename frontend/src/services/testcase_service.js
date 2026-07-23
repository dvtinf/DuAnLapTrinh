/**
 * D:\DuAnLapTrinh\frontend\src\services\testcase_service.js
 * Quản lý dữ liệu kiểm thử
 */
export default class TestcaseService {
    constructor(db) {
        this.db = db;
        this.collection = 'testcases';
    }

    // Lấy test case theo ID bài tập
    async getByProblemId(problemId) {
        try {
            const snapshot = await this.db.collection(this.collection)
                                        .where('problem_id', '==', problemId)
                                        .get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Lỗi lấy test case:", error);
            return [];
        }
    }

    // Lưu test case mới
    async saveTestCase(testCaseData) {
        try {
            const docRef = await this.db.collection(this.collection).add(testCaseData);
            return docRef.id;
        } catch (error) {
            console.error("Lỗi lưu test case:", error);
            throw error;
        }
    }
}