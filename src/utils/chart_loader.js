/**
 * D:\DuAnLapTrinh\frontend\src\utils\chart_loader.js
 * Tải chậm thư viện biểu đồ Chart.js để tối ưu hiệu năng
 */
export const loadCharts = async () => {
    try {
        const Chart = await import('https://cdn.jsdelivr.net/npm/chart.js');
        return Chart.default;
    } catch (error) {
        console.error("Lỗi khi nạp thư viện biểu đồ:", error);
        return null;
    }
};