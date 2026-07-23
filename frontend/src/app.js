/**
 * D:\DuAnLapTrinh\frontend\src\app.js
 * Điểm khởi tạo ứng dụng (Phiên bản tối ưu hiệu năng)
 */
import Router from './router.js';

class App {
    constructor() {
        this.router = new Router();
        this.init();
    }

    async init() {
        console.log("C++ Online Judge System Initializing...");
        
        // 1. Đăng ký Service Worker để tối ưu Cache
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/sw.js');
                console.log("Service Worker registered successfully.");
            } catch (error) {
                console.log("Service Worker registration failed.");
            }
        }

        // 2. Theo dõi hiệu năng (Performance Monitoring)
        this.monitorPerformance();

        // 3. Xử lý điều hướng (SPA)
        document.addEventListener('click', e => {
            const link = e.target.closest('[href]');
            if (link && link.getAttribute('href').startsWith('/')) {
                e.preventDefault();
                this.router.navigateTo(link.getAttribute('href'));
            }
        });

        window.addEventListener('popstate', () => this.router.handleRoute());
        this.router.handleRoute();
    }

    // Ghi lại các thông số hiệu năng để tối ưu Lighthouse
    monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const paint = performance.getEntriesByType('paint');
                paint.forEach(entry => console.log(`${entry.name}: ${entry.startTime}ms`));
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});