import '../../../scss/views/listing/index.scss';
import '../../components/poppup';

if (process.env.NODE_ENV !== 'production') {
    require('file-loader!../../../html/views/listing/index.html');
}

$(() => {
    // SLIDER
    if (window.innerWidth < 950) {
        $('.services__wrap').addClass('slick-slider');
        $('.slick-slider').slick({
            infinite: false,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerPaddingRight: '100px',
            nav: false,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    },
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ],
        });
    }

    // if(window.innerWidth < 640) {

    // }
});
