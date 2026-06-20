

document.addEventListener('DOMContentLoaded', () => {

    

    const hamburger      = document.querySelector('.hamburger');
    const sidebar        = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarClose   = document.getElementById('sidebarClose');
    const sidebarLogout  = document.getElementById('sidebarLogout');

    function openSidebar() {
        if (sidebar)        sidebar.classList.add('active');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        if (sidebar)        sidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar && sidebar.classList.contains('active')
                ? closeSidebar()
                : openSidebar();
        });
    }

    if (sidebarClose)   sidebarClose.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });

    if (sidebarLogout) {
        sidebarLogout.addEventListener('click', async (e) => {
            e.preventDefault();
            closeSidebar();
            try {
                await logoutUser();
                window.location.href = '/login.html';
            } catch (err) {
                console.error('Logout error:', err);
            }
        });
    }

    
    const currentPage = window.location.pathname.split('/').pop() || 'homepage.html';
    document.querySelectorAll('.sidebar-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });


    

    const avatar          = document.getElementById('userAvatar');
    const profileDropdown = document.getElementById('profileDropdown');

    if (avatar && profileDropdown) {

        avatar.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        profileDropdown.addEventListener('click', (e) => {
            const link = e.target.closest('a.profile-item');
            if (!link) { e.stopPropagation(); return; }

            const href     = link.getAttribute('href');
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
    }


    

    async function handleLogoutClick() {
        try {
            await logoutUser();
            window.location.href = '/login.html';
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


    

    const searchableItems = [
        { title: 'Home',                        url: '/homepage.html',                icon: 'fa-home',            category: 'page',     tags: 'home main start' },
        { title: 'My Profile',                  url: '/profile.html',                 icon: 'fa-user',            category: 'page',     tags: 'profile account settings' },
        { title: 'About Us',                    url: '/about.html',                   icon: 'fa-info-circle',     category: 'page',     tags: 'about info' },
        { title: 'Contact',                     url: '/contact.html',                 icon: 'fa-envelope',        category: 'page',     tags: 'contact email phone' },
        { title: 'HTML Introduction',           url: '/tutorials/html-intro.html',    icon: 'fa-code',            category: 'html',     tags: 'html intro basics beginner' },
        { title: 'HTML Elements & Tags',        url: '/tutorials/html-elements.html', icon: 'fa-code',            category: 'html',     tags: 'html elements tags div span' },
        { title: 'HTML Headings',               url: '/tutorials/html-headings.html', icon: 'fa-heading',         category: 'html',     tags: 'html headings h1 h2 h3' },
        { title: 'HTML Paragraphs',             url: '/tutorials/html-paragraphs.html', icon: 'fa-paragraph',     category: 'html',     tags: 'html paragraphs text' },
        { title: 'HTML Links',                  url: '/tutorials/html-links.html',    icon: 'fa-link',            category: 'html',     tags: 'html links anchor href' },
        { title: 'HTML Images',                 url: '/tutorials/html-images.html',   icon: 'fa-image',           category: 'html',     tags: 'html images img src' },
        { title: 'HTML Lists',                  url: '/tutorials/html-lists.html',    icon: 'fa-list',            category: 'html',     tags: 'html lists ul ol li' },
        { title: 'HTML Tables',                 url: '/tutorials/html-tables.html',   icon: 'fa-table',           category: 'html',     tags: 'html tables tr td th' },
        { title: 'HTML Forms',                  url: '/tutorials/html-forms.html',    icon: 'fa-file-alt',        category: 'html',     tags: 'html forms input button' },
        { title: 'HTML Semantic Elements',      url: '/tutorials/html-semantic.html', icon: 'fa-sitemap',         category: 'html',     tags: 'html semantic header footer nav' },
        { title: 'HTML Attributes',             url: '/tutorials/html-attributes.html', icon: 'fa-tags',          category: 'html',     tags: 'html attributes class id style' },
        { title: 'HTML Audio & Video',          url: '/tutorials/html-media.html',    icon: 'fa-film',            category: 'html',     tags: 'html audio video media' },
        { title: 'CSS Introduction',            url: '/tutorials/css-intro.html',     icon: 'fa-palette',         category: 'css',      tags: 'css intro basics stylesheet' },
        { title: 'CSS Selectors',               url: '/tutorials/css-selectors.html', icon: 'fa-palette',         category: 'css',      tags: 'css selectors class id' },
        { title: 'CSS Colors',                  url: '/tutorials/css-colors.html',    icon: 'fa-fill-drip',       category: 'css',      tags: 'css colors hex rgb' },
        { title: 'CSS Box Model',               url: '/tutorials/css-box-model.html', icon: 'fa-square',          category: 'css',      tags: 'css box model margin padding border' },
        { title: 'CSS Fonts & Text',            url: '/tutorials/css-fonts.html',     icon: 'fa-font',            category: 'css',      tags: 'css fonts text typography' },
        { title: 'CSS Flexbox',                 url: '/tutorials/css-flexbox.html',   icon: 'fa-columns',         category: 'css',      tags: 'css flexbox layout' },
        { title: 'CSS Grid',                    url: '/tutorials/css-grid.html',      icon: 'fa-th',              category: 'css',      tags: 'css grid layout columns' },
        { title: 'CSS Positioning',             url: '/tutorials/css-positioning.html', icon: 'fa-arrows-alt',    category: 'css',      tags: 'css position relative absolute fixed' },
        { title: 'CSS Animations',              url: '/tutorials/css-animations.html', icon: 'fa-magic',          category: 'css',      tags: 'css animation transition keyframes' },
        { title: 'CSS Responsive Design',       url: '/tutorials/css-responsive.html', icon: 'fa-mobile-alt',     category: 'css',      tags: 'css responsive media query mobile' },
        { title: 'JavaScript Introduction',     url: '/tutorials/js-intro.html',      icon: 'fa-js',              category: 'js',       tags: 'javascript js intro basics' },
        { title: 'JavaScript Variables',        url: '/tutorials/js-variables.html',  icon: 'fa-js',              category: 'js',       tags: 'javascript js variables let const' },
        { title: 'JavaScript Data Types',       url: '/tutorials/js-datatypes.html',  icon: 'fa-js',              category: 'js',       tags: 'javascript js data types string number' },
        { title: 'JavaScript Functions',        url: '/tutorials/js-functions.html',  icon: 'fa-js',              category: 'js',       tags: 'javascript js functions arrow' },
        { title: 'JavaScript If/Else',          url: '/tutorials/js-conditions.html', icon: 'fa-js',              category: 'js',       tags: 'javascript js if else conditions' },
        { title: 'JavaScript Loops',            url: '/tutorials/js-loops.html',      icon: 'fa-redo',            category: 'js',       tags: 'javascript js loops for while' },
        { title: 'JavaScript Arrays',           url: '/tutorials/js-arrays.html',     icon: 'fa-js',              category: 'js',       tags: 'javascript js arrays push pop' },
        { title: 'JavaScript Objects',          url: '/tutorials/js-objects.html',    icon: 'fa-js',              category: 'js',       tags: 'javascript js objects keys' },
        { title: 'JavaScript DOM',              url: '/tutorials/js-dom.html',        icon: 'fa-js',              category: 'js',       tags: 'javascript js dom document element' },
        { title: 'JavaScript Events',           url: '/tutorials/js-events.html',     icon: 'fa-mouse-pointer',   category: 'js',       tags: 'javascript js events click' },
        { title: 'JavaScript Fetch / API',      url: '/tutorials/js-fetch.html',      icon: 'fa-cloud',           category: 'js',       tags: 'javascript js fetch api async' },
        { title: 'JavaScript ES6',              url: '/tutorials/js-es6.html',        icon: 'fa-js',              category: 'js',       tags: 'javascript js es6 arrow spread' },
        { title: 'JavaScript Local Storage',    url: '/tutorials/js-storage.html',    icon: 'fa-database',        category: 'js',       tags: 'javascript js localStorage save' },
        { title: 'HTML Video Course',           url: '/videos/html-course.html',      icon: 'fa-play-circle',     category: 'video',    tags: 'html video course' },
        { title: 'CSS Video Course',            url: '/videos/css-course.html',       icon: 'fa-play-circle',     category: 'video',    tags: 'css video course' },
        { title: 'JavaScript Video Course',     url: '/videos/js-course.html',        icon: 'fa-play-circle',     category: 'video',    tags: 'javascript js video course' },
        { title: 'HTML Exercises',              url: '/exercises/html-exercises.html', icon: 'fa-dumbbell',       category: 'exercise', tags: 'html exercise practice' },
        { title: 'CSS Exercises',               url: '/exercises/css-exercises.html', icon: 'fa-dumbbell',        category: 'exercise', tags: 'css exercise practice' },
        { title: 'JavaScript Exercises',        url: '/exercises/js-exercises.html',  icon: 'fa-dumbbell',        category: 'exercise', tags: 'javascript js exercise practice' },
        { title: 'HTML Learning Path',          url: '/paths/html-path.html',         icon: 'fa-road',            category: 'path',     tags: 'html path roadmap' },
        { title: 'CSS Learning Path',           url: '/paths/css-path.html',          icon: 'fa-road',            category: 'path',     tags: 'css path roadmap' },
        { title: 'JavaScript Learning Path',    url: '/paths/js-path.html',           icon: 'fa-road',            category: 'path',     tags: 'javascript js path roadmap' },
        { title: 'Full Web Dev Path',           url: '/paths/full-path.html',         icon: 'fa-map',             category: 'path',     tags: 'full stack web developer path' },
        { title: 'QCM - Multiple Choice',       url: '/test/qcm.html',                icon: 'fa-question-circle', category: 'test',     tags: 'test qcm quiz multiple choice' },
        { title: 'Q&A - Written Answers',       url: '/test/qna.html',                icon: 'fa-comments',        category: 'test',     tags: 'test qna question answer' },
        { title: 'Small Project',               url: '/test/project.html',            icon: 'fa-project-diagram', category: 'test',     tags: 'test project build create' },
    ];

    const categoryLabels = {
        page: '📄 Pages', html: '🟧 HTML', css: '🟦 CSS',
        js: '🟨 JavaScript', video: '🎬 Videos', exercise: '💪 Exercises',
        path: '🗺️ Paths', test: '📝 Tests'
    };

    const categoryColors = {
        page: '#888', html: '#e44d26', css: '#2965f1',
        js: '#b8a000', video: '#ff0000', exercise: '#00cc66',
        path: '#ff9800', test: '#9c27b0'
    };


    

    function escapeHtml(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function highlightMatch(text, query) {
        const words = query.split(/\s+/).filter(w => w.length > 0);
        let result = escapeHtml(text);
        words.forEach(word => {
            const regex = new RegExp(`(${escapeRegex(word)})`, 'gi');
            result = result.replace(regex, '<mark>$1</mark>');
        });
        return result;
    }

    function searchItems(query) {
        return searchableItems.filter(item => {
            const haystack = (item.title + ' ' + item.tags).toLowerCase();
            return query.split(/\s+/).every(word => haystack.includes(word));
        });
    }


    function renderResults(matches, query, resultsEl, wrapperEl) {
        resultsEl.innerHTML = '';

        if (matches.length === 0) {
            const noResult = document.createElement('div');
            noResult.className = 'no-results';
            noResult.innerHTML = `
                <i class="fas fa-search" style="font-size:20px;margin-bottom:8px;color:#555;"></i>
                <div>No results for "<strong>${escapeHtml(query)}</strong>"</div>
                <div style="font-size:11px;color:#666;margin-top:4px;">Try different keywords</div>`;
            resultsEl.appendChild(noResult);
            wrapperEl.classList.add('active');
            return;
        }

        
        const grouped = {};
        matches.forEach(item => {
            if (!grouped[item.category]) grouped[item.category] = [];
            grouped[item.category].push(item);
        });

        let count = 0;
        Object.entries(grouped).forEach(([cat, items]) => {
            if (count >= 10) return;

            
            const header = document.createElement('li');
            header.className   = 'search-category-header';
            header.textContent = categoryLabels[cat] || cat;
            resultsEl.appendChild(header);

            items.forEach(item => {
                if (count >= 10) return;

                const li = document.createElement('li');
                li.className = 'search-result-item';
                li.innerHTML = `
                    <i class="fas ${item.icon}" style="color:${categoryColors[cat] || '#3ea6ff'}"></i>
                    <div class="search-result-text">
                        <span class="search-result-title">${highlightMatch(item.title, query)}</span>
                    </div>
                    <span class="search-result-badge"
                          style="background:${categoryColors[cat] || '#555'}">
                        ${cat.toUpperCase()}
                    </span>`;

                li.addEventListener('click', () => {
                    wrapperEl.classList.remove('active');
                    if (item.url !== '#') window.location.href = item.url;
                });

                resultsEl.appendChild(li);
                count++;
            });
        });

        if (matches.length > 10) {
            const more = document.createElement('li');
            more.className   = 'search-more-results';
            more.textContent = `+ ${matches.length - 10} more results...`;
            resultsEl.appendChild(more);
        }

        wrapperEl.classList.add('active');
    }

    function updateSelection(items, index) {
        items.forEach((item, i) => item.classList.toggle('selected', i === index));
        if (items[index]) items[index].scrollIntoView({ block: 'nearest' });
    }


    

    const navSearchInput    = document.getElementById('navSearchInput');
    const navSearchDropdown = document.getElementById('navSearchDropdown');
    const navSearchResults  = document.getElementById('navSearchResults');
    let desktopSelectedIndex = -1;

    if (navSearchInput && navSearchDropdown && navSearchResults) {

        navSearchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();
            desktopSelectedIndex = -1;

            if (query === '') {
                navSearchDropdown.classList.remove('active');
                navSearchResults.innerHTML = '';
                return;
            }

            renderResults(searchItems(query), query, navSearchResults, navSearchDropdown);
        });

        navSearchInput.addEventListener('keydown', (e) => {
            const items = navSearchResults.querySelectorAll('.search-result-item');
            if (!items.length) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                desktopSelectedIndex = Math.min(desktopSelectedIndex + 1, items.length - 1);
                updateSelection(items, desktopSelectedIndex);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                desktopSelectedIndex = Math.max(desktopSelectedIndex - 1, 0);
                updateSelection(items, desktopSelectedIndex);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (desktopSelectedIndex >= 0 && items[desktopSelectedIndex]) {
                    items[desktopSelectedIndex].click();
                }
            } else if (e.key === 'Escape') {
                navSearchDropdown.classList.remove('active');
                navSearchInput.blur();
            }
        });

        
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey && e.key === 'k') ||
                (e.key === '/' && !e.target.closest('input, textarea'))) {
                e.preventDefault();
                navSearchInput.focus();
            }
        });

        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-center')) {
                navSearchDropdown.classList.remove('active');
            }
        });
    }


    

    const mobileSearchToggle  = document.getElementById('mobileSearchToggle');
    const mobileSearchOverlay = document.getElementById('mobileSearchOverlay');
    const mobileSearchBack    = document.getElementById('mobileSearchBack');
    const mobileSearchInput   = document.getElementById('mobileNavSearchInput');


    let mobileDropdown = null;
    let mobileResults  = null;

    if (mobileSearchOverlay) {
        
        mobileDropdown    = document.createElement('div');
        mobileDropdown.id = 'mobileSearchDropdown';
        mobileDropdown.className = 'mobile-search-dropdown';

        
        mobileResults    = document.createElement('ul');
        mobileResults.id = 'mobileSearchResults';

        
        mobileDropdown.appendChild(mobileResults);

        
        mobileSearchOverlay.appendChild(mobileDropdown);

        console.log('✅ Mobile search dropdown created');
    }

    let mobileSelectedIndex = -1;

    
    if (mobileSearchInput && mobileDropdown && mobileResults) {

        mobileSearchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();
            mobileSelectedIndex = -1;

            if (query === '') {
                
                mobileDropdown.classList.remove('active');
                mobileResults.innerHTML = '';
                return;
            }

            
            const matches = searchItems(query);
            renderResults(matches, query, mobileResults, mobileDropdown);

            console.log(`🔍 Mobile search: "${query}" → ${matches.length} results`);
        });

        
        mobileSearchInput.addEventListener('keydown', (e) => {
            const items = mobileResults.querySelectorAll('.search-result-item');
            if (!items.length) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                mobileSelectedIndex = Math.min(mobileSelectedIndex + 1, items.length - 1);
                updateSelection(items, mobileSelectedIndex);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                mobileSelectedIndex = Math.max(mobileSelectedIndex - 1, 0);
                updateSelection(items, mobileSelectedIndex);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (mobileSelectedIndex >= 0 && items[mobileSelectedIndex]) {
                    items[mobileSelectedIndex].click();
                }
            } else if (e.key === 'Escape') {
                closeMobileSearch();
            }
        });
    }

    
    if (mobileSearchToggle && mobileSearchOverlay) {
        mobileSearchToggle.addEventListener('click', () => {
            mobileSearchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            
            if (mobileSearchInput) {
                mobileSearchInput.value = '';
                
                setTimeout(() => mobileSearchInput.focus(), 100);
            }
            if (mobileDropdown) mobileDropdown.classList.remove('active');
            if (mobileResults)  mobileResults.innerHTML = '';
        });
    }

    
    function closeMobileSearch() {
        if (mobileSearchOverlay) mobileSearchOverlay.classList.remove('active');
        if (mobileDropdown)      mobileDropdown.classList.remove('active');
        if (mobileResults)       mobileResults.innerHTML = '';
        if (mobileSearchInput)   mobileSearchInput.value = '';
        document.body.style.overflow = '';
    }

    if (mobileSearchBack) {
        mobileSearchBack.addEventListener('click', closeMobileSearch);
    }

}); 