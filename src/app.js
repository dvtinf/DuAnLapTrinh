import Router from './router.js';

class App {
    constructor() {
        this.router = new Router();
        this.init();
    }

    init() {
        // Xử lý sự kiện click cho điều hướng SPA [8]
        document.addEventListener('click', e => {
            const link = e.target.closest('[href]');
            if (link && link.getAttribute('href').startsWith('/')) {
                e.preventDefault();
                this.router.navigateTo(link.getAttribute('href'));
            }
        });

        window.addEventListener('popstate', () => this.router.handleRoute());
        this.router.handleRoute();
        console.log("Hệ thống C++ Judge vận hành trên GitHub đã sẵn sàng.");
    }
}

document.addEventListener('DOMContentLoaded', () => { window.app = new App(); });