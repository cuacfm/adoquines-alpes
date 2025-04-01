AOS.init({
	duration: 800,
	easing: 'slide',
	once: true
});

jQuery(document).ready(function($) {

   "use strict";

   

   var siteMenuClone = function() {

	   $('.js-clone-nav').each(function() {
		   var $this = $(this);
		   $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
	   });


	   setTimeout(function() {
		   
		   var counter = 0;
	 $('.site-mobile-menu .has-children').each(function(){
	   var $this = $(this);
	   
	   $this.prepend('<span class="arrow-collapse collapsed">');

	   $this.find('.arrow-collapse').attr({
		 'data-toggle' : 'collapse',
		 'data-target' : '#collapseItem' + counter,
	   });

	   $this.find('> ul').attr({
		 'class' : 'collapse',
		 'id' : 'collapseItem' + counter,
	   });

	   counter++;

	 });

   }, 1000);

	   $('body').on('click', '.arrow-collapse', function(e) {
	 var $this = $(this);
	 if ( $this.closest('li').find('.collapse').hasClass('show') ) {
	   $this.removeClass('active');
	 } else {
	   $this.addClass('active');
	 }
	 e.preventDefault();  
	 
   });

	   $(window).resize(function() {
		   var $this = $(this),
			   w = $this.width();

		   if ( w > 768 ) {
			   if ( $('body').hasClass('offcanvas-menu') ) {
				   $('body').removeClass('offcanvas-menu');
			   }
		   }
	   })

	   $('body').on('click', '.js-menu-toggle', function(e) {
		   var $this = $(this);
		   e.preventDefault();

		   if ( $('body').hasClass('offcanvas-menu') ) {
			   $('body').removeClass('offcanvas-menu');
			   $this.removeClass('active');
		   } else {
			   $('body').addClass('offcanvas-menu');
			   $this.addClass('active');
		   }
	   }) 

	   // click outisde offcanvas
	   $(document).mouseup(function(e) {
	   var container = $(".site-mobile-menu");
	   if (!container.is(e.target) && container.has(e.target).length === 0) {
		 if ( $('body').hasClass('offcanvas-menu') ) {
				   $('body').removeClass('offcanvas-menu');
			   }
	   }
	   });
   }; 
   siteMenuClone();


   var sitePlusMinus = function() {
	   $('.js-btn-minus').on('click', function(e){
		   e.preventDefault();
		   if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
			   $(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
		   } else {
			   $(this).closest('.input-group').find('.form-control').val(parseInt(0));
		   }
	   });
	   $('.js-btn-plus').on('click', function(e){
		   e.preventDefault();
		   $(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
	   });
   };
   // sitePlusMinus();


   var siteSliderRange = function() {
   $( "#slider-range" ).slider({
	 range: true,
	 min: 0,
	 max: 500,
	 values: [ 75, 300 ],
	 slide: function( event, ui ) {
	   $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	 }
   });
   $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
	 " - $" + $( "#slider-range" ).slider( "values", 1 ) );
   };
   // siteSliderRange();


   var siteMagnificPopup = function() {
	   $('.image-popup').magnificPopup({
	   type: 'image',
	   closeOnContentClick: true,
	   closeBtnInside: false,
	   fixedContentPos: true,
	   mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		gallery: {
		 enabled: true,
		 navigateByImgClick: true,
		 preload: [0,1] // Will preload 0 - before current, and 1 after the current image
	   },
	   image: {
		 verticalFit: true
	   },
	   zoom: {
		 enabled: true,
		 duration: 300 // don't foget to change the duration also in CSS
	   }
	 });

	 $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
	   disableOn: 700,
	   type: 'iframe',
	   mainClass: 'mfp-fade',
	   removalDelay: 160,
	   preloader: false,

	   fixedContentPos: false
	 });
   };
   siteMagnificPopup();


   function getSpanishOrdinal(num) {
     const ordinals = {
       1: "Primer",
       2: "Segundo",
       3: "Tercer",
       4: "Cuarto",
       5: "Quinto",
       6: "Sexto",
       7: "Séptimo",
       8: "Octavo",
       9: "Noveno",
       10: "Décimo",
       11: "Undécimo",
       12: "Duodécimo",
       13: "Decimotercer",
       14: "Decimocuarto",
       15: "Decimoquinto",
       16: "Decimosexto",
       17: "Decimoséptimo",
       18: "Decimoctavo",
       19: "Decimonoveno",
       20: "Vigésimo",
       30: "Trigésimo",
       40: "Cuadragésimo",
       50: "Quincuagésimo",
       60: "Sexagésimo",
       70: "Septuagésimo",
       80: "Octogésimo",
       90: "Nonagésimo"
     };

     if (num <= 20) {
       return ordinals[num];
     }

     const tens = Math.floor(num / 10) * 10;
     const ones = num % 10;
     
     if (ones === 0) {
       return ordinals[num];
     }
     
     return ordinals[tens] + " " + ordinals[ones].toLowerCase();
   }

   async function loadEpisodes() {
     try {
       const response = await fetch('episodes.json');
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       
       const data = await response.json();
       const episodes = data.episodes;
       
       // Sort episodes by ID in descending order (newest first)
       episodes.sort((a, b) => b.id - a.id);
       
       const carousel = document.querySelector('.nonloop-block-13');
       if (!carousel) {
         throw new Error('Carousel element not found');
       }
       
       // Clear any existing content
       carousel.innerHTML = '';
       
       // Add episodes to carousel
       episodes.forEach(episode => {
         const ordinal = getSpanishOrdinal(episode.id);
         const episodeElement = document.createElement('div');
         episodeElement.className = 'item';
         
         episodeElement.innerHTML = `
           <div class="block-12">
             <figure>
               <img src="${episode.cover_image}" alt="Image" class="img-fluid">
             </figure>
             <div class="text">
               <span class="meta">Episodio ${episode.id}</span>
               <div class="text-inner">
                 <span class="text-uppercase date d-block mb-3" style="color: #ccc"><small>CUAC FM&bullet; ${episode.date}</small></span>
                 <p>${ordinal} episodio de Los adoquines a los Alpes! El podcast donde hablamos de todo lo relacionado con el mundo de la bicicleta: noticias, carreras, consejos, entrevistas y mucho más</p>
                 <p class="mt-3"><a href="episodio.html?id=${episode.id}" class="link btn btn-primary btn-sm rounded-0 py-2 px-3">Leer más</a></p>
               </div>
             </div>
           </div>
         `;
         
         carousel.appendChild(episodeElement);
       });

       // Destroy existing carousel if it exists
       if (carousel.classList.contains('owl-loaded')) {
         $(carousel).trigger('destroy.owl.carousel');
       }

       // Initialize Owl Carousel with original settings
       $(carousel).owlCarousel({
         center: false,
         items: 1,
         loop: false,
         stagePadding: 20,
         margin: 30,
         autoplay: false,
         nav: true,
         dots: true,
         navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
         responsive:{
           600:{
             items: 1,
             stagePadding: 30,
             margin: 30
           },
           1000:{
             items: 2,
             stagePadding: 40,
             margin: 40
           },
           1200:{
             items: 3,
             stagePadding: 50,
             margin: 50
           }
         }
       });
       
     } catch (error) {
       console.error('Error loading episodes:', error);
       const carousel = document.querySelector('.nonloop-block-13');
       if (carousel) {
         carousel.innerHTML = `
           <div class="col-12 text-center">
             <p class="text-danger">Error loading episodes: ${error.message}</p>
             <button onclick="loadEpisodes()" class="btn btn-primary">Retry</button>
           </div>
         `;
       }
     }
   }

   var siteCarousel = function () {
     if ( $('.nonloop-block-13').length > 0 ) {
       // Remove this initialization as it's now handled in loadEpisodes
       // $('.nonloop-block-13').owlCarousel({...});
     }

     $('.slide-one-item').owlCarousel({
       center: false,
       items: 1,
       loop: true,
       stagePadding: 0,
       margin: 0,
       autoplay: true,
       pauseOnHover: false,
       nav: true,
       navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">']
     });
   };
   siteCarousel();

   var siteStellar = function() {
	   $(window).stellar({
	   responsive: false,
	   parallaxBackgrounds: true,
	   parallaxElements: true,
	   horizontalScrolling: false,
	   hideDistantElements: false,
	   scrollProperty: 'scroll'
	 });
   };
   siteStellar();

   var siteCountDown = function() {

	   $('#date-countdown').countdown('2020/10/10', function(event) {
		 var $this = $(this).html(event.strftime(''
		   + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
		   + '<span class="countdown-block"><span class="label">%d</span> days </span>'
		   + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
		   + '<span class="countdown-block"><span class="label">%M</span> min </span>'
		   + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
	   });
			   
   };
   siteCountDown();

   // Initialize podcast carousel
   loadEpisodes();
});