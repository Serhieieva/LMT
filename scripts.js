$(function () {
    'use strict';

    var $mainMenu = $('#mainMenu');
    var $mainMenuItems = $mainMenu.find('> li');

    var $story = $('.story');
    var $strategy = $('.strategy');
    var $portfolio = $('.portfolio');
    var $arrow = $('#fp-arrow');

    $('#fullpage').fullpage({
        paddingTop: $('#header').outerHeight(),
        easingcss3: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
        menu: '#mainMenu',
        scrollOverflow: true,
        scrollOverflowOptions: {
            tap: true,
            scrollbars: true,
            mouseWheel: false,
            hideScrollbars: false,
            fadeScrollbars: false,
            disableMouse: false,
            interactiveScrollbars: true
        },
        recordHistory: false,
        touchSensitivity: 30,
        normalScrollElementTouchThreshold: 1,
        onLeave: function (index, nextIndex, direction) {
            if (index > 1) {
                setSize();
            }

            if (index === 2 && (nextIndex === 1 || nextIndex === 3)) {
                var elements = $story.find('p');
                var active = $story.data('active');

                if ((direction === 'up' && active > 0) || (direction === 'down' && active + 1 < elements.length) && $(window).width() > 767) {

                    elements.map(function (i, p) {
                        $(p).removeClass('active');
                    });

                    if (direction === 'up') {
                        active--;
                    } else {
                        active++;
                    }

                    elements.eq(active).addClass('active');
                    $story.data('active', active);

                    return false;
                }
            }

            // Remove the inactive class from arrow
            $arrow.find('.next').removeClass('inactive');

            // Add inactive class if needed
            if (nextIndex === 1 || nextIndex === $('.fp-section').length) {
                $arrow.find('.next').addClass('inactive');
            }

            var noScroll = [7, 12, 13, 14].indexOf(nextIndex) >= 0;
            noScroll = noScroll || [6, 11].indexOf(nextIndex) >= 0 && direction === 'up';
            noScroll = noScroll || [8, 15].indexOf(nextIndex) >= 0 && direction === 'down';


            if (noScroll && $(window).width() > 767) {
                $.fn.fullpage.setScrollingSpeed(0);
            } else {
                $.fn.fullpage.setScrollingSpeed(700);
            }

        },
        afterLoad : function (anchorLink, index) {
            if (index !== 1 && index !== $('.fp-section').length) {
                $arrow.find('.next').removeClass('inactive');
            }
        },
        afterResize: function () {
            $.fn.fullpage.reBuild();
            setSize();
        },
        afterRender: function () {
            setSize();
        }
    });

    $('.logo').on('click', function () {
        $.fn.fullpage.moveTo('company');
    });

    $('.sandwich').on('click', function () {
        $('html').addClass('menu-active');

        $('#mainMenu li, .close-menu').one('click', function () {
            $('html').removeClass('menu-active');
        });
    });

    $arrow.append($('<span class="next inactive animate"></span>'));

    // Add actions to the arrows
    $arrow.find('.next').on('click', function () {
        $.fn.fullpage.moveSectionDown();
    });

    function setSize() {
        var portfolioContentHeight = Math.max.apply(null, $portfolio.find('.portfolio-content').map(function () {
            return $(this).height();
        }).get());

        $portfolio.find('.portfolio-content').height(portfolioContentHeight);

        var strategyContentHeight = Math.max.apply(null, $strategy.find('p').map(function () {
            return $(this).height();
        }).get());

        $strategy.find('p').height(strategyContentHeight);
    }

    /*
     // Toggle footer
     var $footer = $('.footer');
     $('.footer-open').on('click', function (event) {
     event.preventDefault();
     $footer.css('display', 'table');
     setHeaderHeight();
     $(window).on('resize', setHeaderHeight);
     });
     $('.footer-close').on('click', function () {
     $footer.css('display', 'none');
     $(window).off('resize', setHeaderHeight);
     });

     function setHeaderHeight () {
     var maxHeight = Math.max.apply(null, $footer.find('h3').map(function () {
     return $(this).height();
     }).get());
     $footer.find('h3').each(function () {
     $(this).height(maxHeight);
     });
     }

     $('form').on('submit', function () {
     var email,
     dataString,
     self = $(this);

     email = $(this).find('[name=email]');
     dataString = '&email=' + email.val();

     $.ajax({
     type: 'POST',
     url: 'email.php',
     data: dataString,
     success: function () {
     $('html').one('click',function (){self.find('.hint').fadeOut(100);});
     self.find('.hint').fadeIn(100);
     email.val('');
     }
     });

     return false;
     });*/
});