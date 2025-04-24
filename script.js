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

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            // Optional: Prevent body scrolling when mobile menu is open
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when a link is clicked
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Only close if it's a hash link or an external link that should close the menu
                if (link.getAttribute('href').startsWith('#') || link.classList.contains('mobile-cta') || !link.getAttribute('href').startsWith('#')) {
                   menuToggle.classList.remove('active');
                   mobileNav.classList.remove('active');
                   document.body.style.overflow = ''; // Restore scrolling
                }
            });
        });
    }


    // --- Smooth Scroll for Nav Links (if using hash links) ---
    // CSS `scroll-behavior: smooth;` is generally sufficient
    // Add JS only if needed for specific offsets or browser support.


    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Keep observing to allow re-animation if needed, or unobserve:
                    // observer.unobserve(entry.target);
                } else {
                    // Optional: Remove class if you want animation to repeat when scrolling back up
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
        // Fallback for browsers that don't support IntersectionObserver
        animatedElements.forEach(element => element.classList.add('is-visible')); // Show elements immediately
    }


    // --- Placeholder for Video Click ---
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            alert('Video demo không có sẵn.');
            // Implement video modal logic here
        });
    }

     // --- Placeholder for Manage Cookies Button ---
    const manageCookiesButton = document.querySelector('.manage-cookies-button');
    if (manageCookiesButton) {
        manageCookiesButton.addEventListener('click', () => {
            alert('Chức năng quản lý cookie chưa được triển khai.');
            // Implement cookie management logic here
        });
    }

    // --- Placeholder Author Links ---
    // If author spans contain links (<a> tags), add event listeners if needed
    // const authorLinks = document.querySelectorAll('.post-authors span a');
    // authorLinks.forEach(link => {
    //     link.addEventListener('click', (e) => {
    //         // Example: prevent default if it's a placeholder link
    //         if(link.getAttribute('href') === 'link_placeholder') {
    //            e.preventDefault();
    //            console.log("Placeholder author link clicked:", link.textContent);
    //         }
    //     });
    // });


});