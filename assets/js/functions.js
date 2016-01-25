$(function() {
	mentoringBubbleClick();
	setInterval(function(){articleTada()}, 4000);
	designBGStuff();
	smoothScroll(300);
  mobileNav();
	typingLine();
});


function typingLine() {
	$('section#about .typed').typed({
		strings: ["Howdy, I am Ryan.", "Howdy, I am Mehrdad."],
		typeSpeed: 30
	});
}

function mobileNav() {
  $('.mobile-nav-toggle').on('click', function(){
    var status = $(this).hasClass('is-open');
    if(status){ $('.mobile-nav-toggle, .mobile-nav').removeClass('is-open'); }
    else { $('.mobile-nav-toggle, .mobile-nav').addClass('is-open'); }
  });
}

function smoothScroll(duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}

function designBGStuff() {
	$('.design-img-link').hover(function() {
		$(this).parent().parent().css('background-color', $(this).data('color'));
	}, function() {
		$(this).parent().parent().css('background-color', $(this).parent().parent().data('orig-color'));
	});
}

function articleTada() {
	var randNum = Math.floor(Math.random() * $('.article-thumb').length + 1)

	$('.article-thumb').eq(randNum).addClass('is-emph').css('z-index', '1')
		.siblings().removeClass('is-emph').css('z-index', '0');
}

function mentoringBubbleClick() {
	$('.face').on('click', function() {
		console.log("face clicked!");
		var $this = $(this),
				faceTop = $this.position().top,
				vertMath = -1 * (faceTop - 230),
				faceLeft = $this.position().left,
				horizMath = 0 - faceLeft;

		console.log(vertMath);

		if($(window).width() > 640) {
			$this.parent().css('top', + vertMath +'px');
		} else {
			if($this.hasClass('back-btn')) {
				mentoringNarrowStart();
			} else {
				$this.parent().css('left', + horizMath +'px');
			}
		}
		if(!$this.hasClass('back-btn')) {
		$this.addClass('has-bubble-open')
			.siblings().removeClass('has-bubble-open');
			}
	});

	// when I click a face
	// get the distance of the face from its parent
	// move the whole container up 115px + the count
	// add the is-open class to the face, pop the ballon


}

$(window).scroll(function () {
	youtubeVidScroll();
	// startMentoring();
	startInstagram();
	startTwitter();
});

function youtubeVidScroll() {
	var wScroll = $(window).scrollTop();

	$('.video-strip').css('background-position', 'center -' + wScroll + '0px');
};

function startTwitter(){
	var wScroll = $(window).scrollTop();

	if($('section.intro').offset().top - $(window).height()/2 < wScroll) {
		$('#twitterTimeline').addClass('pulse');
	}
};

function startInstagram(){
  var wScroll = $(window).scrollTop();

  if($('section.instagram').offset().top - $(window).height()/1.3 < wScroll) {
    $('.article-thumb').each(function(i){
      setTimeout(function(){
        $('.article-thumb').eq(i).addClass('is-visible');
      }, 100 * i);
    });
  }
};

function startMentoring() {
	var wScroll = $(window).scrollTop();

	if($('section.mentoring').offset().top - $(window).height()/2 < wScroll) {
		if($(window).width() > 640) {
		$('.faces').addClass('launched');
		if(!$('.face').hasClass('has-bubble-open')) {
			setTimeout(function() {
				$('.face:nth-child(3)').addClass('has-bubble-open');
			}, 400);
		}
	} else {
		mentoringNarrowStart();
	}
}
};


function mentoringNarrowStart() {
	$('.faces').css({
		'top': '230px',
		'left': '0px'
	});
	$('.face').first().addClass('has-bubble-open')
		.siblings().removeClass('has-bubble-open');
}

function mentoringWideStart() {
	$('.faces').css({
		'top': '230px',
		'left': '0px'
	});
	$('.face:nth-child(3)').addClass('has-bubble-open')
		.siblings().removeClass('has-bubble-open');
}

$(window).resize(function() {
	if($(window).width() > 640) {
		// mentoringWideStart();
	} else {
		// mentoringNarrowStart();
	}
});
