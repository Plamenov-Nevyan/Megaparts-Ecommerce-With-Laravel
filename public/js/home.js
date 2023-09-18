$(document).ready(function(){
    $( '#testimonials-slider' ).sliderPro();
    $('.header-bottom').slideDown('slow').css({'display': 'flex'})
    setTimeout(() => {
        $('.home-badge').fadeIn('slow').css({'display': 'flex'})
        $('.badge-slide').each(function(){
            $(this).fadeIn('slow').css({'display': 'flex'})
        })
        initNavBadgesSlide()
    }, 1000);
    setTimeout(() => {
        $('.quick-search-section').show('slide', {direction: 'right'}, 1000, function(){
            $(this).css({'display': 'flex'})
        })
       
    }, 2000)
    initBigSlide()
    initManualProductSlider()
   $(window).on('scroll', function(){
    console.log($(this).scrollTop())
        if($(this).scrollTop() >= 160){
            if($(this).scrollTop() >= 290){
                $('.advert-section').fadeIn('slow').css({'display' : 'flex'})
            }
            if($(this).scrollTop() >= 1000){
                let delay = 0
                $('.link-article').each(function(){
                    setTimeout(() => {
                        $(this).fadeIn(500)
                    }, delay)
                    delay += 500
                })
            }
            if($(this).scrollTop() >= 1500){
                let delay = 0
                $('.badge').each(function(){
                    setTimeout(() => {
                        $(this).show('slide', {direction: 'right'}, 500)
                    }, delay)
                    delay += 500
                })
            }
            if($(this).scrollTop() >= 2100){
                $('#map').show('slide', {direction: 'left'}, 500)
                let delay = 0
                $('.pin-sofia').effect( "bounce", {
                    direction: 'right',
                    distance: 40,
                    mode: 'show',
                    times: 3
                }, 2000 , function(){
                    $('.mega-logo-1').fadeIn('slow')  
                } )
                delay += 1000
                setTimeout(() => {
                    $('.pin-varna').effect( "bounce", {
                        direction: 'left',
                        distance: 40,
                        mode: 'show',
                        times: 3
                    }, 2000, function(){
                        $('.mega-logo-2').fadeIn('slow')  
                    })
                    
                }, delay)
            }
            if($(this).scrollTop() >= 2100){
                let delay = 0
                $('.footer-article').each(function(){
                    setTimeout(()=>{
                        $(this).slideDown('slow', function(){
                            $(this).css({'display' : 'flex'})
                            if($(this).attr('id') !== 'last-footer-article'){
                                let articleTop = $(this).find('.article-top')
                                let articleLinksList
                                let articleLinks
                                if($(articleTop).hasClass('article-top')){
                                    articleLinksList = $(articleTop).find('.links')
                                    articleLinks = $(articleLinksList).find('.link')
                                  
                                }else {
                                    articleLinksList = $(this).find('.links')
                                    articleLinks = $(articleLinksList).find('.link')
                                }
                                let linkDelay = 0
                                $(articleLinks).each(function(){
                                    setTimeout(() => {
                                        $(this).fadeIn('slow')
                                    }, linkDelay)
                                    linkDelay += 500
                                })
                            }else {
                               $(this).find('.article-top').effect('bounce', {
                                direction: 'left',
                                distance: 40,
                                mode: 'show',
                                times: 3
                               }, 2000)
                               $(this).find('.article-bottom').effect('bounce', {
                                direction: 'right',
                                distance: 40,
                                mode: 'show',
                                times: 3
                               }, 2000)
                            }
                        })
                    }, delay)
                    delay += 500
                })
            }
            $('.quick-search-section').css({'z-index': 0})
        }else {
            $('.quick-search-section').css({'z-index': 2})
        }
   })

    function initBigSlide(){
        let slideCount = $('.slide').length;
        let currentIndex = 0;
        $('.slide').hide();
        $('.active').show();
        $('.prev-slide').on('click', function () {
           currentIndex--;
           if (currentIndex < 0) {
              currentIndex = slideCount - 1;
           }
           showSlide(currentIndex);
        });
        $('.next-slide').on('click', function () {
           currentIndex++;
           if (currentIndex >= slideCount) {
              currentIndex = 0;
           }
           showSlide(currentIndex);
        });
        function showSlide(index) {
           $('.slide').hide().removeClass('active');
           $('.slide').eq(index).show().addClass('active');
        }
        showSlide(currentIndex);
    }

    function initNavBadgesSlide(){
        $('.badges-slide-links').slick({
            responsive: [
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 1008,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 800,
                  settings: 'unslick',
                },
              ],
        })

        $(window).resize(function () {
            $('.badges-slide-links').not('.slick-initialized').slick('resize');
        });
        
        $(window).on('orientationchange', function () {
            $('.badges-slide-links').not('.slick-initialized').slick('resize');
        });
    }

    function initManualProductSlider(){
        // $('.products-slider').slick({
        //     adaptiveHeight: true,
        // })
    }
})