/* ─────────────────────────────────────────
   navbar.js — Dropdown, Search & Navigation
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

    // ============ PROFILE DROPDOWN ============
    const avatar = document.getElementById('userAvatar');
    const profileDropdown = document.getElementById('profileDropdown');

    if (avatar && profileDropdown) {

        avatar.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        profileDropdown.addEventListener('click', (e) => {
            const link = e.target.closest('a.profile-item');

            if (!link) {
                e.stopPropagation();
                return;
            }

            const href = link.getAttribute('href');
            const isLogout = link.id === 'logoutBtn';

            if (isLogout) {
                e.preventDefault();
                e.stopPropagation();
                profileDropdown.classList.remove('active');
                handleLogoutClick();
                return;
            }

            if (!href || href === '#') {
                e.preventDefault();
                e.stopPropagation();
                profileDropdown.classList.remove('active');
                return;
            }

            profileDropdown.classList.remove('active');
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.profile-wrapper')) {
                profileDropdown.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // ============ LOGOUT ============
    async function handleLogoutClick() {
        try {
            await logoutUser();
            window.location.href = 'login.html';
        } catch (err) {
            console.error('Logout error:', err);
            alert('Failed to sign out.');
        }
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (profileDropdown) profileDropdown.classList.remove('active');
            handleLogoutClick();
        });
    }

    // ============ SEARCH DATA ============
    // Add ALL your tutorials, lessons, pages here
    // Each item has: title, url, icon, category, tags

    const searchableItems = [

        // ── Pages ──
        { title: 'Home', url: 'homepage.html', icon: 'fa-home', category: 'page', tags: 'home main start' },
        { title: 'My Profile', url: 'profile.html', icon: 'fa-user', category: 'page', tags: 'profile account settings' },
        { title: 'About Us', url: 'about.html', icon: 'fa-info-circle', category: 'page', tags: 'about info information' },
        { title: 'Contact', url: 'contact.html', icon: 'fa-envelope', category: 'page', tags: 'contact email phone support' },

        // ── HTML Tutorials ──
        { title: 'HTML Introduction', url: 'tutorials/html-intro.html', icon: 'fa-code', category: 'html', tags: 'html intro basics beginner start' },
        { title: 'HTML Elements & Tags', url: 'tutorials/html-elements.html', icon: 'fa-code', category: 'html', tags: 'html elements tags p div span h1' },
        { title: 'HTML Headings', url: 'tutorials/html-headings.html', icon: 'fa-heading', category: 'html', tags: 'html headings h1 h2 h3 h4 h5 h6' },
        { title: 'HTML Paragraphs', url: 'tutorials/html-paragraphs.html', icon: 'fa-paragraph', category: 'html', tags: 'html paragraphs text p br' },
        { title: 'HTML Links', url: 'tutorials/html-links.html', icon: 'fa-link', category: 'html', tags: 'html links anchor a href url' },
        { title: 'HTML Images', url: 'tutorials/html-images.html', icon: 'fa-image', category: 'html', tags: 'html images img src alt' },
        { title: 'HTML Lists', url: 'tutorials/html-lists.html', icon: 'fa-list', category: 'html', tags: 'html lists ul ol li ordered unordered' },
        { title: 'HTML Tables', url: 'tutorials/html-tables.html', icon: 'fa-table', category: 'html', tags: 'html tables tr td th thead tbody' },
        { title: 'HTML Forms', url: 'tutorials/html-forms.html', icon: 'fa-file-alt', category: 'html', tags: 'html forms input button submit textarea select' },
        { title: 'HTML Semantic Elements', url: 'tutorials/html-semantic.html', icon: 'fa-code', category: 'html', tags: 'html semantic header nav main footer section article' },
        { title: 'HTML Attributes', url: 'tutorials/html-attributes.html', icon: 'fa-tags', category: 'html', tags: 'html attributes class id style' },
        { title: 'HTML Audio & Video', url: 'tutorials/html-media.html', icon: 'fa-film', category: 'html', tags: 'html audio video media player' },
        { title: 'HTML Div & Span', url: 'tutorials/html-div-span.html', icon: 'fa-layer-group', category: 'html', tags: 'html div span container block inline' },

        // ── CSS Tutorials ──
        { title: 'CSS Introduction', url: 'tutorials/css-intro.html', icon: 'fa-palette', category: 'css', tags: 'css intro basics beginner stylesheet' },
        { title: 'CSS Selectors', url: 'tutorials/css-selectors.html', icon: 'fa-palette', category: 'css', tags: 'css selectors class id element universal' },
        { title: 'CSS Colors', url: 'tutorials/css-colors.html', icon: 'fa-fill-drip', category: 'css', tags: 'css colors hex rgb rgba hsl background' },
        { title: 'CSS Box Model', url: 'tutorials/css-box-model.html', icon: 'fa-square', category: 'css', tags: 'css box model margin padding border content' },
        { title: 'CSS Fonts & Text', url: 'tutorials/css-fonts.html', icon: 'fa-font', category: 'css', tags: 'css fonts text typography size weight family' },
        { title: 'CSS Flexbox', url: 'tutorials/css-flexbox.html', icon: 'fa-columns', category: 'css', tags: 'css flexbox flex layout row column justify align' },
        { title: 'CSS Grid', url: 'tutorials/css-grid.html', icon: 'fa-th', category: 'css', tags: 'css grid layout columns rows template area' },
        { title: 'CSS Positioning', url: 'tutorials/css-positioning.html', icon: 'fa-arrows-alt', category: 'css', tags: 'css position relative absolute fixed sticky' },
        { title: 'CSS Animations', url: 'tutorials/css-animations.html', icon: 'fa-magic', category: 'css', tags: 'css animation transition keyframes transform hover' },
        { title: 'CSS Responsive Design', url: 'tutorials/css-responsive.html', icon: 'fa-mobile-alt', category: 'css', tags: 'css responsive media query mobile tablet desktop' },
        { title: 'CSS Variables', url: 'tutorials/css-variables.html', icon: 'fa-code', category: 'css', tags: 'css variables custom properties var root' },
        { title: 'CSS Borders & Shadows', url: 'tutorials/css-borders.html', icon: 'fa-border-style', category: 'css', tags: 'css border radius shadow box-shadow' },
        { title: 'CSS Display & Visibility', url: 'tutorials/css-display.html', icon: 'fa-eye', category: 'css', tags: 'css display none block inline flex visibility hidden' },

        // ── JavaScript Tutorials ──
        { title: 'JavaScript Introduction', url: 'tutorials/js-intro.html', icon: 'fa-js', category: 'js', tags: 'javascript js intro basics beginner start' },
        { title: 'JavaScript Variables', url: 'tutorials/js-variables.html', icon: 'fa-js', category: 'js', tags: 'javascript js variables let const var' },
        { title: 'JavaScript Data Types', url: 'tutorials/js-datatypes.html', icon: 'fa-js', category: 'js', tags: 'javascript js data types string number boolean array object' },
        { title: 'JavaScript Functions', url: 'tutorials/js-functions.html', icon: 'fa-js', category: 'js', tags: 'javascript js functions arrow return parameters' },
        { title: 'JavaScript If/Else', url: 'tutorials/js-conditions.html', icon: 'fa-js', category: 'js', tags: 'javascript js if else conditions switch' },
        { title: 'JavaScript Loops', url: 'tutorials/js-loops.html', icon: 'fa-redo', category: 'js', tags: 'javascript js loops for while forEach map' },
        { title: 'JavaScript Arrays', url: 'tutorials/js-arrays.html', icon: 'fa-js', category: 'js', tags: 'javascript js arrays push pop filter map reduce' },
        { title: 'JavaScript Objects', url: 'tutorials/js-objects.html', icon: 'fa-js', category: 'js', tags: 'javascript js objects keys values properties' },
        { title: 'JavaScript DOM', url: 'tutorials/js-dom.html', icon: 'fa-js', category: 'js', tags: 'javascript js dom document element query select' },
        { title: 'JavaScript Events', url: 'tutorials/js-events.html', icon: 'fa-mouse-pointer', category: 'js', tags: 'javascript js events click submit addEventListener' },
        { title: 'JavaScript Fetch / API', url: 'tutorials/js-fetch.html', icon: 'fa-cloud', category: 'js', tags: 'javascript js fetch api async await json' },
        { title: 'JavaScript ES6 Features', url: 'tutorials/js-es6.html', icon: 'fa-js', category: 'js', tags: 'javascript js es6 arrow spread destructure template' },
        { title: 'JavaScript Local Storage', url: 'tutorials/js-storage.html', icon: 'fa-database', category: 'js', tags: 'javascript js localStorage sessionStorage save' },
        { title: 'JavaScript Error Handling', url: 'tutorials/js-errors.html', icon: 'fa-bug', category: 'js', tags: 'javascript js try catch error throw' },

        // ── Video Tutorials ──
        { title: 'HTML Video Course', url: 'videos/html-course.html', icon: 'fa-play-circle', category: 'video', tags: 'html video course tutorial watch' },
        { title: 'CSS Video Course', url: 'videos/css-course.html', icon: 'fa-play-circle', category: 'video', tags: 'css video course tutorial watch' },
        { title: 'JavaScript Video Course', url: 'videos/js-course.html', icon: 'fa-play-circle', category: 'video', tags: 'javascript js video course tutorial watch' },
        { title: 'Flexbox Video Tutorial', url: 'videos/flexbox.html', icon: 'fa-play-circle', category: 'video', tags: 'css flexbox video tutorial layout' },
        { title: 'Grid Video Tutorial', url: 'videos/grid.html', icon: 'fa-play-circle', category: 'video', tags: 'css grid video tutorial layout' },
        { title: 'DOM Manipulation Video', url: 'videos/dom.html', icon: 'fa-play-circle', category: 'video', tags: 'javascript js dom video manipulation' },

        // ── Exercises ──
        { title: 'HTML Exercises', url: 'exercises/html-exercises.html', icon: 'fa-dumbbell', category: 'exercise', tags: 'html exercise practice quiz' },
        { title: 'CSS Exercises', url: 'exercises/css-exercises.html', icon: 'fa-dumbbell', category: 'exercise', tags: 'css exercise practice quiz' },
        { title: 'JavaScript Exercises', url: 'exercises/js-exercises.html', icon: 'fa-dumbbell', category: 'exercise', tags: 'javascript js exercise practice quiz' },

        // ── Learning Paths ──
        { title: 'HTML Learning Path', url: 'paths/html-path.html', icon: 'fa-road', category: 'path', tags: 'html path roadmap beginner learn order' },
        { title: 'CSS Learning Path', url: 'paths/css-path.html', icon: 'fa-road', category: 'path', tags: 'css path roadmap beginner learn order' },
        { title: 'JavaScript Learning Path', url: 'paths/js-path.html', icon: 'fa-road', category: 'path', tags: 'javascript js path roadmap beginner learn order' },
        { title: 'Full Web Dev Path', url: 'paths/full-path.html', icon: 'fa-road', category: 'path', tags: 'full stack web developer path roadmap all' },

        // ── Final Tests ──
        { title: 'QCM - Multiple Choice Test', url: 'tests/qcm.html', icon: 'fa-question-circle', category: 'test', tags: 'test qcm quiz multiple choice' },
        { title: 'Q&A - Written Answers', url: 'tests/qna.html', icon: 'fa-comments', category: 'test', tags: 'test qna question answer written' },
        { title: 'Small Project - Build It', url: 'tests/project.html', icon: 'fa-project-diagram', category: 'test', tags: 'test project build create final' },
    ];

    // Category labels for grouped display
    const categoryLabels = {
        page: '📄 Pages',
        html: '🟧 HTML Tutorials',
        css: '🟦 CSS Tutorials',
        js: '🟨 JavaScript Tutorials',
        video: '🎬 Video Tutorials',
        exercise: '💪 Exercises',
        path: '🗺️ Learning Paths',
        test: '📝 Tests'
    };

    // Category colors for badges
    const categoryColors = {
        page: '#888',
        html: '#e44d26',
        css: '#2965f1',
        js: '#f7df1e',
        video: '#ff0000',
        exercise: '#00cc66',
        path: '#ff9800',
        test: '#9c27b0'
    };

    // ============ SEARCH LOGIC ============
    const navSearchInput = document.getElementById('navSearchInput');
    const navSearchDropdown = document.getElementById('navSearchDropdown');
    const navSearchResults = document.getElementById('navSearchResults');

    let selectedIndex = -1; // For keyboard navigation

    if (navSearchInput && navSearchDropdown && navSearchResults) {

        navSearchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();
            selectedIndex = -1;

            if (query === '') {
                navSearchDropdown.classList.remove('active');
                navSearchResults.innerHTML = '';
                return;
            }

            // Search through title AND tags
            const matches = searchableItems.filter(item => {
                const haystack = (item.title + ' ' + item.tags).toLowerCase();
                // Match ALL words (so "css flex" matches "CSS Flexbox")
                const words = query.split(/\s+/);
                return words.every(word => haystack.includes(word));
            });

            renderResults(matches, query);
        });

        function renderResults(matches, query) {
            navSearchResults.innerHTML = '';

            if (matches.length === 0) {
                navSearchResults.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search" style="font-size:20px; margin-bottom:8px; color:#555;"></i>
                        <div>No results for "<strong>${escapeHtml(query)}</strong>"</div>
                        <div style="font-size:11px; color:#666; margin-top:4px;">Try different keywords</div>
                    </div>
                `;
                navSearchDropdown.classList.add('active');
                return;
            }

            // Group results by category
            const grouped = {};
            matches.forEach(item => {
                if (!grouped[item.category]) grouped[item.category] = [];
                grouped[item.category].push(item);
            });

            // Limit to 10 total results
            let count = 0;
            const maxResults = 10;

            Object.entries(grouped).forEach(([cat, items]) => {
                if (count >= maxResults) return;

                // Category header
                const header = document.createElement('li');
                header.className = 'search-category-header';
                header.textContent = categoryLabels[cat] || cat;
                navSearchResults.appendChild(header);

                items.forEach(item => {
                    if (count >= maxResults) return;

                    const li = document.createElement('li');
                    li.className = 'search-result-item';
                    li.dataset.url = item.url;

                    // Highlight matching text in title
                    const highlighted = highlightMatch(item.title, query);

                    li.innerHTML = `
                        <i class="fas ${item.icon}" style="color:${categoryColors[cat] || '#3ea6ff'}"></i>
                        <div class="search-result-text">
                            <span class="search-result-title">${highlighted}</span>
                        </div>
                        <span class="search-result-badge" style="background:${categoryColors[cat] || '#555'}">${cat.toUpperCase()}</span>
                    `;

                    li.addEventListener('click', () => {
                        navSearchDropdown.classList.remove('active');
                        navSearchInput.value = '';
                        if (item.url !== '#') {
                            window.location.href = item.url;
                        }
                    });

                    navSearchResults.appendChild(li);
                    count++;
                });
            });

            // Show "X results" count
            if (matches.length > maxResults) {
                const more = document.createElement('li');
                more.className = 'search-more-results';
                more.textContent = `+ ${matches.length - maxResults} more results...`;
                navSearchResults.appendChild(more);
            }

            navSearchDropdown.classList.add('active');
        }

        // Highlight matching text
        function highlightMatch(text, query) {
            const words = query.split(/\s+/).filter(w => w.length > 0);
            let result = escapeHtml(text);
            words.forEach(word => {
                const regex = new RegExp(`(${escapeRegex(word)})`, 'gi');
                result = result.replace(regex, '<mark>$1</mark>');
            });
            return result;
        }

        function escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        function escapeRegex(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        // ── Keyboard Navigation ──
        navSearchInput.addEventListener('keydown', (e) => {
            const items = navSearchResults.querySelectorAll('.search-result-item');
            if (!items.length) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
                updateSelection(items);
            }

            if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = Math.max(selectedIndex - 1, 0);
                updateSelection(items);
            }

            if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedIndex >= 0 && items[selectedIndex]) {
                    items[selectedIndex].click();
                }
            }

            if (e.key === 'Escape') {
                navSearchDropdown.classList.remove('active');
                navSearchInput.blur();
            }
        });

        function updateSelection(items) {
            items.forEach((item, i) => {
                item.classList.toggle('selected', i === selectedIndex);
            });
            // Scroll selected item into view
            if (items[selectedIndex]) {
                items[selectedIndex].scrollIntoView({ block: 'nearest' });
            }
        }

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-center')) {
                navSearchDropdown.classList.remove('active');
            }
        });

        // Focus search with Ctrl+K or /
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !e.target.closest('input, textarea'))) {
                e.preventDefault();
                navSearchInput.focus();
            }
        });
    }

    // ============ MOBILE SEARCH ============
    const mobileSearchToggle = document.getElementById('mobileSearchToggle');
    const mobileSearchOverlay = document.getElementById('mobileSearchOverlay');
    const mobileSearchBack = document.getElementById('mobileSearchBack');
    const mobileSearchInput = document.getElementById('mobileNavSearchInput');

    if (mobileSearchToggle && mobileSearchOverlay) {
        mobileSearchToggle.addEventListener('click', () => {
            mobileSearchOverlay.classList.add('active');
            if (mobileSearchInput) mobileSearchInput.focus();
        });
    }

    if (mobileSearchBack && mobileSearchOverlay) {
        mobileSearchBack.addEventListener('click', () => {
            mobileSearchOverlay.classList.remove('active');
        });
    }

    // ============ HAMBURGER ============
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarLogout = document.getElementById('sidebarLogout');

    function openSidebar() {
        if (sidebar) sidebar.classList.add('active');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Hamburger toggles sidebar
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (sidebar && sidebar.classList.contains('active')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    // X button closes sidebar
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    // Clicking dark overlay closes sidebar
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Escape key closes sidebar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    // Sidebar logout
    if (sidebarLogout) {
        sidebarLogout.addEventListener('click', async (e) => {
            e.preventDefault();
            closeSidebar();
            try {
                await logoutUser();
                window.location.href = 'login.html';
            } catch (err) {
                console.error('Logout error:', err);
            }
        });
    }

});