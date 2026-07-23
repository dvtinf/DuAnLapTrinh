/**
 * D:\DuAnLapTrinh\frontend\src\router.js
 * Quản lý điều hướng toàn diện (Dashboard, Auth, Problems, Editor, Result, Contest, Ranking, Admin)
 */
import Navbar from './components/navbar.js';

export default class Router {
    constructor() {
        this.appContainer = document.getElementById('app');
        this.navbar = new Navbar();
    }

    navigateTo(path) {
        window.history.pushState({}, "", path);
        this.handleRoute();
    }

    async handleRoute() {
        const path = window.location.pathname;
        const navHtml = this.navbar.render();
        let pageModule;

        try {
            if (path === '/') pageModule = await import('./pages/dashboard_page.js');
            else if (path === '/login') pageModule = await import('./pages/login_page.js');
            else if (path === '/register') pageModule = await import('./pages/register_page.js');
            else if (path === '/problems') pageModule = await import('./pages/problem_list_page.js');
            else if (path === '/editor') pageModule = await import('./pages/code_editor_page.js');
            else if (path === '/result') pageModule = await import('./pages/result_page.js');
            else if (path === '/ranking') pageModule = await import('./pages/ranking_page.js');
            else if (path === '/contests') pageModule = await import('./pages/contest_list_page.js'); // Route mới
            else if (path === '/profile') pageModule = await import('./pages/profile_page.js');
            else if (path === '/admin/problems') pageModule = await import('./pages/admin_problem_page.js');
            else if (path === '/admin/testcases') pageModule = await import('./pages/admin_testcase_page.js');
            
            if (pageModule) {
                const PageClass = new pageModule.default();
                this.appContainer.innerHTML = navHtml + PageClass.render();
            } else {
                this.appContainer.innerHTML = navHtml + `<div class="container mt-5"><h3>404 - Không tìm thấy nội dung</h3></div>`;
            }
        } catch (error) {
            console.error("Router navigation error:", error);
        }
    }
}