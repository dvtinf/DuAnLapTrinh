/**
 * D:\DuAnLapTrinh\frontend\src\services\problem_service.js
 * Quản lý dữ liệu bài tập
 */
export default class ProblemService {
    constructor(db) {
        this.db = db;
        this.collection = 'problems';
    }

    // Lấy danh sách bài tập (Hỗ trợ phân trang và lọc độ khó)
    async getProblems(filters = {}) {
        try {
            let query = this.db.collection(this.collection).where('status', '==', 'public');
            
            if (filters.difficulty) {
                query = query.where('difficulty', '==', filters.difficulty);
            }
            
            const snapshot = await query.get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error("Error fetching problems:", error);
            return [];
        }
    }
}