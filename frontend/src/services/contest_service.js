/**
 * D:\DuAnLapTrinh\frontend\src\services\contest_service.js
 * Quản lý logic cuộc thi và bảng xếp hạng thời gian thực
 */
export default class ContestService {
    constructor(db) {
        this.db = db;
        this.collection = 'contests';
    }

    // Lấy danh sách cuộc thi đang diễn ra và sắp tới
    async getContests() {
        const now = new Date().toISOString();
        const snapshot = await this.db.collection(this.collection)
                                    .where('end_time', '>', now)
                                    .orderBy('start_time', 'asc')
                                    .get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    // Lấy bảng xếp hạng thời gian thực của cuộc thi
    subscribeToLeaderboard(contestId, callback) {
        return this.db.collection('submissions')
                    .where('contest_id', '==', contestId)
                    .orderBy('score', 'desc')
                    .orderBy('createdAt', 'asc')
                    .onSnapshot(snapshot => {
                        const rankings = snapshot.docs.map(doc => doc.data());
                        callback(rankings);
                    });
    }
}