document.addEventListener('DOMContentLoaded', function() {

    // --- Sticky Header ---
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body; // Cache body selector

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            // Prevent body scrolling when mobile menu is open
            body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // --- Mobile Submenu Toggles (NEW) ---
        const submenuToggles = mobileNav.querySelectorAll('.has-submenu > a');

        submenuToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                // Prevent navigation only if it's intended solely as a toggle
                e.preventDefault();

                const parentLi = toggle.parentElement; // The <li> containing the link and submenu
                const submenu = parentLi.querySelector('.submenu'); // Find the submenu within this li

                if (submenu) {
                    toggle.classList.toggle('submenu-open'); // Toggle class on the <a> for icon rotation
                    submenu.classList.toggle('active'); // Toggle class on the <ul> to show/hide
                }
            });
        });


        // Close mobile menu when a MAIN link (not submenu toggle) is clicked
        const mobileNavLinks = mobileNav.querySelectorAll('ul > li > a:not(.has-submenu > a)'); // Select only top-level links that ARE NOT submenu toggles
        const mobileNavSubmenuLinks = mobileNav.querySelectorAll('.submenu a'); // Select links within submenus

        const closeMobileMenu = () => {
             menuToggle.classList.remove('active');
             mobileNav.classList.remove('active');
             body.style.overflow = ''; // Restore scrolling
             // Optional: Close all submenus when the main menu closes
             mobileNav.querySelectorAll('.submenu.active').forEach(sub => sub.classList.remove('active'));
             mobileNav.querySelectorAll('.submenu-open').forEach(link => link.classList.remove('submenu-open'));
        };

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only close if it's a hash link or an external link
                 if (link.getAttribute('href') && (link.getAttribute('href').startsWith('#') || !link.getAttribute('href').startsWith('javascript:'))) {
                     // Check if the link is external or a hash link before closing
                     if (!e.defaultPrevented) { // Ensure default wasn't prevented (like by submenu toggle)
                         closeMobileMenu();
                     }
                 }
            });
        });

        mobileNavSubmenuLinks.forEach(link => {
             link.addEventListener('click', (e) => {
                 // Close menu when a submenu link is clicked
                 if (!e.defaultPrevented) {
                    closeMobileMenu();
                 }
             });
        });
    }


    // --- Smooth Scroll for Nav Links (if using hash links) ---
    // CSS `scroll-behavior: smooth;` handles this. JS added for potential offset needs if header height changes.
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Ensure targetId is a valid selector (starts with # and has more chars)
            if (targetId && targetId.length > 1 && targetId.startsWith('#')) {
                try {
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        e.preventDefault(); // Prevent default only if target exists
                        const headerOffset = header ? header.offsetHeight + 20 : 80; // Get dynamic header height or fallback + buffer
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                } catch (error) {
                    console.error("Error scrolling to element:", targetId, error);
                }
            }
        });
    });


    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Keep observing:
                    // observer.unobserve(entry.target);
                } else {
                    // Optional: Remove class to re-animate when scrolling back up
                    // entry.target.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% is visible
            // rootMargin: "0px 0px -50px 0px" // Optional: Trigger a bit earlier
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(element => element.classList.add('is-visible')); // Show elements immediately
    }


    // --- Placeholder for Video Click ---
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            alert('Video demo không có sẵn.');
            // Implement video modal logic here if needed
        });
    }

     // --- Placeholder for Manage Cookies Button ---
    const manageCookiesButton = document.querySelector('.manage-cookies-button');
    if (manageCookiesButton) {
        manageCookiesButton.addEventListener('click', () => {
            alert('Chức năng quản lý cookie chưa được triển khai.');
            // Implement cookie management logic here if needed
        });
    }

    // --- Make Placeholder Author Links Non-functional ---
    // Select specifically the links within the post-authors spans
    const authorLinks = document.querySelectorAll('.post-authors span a');
    authorLinks.forEach(link => {
        // Check if the href attribute is exactly 'link_placeholder'
        if(link.getAttribute('href') === 'link_placeholder') {
            link.addEventListener('click', (e) => {
               e.preventDefault(); // Prevent navigation
               console.log("Placeholder author link clicked (non-functional):", link.textContent.trim());
               // Optionally show a tooltip or message
               link.setAttribute('title', 'Thông tin tác giả chưa có sẵn'); // Add a tooltip
            });
            // Styles are now handled in CSS
        }
    });

});