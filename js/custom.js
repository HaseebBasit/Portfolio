(function () {

    'use strict';


    /* =========================================================
       DETECT MOBILE
    ========================================================= */

    var isMobile = {

        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },

        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },

        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },

        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },

        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },

        any: function () {
            return (
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            );
        }

    };


    /* =========================================================
       NAVIGATION
    ========================================================= */

    var OnePageNav = function () {

        var navToggler = $('.navbar-toggler');

        $(".smoothscroll[href^='#'], #pb-navbar ul li a[href^='#']")
            .on('click', function (e) {

                e.preventDefault();

                var hash = this.hash;

                if ($(hash).length) {

                    $('html, body').animate({

                        scrollTop: $(hash).offset().top

                    }, 700, 'easeInOutExpo', function () {

                        window.location.hash = hash;

                    });

                }

            });


        $("#pb-navbar ul li a[href^='#']")
            .on('click', function () {

                if (navToggler.is(':visible')) {

                    navToggler.click();

                }

            });


        $('body').on('activate.bs.scrollspy', function () {

            console.log('nice');

        });

    };


    /* =========================================================
       OFF CANVAS NAVIGATION
    ========================================================= */

    var offCanvasNav = function () {

        /*
         * Original off-canvas navigation code
         * intentionally kept empty.
         */

    };


    /* =========================================================
       GENERAL SCROLL ANIMATION
    ========================================================= */

    var contentWayPoint = function () {

        var i = 0;

        if (!$.fn.waypoint) {
            return;
        }

        $('.site-animate').waypoint(

            function (direction) {

                if (
                    direction === 'down' &&
                    !$(this.element).hasClass('site-animated')
                ) {

                    i++;

                    $(this.element).addClass('item-animate');


                    setTimeout(function () {

                        $('body .site-animate.item-animate')
                            .each(function (k) {

                                var el = $(this);

                                setTimeout(function () {

                                    var effect =
                                        el.data('animate-effect');


                                    if (effect === 'fadeIn') {

                                        el.addClass(
                                            'fadeIn site-animated'
                                        );

                                    }

                                    else if (
                                        effect === 'fadeInLeft'
                                    ) {

                                        el.addClass(
                                            'fadeInLeft site-animated'
                                        );

                                    }

                                    else if (
                                        effect === 'fadeInRight'
                                    ) {

                                        el.addClass(
                                            'fadeInRight site-animated'
                                        );

                                    }

                                    else {

                                        el.addClass(
                                            'fadeInUp site-animated'
                                        );

                                    }


                                    el.removeClass(
                                        'item-animate'
                                    );

                                }, k * 100);

                            });

                    }, 100);

                }

            },

            {
                offset: '95%'
            }

        );

    };


    /* =========================================================
       NAVBAR STATE
    ========================================================= */

    var navbarState = function () {

        var lastScrollTop = 0;

        $(window).scroll(function () {

            var $this = $(this);

            var st = $this.scrollTop();

            var navbar = $('.site-navbar');


            if (st > 200) {

                navbar.addClass('scrolled');

            }

            else {

                navbar.removeClass('scrolled awake');

            }


            if (
                navbar.hasClass('scrolled') &&
                st > 300
            ) {

                if (st > lastScrollTop) {

                    /*
                     * Navbar sleep animation can be enabled here
                     */

                }

                else {

                    /*
                     * Navbar awake animation can be enabled here
                     */

                }


                lastScrollTop = st;

            }

        });

    };


    /* =========================================================
       STELLAR PARALLAX
    ========================================================= */

    var siteStellar = function () {

        if (!$.fn.stellar) {
            return;
        }

        $(window).stellar({

            responsive: true,

            parallaxBackgrounds: true,

            parallaxElements: true,

            horizontalScrolling: false,

            hideDistantElements: false,

            scrollProperty: 'scroll'

        });

    };


    /* =========================================================
       PAGE NAV
    ========================================================= */

    var clickMenu = function () {

        $('.navbar-nav a:not([class="external"])')
            .click(function (event) {

                var section = $(this).data('nav-section');

                var navbar = $('.navbar-nav');


                if (isMobile.any()) {

                    $('.navbar-toggle').click();

                }


                if (
                    $('[data-section="' + section + '"]').length
                ) {

                    $('html, body').animate({

                        scrollTop:
                            $('[data-section="' + section + '"]')
                                .offset()
                                .top

                    }, 500, 'easeInOutExpo');

                }


                event.preventDefault();

                return false;

            });

    };


    /* =========================================================
       ACTIVE NAVIGATION
    ========================================================= */

    var navActive = function (section) {

        var $el = $('.navbar-nav');

        $el.find('li').removeClass('active');


        $el.each(function () {

            $(this)
                .find(
                    'a[data-nav-section="' +
                    section +
                    '"]'
                )
                .closest('li')
                .addClass('active');

        });

    };


    /* =========================================================
       NAVIGATION SECTION
    ========================================================= */

    var navigationSection = function () {

        if (!$.fn.waypoint) {
            return;
        }


        var $section = $('section[data-section]');


        $section.waypoint(

            function (direction) {

                if (direction === 'down') {

                    navActive(
                        $(this.element).data('section')
                    );

                }

            },

            {
                offset: '150px'
            }

        );


        $section.waypoint(

            function (direction) {

                if (direction === 'up') {

                    navActive(
                        $(this.element).data('section')
                    );

                }

            },

            {

                offset: function () {

                    return -$(this.element).height() - 155;

                }

            }

        );

    };


    /* =========================================================
       SMOOTH SCROLL
    ========================================================= */

    var smoothScroll = function () {

        var $root = $('html, body');


        $('.smoothscroll').click(function () {

            var target = $($.attr(this, 'href'));


            if (target.length) {

                $root.animate({

                    scrollTop: target.offset().top

                }, 500);

            }


            return false;

        });

    };


    /* =========================================================
       MAGNIFIC POPUP
    ========================================================= */

    var magnificPopupControl = function () {

        if (!$.fn.magnificPopup) {
            return;
        }


        $('.image-popup').magnificPopup({

            type: 'image',

            removalDelay: 300,

            mainClass: 'mfp-with-zoom',

            gallery: {
                enabled: true
            },

            zoom: {

                enabled: true,

                duration: 300,

                easing: 'ease-in-out',

                opener: function (openerElement) {

                    return openerElement.is('img')
                        ? openerElement
                        : openerElement.find('img');

                }

            }

        });


        $('.with-caption').magnificPopup({

            type: 'image',

            closeOnContentClick: true,

            closeBtnInside: false,

            mainClass:
                'mfp-with-zoom mfp-img-mobile',

            image: {

                verticalFit: true,

                titleSrc: function (item) {

                    return (
                        item.el.attr('title') +
                        ' &middot; <a class="image-source-link" href="' +
                        item.el.attr('data-source') +
                        '" target="_blank">image source</a>'
                    );

                }

            },

            zoom: {

                enabled: true

            }

        });


        $('.popup-youtube, .popup-vimeo, .popup-gmaps')
            .magnificPopup({

                disableOn: 700,

                type: 'iframe',

                mainClass: 'mfp-fade',

                removalDelay: 160,

                preloader: false,

                fixedContentPos: false

            });

    };


    /* =========================================================
       PORTFOLIO MASONRY / FILTER
       FIXED VERSION
    ========================================================= */

    var portfolioMasonry = function () {

        /*
         * IMPORTANT:
         * We first find the grid.
         * Then initialize Isotope.
         * Then attach filter buttons.
         *
         * This prevents "$grid is not defined"
         * and duplicate Isotope initialization.
         */


        var $grid = $('.filters-content .grid');


        if (!$grid.length) {

            return;

        }


        /*
         * Make sure Isotope exists.
         */

        if (!$.fn.isotope) {

            console.error(
                'Isotope plugin is not loaded.'
            );

            return;

        }


        /*
         * Initialize function
         */

        var initializePortfolio = function () {

            /*
             * Destroy any previous Isotope instance.
             * This prevents duplicate initialization.
             */

            if ($grid.data('isotope')) {

                $grid.isotope('destroy');

            }


            /*
             * Initialize Isotope
             */

            $grid.isotope({

                itemSelector: '.single-portfolio',

                layoutMode: 'fitRows',

                percentPosition: true,

                transitionDuration: '0.5s',

                hiddenStyle: {

                    opacity: 0,

                    transform: 'scale(0.85)'

                },

                visibleStyle: {

                    opacity: 1,

                    transform: 'scale(1)'

                }

            });


            /*
             * IMPORTANT:
             * Remove any old click handlers first.
             */

            $('.filters ul li')
                .off('click.portfolioFilter');


            /*
             * FILTER BUTTON CLICK
             */

            $('.filters ul li')
                .on(
                    'click.portfolioFilter',
                    function (e) {

                        e.preventDefault();


                        var $this = $(this);


                        /*
                         * Get selected filter
                         */

                        var filterValue =
                            $this.attr('data-filter');


                        /*
                         * Safety check
                         */

                        if (
                            typeof filterValue ===
                            'undefined'
                        ) {

                            return;

                        }


                        /*
                         * Change active button
                         */

                        $('.filters ul li')
                            .removeClass('active');


                        $this.addClass('active');


                        /*
                         * APPLY ISOTOPE FILTER
                         */

                        $grid.isotope({

                            filter: filterValue

                        });


                        /*
                         * Force Isotope to relayout
                         * after filtering.
                         */

                        setTimeout(function () {

                            $grid.isotope('layout');

                        }, 550);

                    }
                );


            /*
             * Initial layout
             */

            setTimeout(function () {

                $grid.isotope('layout');

            }, 100);

        };


        /*
         * If imagesLoaded plugin exists,
         * wait for portfolio images.
         */

        if ($.fn.imagesLoaded) {

            $grid.imagesLoaded(function () {

                initializePortfolio();

            });

        }

        else {

            /*
             * Fallback if imagesLoaded isn't loaded.
             */

            initializePortfolio();

        }

    };


    /* =========================================================
       RESUME SCROLL ANIMATION
    ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            const resumeItems =
                document.querySelectorAll(
                    "#section-resume .resume-timeline .resume-item"
                );


            if (!resumeItems.length) {

                return;

            }


            /*
             * Fallback for browsers without
             * IntersectionObserver
             */

            if (!('IntersectionObserver' in window)) {

                resumeItems.forEach(function (item) {

                    item.classList.add("show");

                });

                return;

            }


            const observer =
                new IntersectionObserver(

                    function (entries) {

                        entries.forEach(function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },

                    {
                        threshold: 0.15
                    }

                );


            resumeItems.forEach(function (item) {

                observer.observe(item);

            });

        }
    );


    /* =========================================================
       SKILLS SECTION ANIMATION
    ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            const section =
                document.querySelector(
                    "#section-skills"
                );


            if (!section) {

                return;

            }


            const cards =
                section.querySelectorAll(
                    ".skill-card"
                );


            const stats =
                section.querySelectorAll(
                    ".skill-stat"
                );


            let started = false;


            /*
             * Number counter
             */

            function countNumber(
                element,
                target,
                suffix
            ) {

                if (!element) {

                    return;

                }


                const duration = 900;

                const start =
                    performance.now();


                function update(time) {

                    const progress =
                        Math.min(
                            (time - start) /
                            duration,
                            1
                        );


                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );


                    const value =
                        Math.round(
                            target * eased
                        );


                    element.textContent =
                        value + suffix;


                    if (progress < 1) {

                        requestAnimationFrame(
                            update
                        );

                    }

                }


                requestAnimationFrame(
                    update
                );

            }


            /*
             * IntersectionObserver
             */

            if (
                !('IntersectionObserver' in window)
            ) {

                cards.forEach(function (card) {

                    card.classList.add(
                        "show-skill"
                    );

                });


                stats.forEach(function (stat) {

                    stat.classList.add(
                        "show-stat"
                    );

                });


                return;

            }


            const observer =
                new IntersectionObserver(

                    function (entries) {

                        if (
                            entries[0].isIntersecting &&
                            !started
                        ) {

                            started = true;


                            /*
                             * Cards animation
                             */

                            cards.forEach(
                                function (
                                    card,
                                    index
                                ) {

                                    setTimeout(
                                        function () {

                                            card.classList.add(
                                                "show-skill"
                                            );

                                        },
                                        index * 80
                                    );

                                }
                            );


                            /*
                             * Stats animation
                             */

                            setTimeout(
                                function () {

                                    stats.forEach(
                                        function (
                                            stat
                                        ) {

                                            stat.classList.add(
                                                "show-stat"
                                            );

                                        }
                                    );


                                    if (
                                        stats.length >=
                                        4
                                    ) {

                                        countNumber(
                                            stats[0]
                                                .querySelector(
                                                    "h3"
                                                ),
                                            1,
                                            "+"
                                        );


                                        countNumber(
                                            stats[1]
                                                .querySelector(
                                                    "h3"
                                                ),
                                            12,
                                            "+"
                                        );


                                        countNumber(
                                            stats[2]
                                                .querySelector(
                                                    "h3"
                                                ),
                                            8,
                                            "+"
                                        );


                                        countNumber(
                                            stats[3]
                                                .querySelector(
                                                    "h3"
                                                ),
                                            100,
                                            "%"
                                        );

                                    }

                                },
                                650
                            );


                            observer.unobserve(
                                section
                            );

                        }

                    },

                    {
                        threshold: 0.2
                    }

                );


            observer.observe(section);

        }
    );


    /* =========================================================
       SERVICES SCROLL ANIMATION
    ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            const servicesSection =
                document.querySelector(
                    "#section-services"
                );


            if (!servicesSection) {

                return;

            }


            const serviceCards =
                servicesSection.querySelectorAll(
                    ".service-card"
                );


            if (
                !('IntersectionObserver' in window)
            ) {

                serviceCards.forEach(
                    function (card) {

                        card.classList.add(
                            "service-show"
                        );

                    }
                );

                return;

            }


            const servicesObserver =
                new IntersectionObserver(

                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    serviceCards.forEach(
                                        function (
                                            card
                                        ) {

                                            card.classList.add(
                                                "service-show"
                                            );

                                        }
                                    );


                                    servicesObserver.unobserve(
                                        servicesSection
                                    );

                                }

                            }
                        );

                    },

                    {
                        threshold: 0.2
                    }

                );


            servicesObserver.observe(
                servicesSection
            );

        }
    );


    /* =========================================================
       CONTACT SECTION ANIMATION
    ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            const contactSection =
                document.querySelector(
                    "#section-contact"
                );


            if (!contactSection) {

                return;

            }


            if (
                !('IntersectionObserver' in window)
            ) {

                contactSection.classList.add(
                    "contact-visible"
                );

                return;

            }


            const contactObserver =
                new IntersectionObserver(

                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    contactSection.classList.add(
                                        "contact-visible"
                                    );


                                    contactObserver.unobserve(
                                        contactSection
                                    );

                                }

                            }
                        );

                    },

                    {
                        threshold: 0.15
                    }

                );


            contactObserver.observe(
                contactSection
            );

        }
    );


    /* =========================================================
       DOCUMENT READY
    ========================================================= */

    $(function () {

        /*
         * Navigation
         */

        OnePageNav();

        offCanvasNav();

        contentWayPoint();

        navbarState();

        clickMenu();

        smoothScroll();


        /*
         * Portfolio
         */

        portfolioMasonry();


        /*
         * Optional plugins
         */

        magnificPopupControl();


        /*
         * Stellar only if available
         */

        if ($.fn.stellar) {

            siteStellar();

        }


        /*
         * Navigation section only
         * if Waypoint exists
         */

        if ($.fn.waypoint) {

            navigationSection();

        }

    });


})();

/* =========================================================
   MOBILE PORTFOLIO TAP BEHAVIOR
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /*
       Only run this behavior on mobile/tablet.
    */
    if (window.innerWidth > 767) {
        return;
    }


    const portfolioItems =
        document.querySelectorAll(".single-portfolio");


    portfolioItems.forEach(function (item) {

        const imageLink =
            item.querySelector(".img-pop-up");

        const viewButton =
            item.querySelector(".middle .text");


        if (!imageLink) return;


        /* =========================================
           FIRST TAP
           Show View Project
        ========================================= */

        imageLink.addEventListener("click", function (e) {

            /*
               If card is NOT active:
               don't open project.
            */

            if (!item.classList.contains("mobile-active")) {

                e.preventDefault();
                e.stopPropagation();

                /*
                   Remove active state from
                   other projects.
                */

                portfolioItems.forEach(function (otherItem) {

                    if (otherItem !== item) {
                        otherItem.classList.remove(
                            "mobile-active"
                        );
                    }

                });


                /*
                   Show View Project
                */

                item.classList.add(
                    "mobile-active"
                );

                return;
            }


            /*
               Second tap on image:
               do nothing / keep View Project visible.
            */

            e.preventDefault();
        });


        /* =========================================
           VIEW PROJECT BUTTON
           SECOND TAP → OPEN PROJECT
        ========================================= */

        if (viewButton) {

            viewButton.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    /*
                       Find the actual project link.
                    */

                    const projectLink =
                        item.querySelector(
                            ".p-inner a"
                        );


                    if (
                        projectLink &&
                        projectLink.href
                    ) {

                        window.open(
                            projectLink.href,
                            "_blank"
                        );

                    }

                }
            );

        }

    });


    /* =========================================
       TAP OUTSIDE
       CLOSE ACTIVE PROJECT
    ========================================= */

    document.addEventListener(
        "click",
        function (e) {

            portfolioItems.forEach(function (item) {

                if (
                    !item.contains(e.target)
                ) {

                    item.classList.remove(
                        "mobile-active"
                    );

                }

            });

        }
    );

});
