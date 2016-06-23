$(function () {
    'use strict';
    var $arrow = $('#fp-arrow');

    $('#fullpage').fullpage({
        paddingTop: '300px',
        anchors: [
            'company',
            'story', 'mission', 'vision', 'values', 'push', 'partner', 'profitability',
            'portfolio',
            'pressNews',
            'jobs',
            'contactForm'
        ],
        menu: '#mainMenu',
        onLeave: function (index, nextIndex, direction) {
            // Remove the inactive class from arrow
            $arrow.find('.next').removeClass('inactive');

            // Add inactive class if needed
            if (nextIndex === $('.fp-section').length) {
                $arrow.find('.next').addClass('inactive');
            }
        }
    });

    /*$arrow.append('<span class="next"></span>');

     // Add actions to the arrows
     $arrow.find('.next').on('click', function () {
     if ($(this).hasClass('next')) {
     $.fn.fullpage.moveSectionDown();
     }
     });

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