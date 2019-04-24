import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import 'slick-carousel';

$(() => {
    $('.modal').each(function() {
        $(this).wrap('<div class="overlay"></div>');
    });

    $('.open-modal').on('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation;

        var $this = $(this),
            modal = $($this).data('modal');

        $(modal)
            .parents('.overlay')
            .addClass('open');
        setTimeout(function() {
            $(modal).addClass('open');
        }, 350);

        $(document).on('click', function(e) {
            var target = $(e.target);

            if ($(target).hasClass('overlay')) {
                $(target)
                    .find('.modal')
                    .each(function() {
                        $(this).removeClass('open');
                    });
                setTimeout(function() {
                    $(target).removeClass('open');
                }, 350);
            }
        });
    });

    $('.close-modal').on('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation;

        var $this = $(this),
            modal = $($this).data('modal');

        $(modal).removeClass('open');
        setTimeout(function() {
            $(modal)
                .parents('.overlay')
                .removeClass('open');
        }, 350);
    });

    // BURGER
    $('.menuToggle').on('click', () => {
        $('nav').addClass('d-flex');
        $('.header').addClass('header-burger');
        $('.item__wrap-log').css('display', 'block !important');
        $('.menu').addClass('burger-bg');
        $('.menu').slideToggle(300, (_, menu) => {
            if ($(menu).css('display') === 'none') {
                $(menu).removeAttr('style');
            }
        });
        if ($('.menuToggle').css('display') === 'block') {
            $('.menuToggle__close')
                .fadeToggle(100)
                .css('display', 'block');
        }
    });

    // FORM
    $('.btn-green').click(function() {
        $('.create-acc')
            .addClass('body-absolute-bg')
            .css('display', 'block');
    });

    $('.close').click(function() {
        $('.create-acc').css('display', 'none');
    });

    $('.header__form-list').click(function() {
        $('.header__form-list li')
            .not(':first-of-type')
            .hide();

        $('.header__form-list li')
            .fadeToggle(100)
            .css('display', 'block');
    });

    // CLICK ON INPUT
    $('.header__form input').click(function() {
        $('.search-items')
            .fadeToggle(100)
            .css('display', 'block');
        $('.header__form-text').css('display', 'none');
    });

    $('.btn-white').click(function(event) {
        event.preventDefault();
        $('.body-poppup-sign')
            .addClass('body-bg')
            .css('display', 'block');
        $('.close').click(function() {
            $('.body-poppup-sign').css('display', 'none');
        });
    });

    $('.sign-up__btn-one, .sign-up__btn-two').click(function(event) {
        event.preventDefault();
        $('.body-poppup-sign-acc')
            .addClass('body-bg')
            .css('display', 'block');
        $('.close').click(function() {
            $('.body-poppup-sign-acc').css('display', 'none');
        });
    });

    // POPPUP bookmark
    $('.description__btn-blue').click(function(event) {
        event.preventDefault();
        $('.body-poppup-bookmark')
            .addClass('body-bg')
            .css('display', 'block');
        $('.close').click(function() {
            $('.body-poppup-bookmark').css('display', 'none');
        });
    });

    // ACCORDION FOOTER

    $('.accordion-header').on('click', (event) => {
        const accordion = event.currentTarget;

        if (
            !$(accordion)
                .next()
                .hasClass('opened')
        ) {
            $('.accordion-content.opened')
                .removeClass('opened')
                .fadeOut(100);
        }
        $(accordion)
            .next()
            .toggleClass('opened')
            .fadeToggle(100);

        $('.accordion-header').click(function() {
            $('.accordion__title').toggleClass('green');
            $('.accordion__title span').css('transform', 'rotate(-90deg)');
        });
    });

    $('.accordion__question').on('click', (event) => {
        const accordion = event.currentTarget;

        if (
            !$(accordion)
                .next()
                .hasClass('opened')
        ) {
            $('.accordion-content.opened')
                .removeClass('opened')
                .fadeOut(100);
        }
        $(accordion)
            .next()
            .toggleClass('opened')
            .fadeToggle(100);

        $('.accordion-header').click(function() {
            $('.accordion__title').toggleClass('green');
            $('.accordion__title span').css('transform', 'rotate(-90deg)');
        });
    });

    $('.btn-primary').click(function() {
        $('.modal').modal('show');
    });

    // ACCORDION BUYER FOOTER
    $('.accordion__question-2').click(function() {
        $('.accordion__description-2').css('display', 'block');
        $('.accordion__description-1')
            .fadeToggle(100)
            .css('display', 'none');
    });
});
