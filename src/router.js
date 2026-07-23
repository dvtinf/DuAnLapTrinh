import Navbar from './components/navbar.js';

export default class Router {
    constructor() {
        this.appContainer = document.getElementById('app');
        this.navbar = new Navbar();
        // Xử lý đường dẫn cho GitHub Pages (ví dụ: /DuAnLapTrinh/)
        this.basePath = window.location.pathname.startsWith('/DuAnLapTrinh') ? '/DuAnLapTrinh' : '';
    }

    navigateTo(path) {
        window.history.pushState({}, "", this.basePath + path);
        this.handleRoute();
    }

    async handleRoute() {
        let path = window.location.pathname;
        if (this.basePath && path.startsWith(this.basePath)) {
            path = path.substring(this.basePath.length) || '/';
        }

        const navHtml = this.navbar.render();
        let pageModule;

        try {
            // Lazy loading các trang theo đặc tả hiệu năng [6, 7]
            if (path === '/' || path === '/index.html') pageModule = await import('./pages/dashboard_page.js');
            else if (path === '/login') pageModule = await import('./pages/login_page.js');
            else if (path === '/problems') pageModule = await import('./pages/problem_list_page.js');
            else if (path === '/editor') pageModule = await import('./pages/code_editor_page.js');
            else if (path === '/ranking') pageModule = await import('./pages/ranking_page.js');
            
            if (pageModule) {
                const page = new pageModule.default();
                this.appContainer.innerHTML = navHtml + page.render();
                if (page.init) await page.init();
            }
        } catch (e) { console.error("Router Error:", e); }
    }
}