$(".hh-site-menu").find("a, button, input").each(function(a){$(this).attr("tabindex","-1");$(".sos-header__button--menu-icon--close").attr("tabindex","-1")});
$(".hh-menu__btn-open").click(function(a){a.preventDefault();$(".hh-site-menu").addClass("active");$(this).attr("aria-expanded",!0);$(".hh-menu__btn-close").attr("aria-expanded",!0);$("html").css({overflow:"hidden"});$("a, button, input").each(function(a){$(this).attr("tabindex","-1")});$(".hh-site-menu").find("a, button, input, .toggle").each(function(a){$(this).attr("tabindex",a+1);$(".sos-header__button--menu-icon--close").attr("tabindex",1)});$(".hh-menu__btn-close").focus()});
$(".hh-menu__btn-close").click(function(a){a.preventDefault();$(".hh-site-menu").removeClass("active");$(".hh-menu__btn-open").attr("aria-expanded",!1);$(this).attr("aria-expanded",!1);$("html").css({overflow:"auto"});$("a, button, input").each(function(a){$(this).attr("tabindex","1")});$(".hh-site-menu").find("a, button, input").each(function(a){$(this).attr("tabindex","-1");$(".sos-header__button--menu-icon--close").attr("tabindex","-1")});$(".hh-menu__btn-open").focus()});
$(document).on("keyup",function(a){"Escape"===a.key&&($(".hh-menu__btn-close").click(),$('[data-toggler\x3d"'+data+'"]').focus())});$(".hh-site-menu-primary ul ul").closest("li").addClass("has-children");var scrollWidth=window.innerWidth-$(document).width();$(".hh-site-menu-primary ul li a").click(function(a){$(this).closest("li").toggleClass("is-open").find("ul").slideToggle("fast")});$(".hh-site-menu-primary ul li.has-children \x3e a").click(function(a){a.preventDefault()});
$(".hh-site-menu-primary .hh-font-active").length&&$(".hh-font-active").parents(".has-children").toggleClass("is-open").find("ul").slideToggle("fast");$(".hh-menu__btn-open").on("keyup",function(a){13==event.which&&(a.stopPropagation(),$(".hh-site-menu-primary .hh-font-active").length?$(".hh-site-menu-primary .hh-font-active").focus():$(".hh-site-menu-secondary .hh-font-active").length?$(".hh-site-menu-secondary .hh-font-active").focus():$(".hh-site-menu-primary .has-children:first-child a").focus())});
$(".hh-menu__btn-close").on("keyup",function(a){13==event.which&&(a.stopPropagation(),$(".hh-menu__btn-open").focus())});$(".hh-site-menu-primary li").on("keyup",function(a){13==event.which&&(a.stopPropagation(),$(this).siblings().hasClass("is-open")&&$(this).siblings().removeClass("is-open").find("ul").slideUp("fast"))});
$(document).ready(function(){$(".hh-site-menu-secondary ul li:last-child a").keydown(function(a){if(a.shiftKey&&9===a.keyCode)return a.preventDefault(),$(".hh-site-menu-secondary li:nth-last-child(2) a").focus(),!1;if(9===a.keyCode)return a.preventDefault(),$(".hh-site-menu .hh-site-logo").focus(),!1});$(".hh-site-menu .hh-site-logo").keydown(function(a){if(a.shiftKey&&9===a.keyCode)return a.preventDefault(),$(".hh-site-menu-secondary ul li:last-child a").focus(),!1})});
/* Vid klick på Sökikon -> Scrollas till Sök */
$('.hh-search__btn--startpage').on('click', function(e) {
   e.preventDefault();

   var $window = $(window),
       $element = $('.extended-search-form__container'),
       elementTop = $element.offset().top,
       elementHeight = $element.height(),
       viewportHeight = $window.height();

   if ( $(window).width() < 767 ) {
      // Mobil

      scrollIt = '';
      $('.extended-search-form__container').addClass('extended-search-form__container--active');

   } else {
      // Desktop
      scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);
   }

   $('html, body').animate({scrollTop:scrollIt},'50');

   $('.extended-search-form__search-field').focus();
});

$(document).mouseup(function(e) {
   var container = $('.extended-search-form__container--active, .hh-search__btn--startpage');

   // if the target of the click isn't the container nor a descendant of the container
   if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass('extended-search-form__container--active');
   }

   $('.extended-search-form__container__form').focusout(function(e) {
      $('.extended-search-form__container__form').removeClass('extended-search-form__container--active');
   });

});

$('.hh-search__btn').on('click', function(e) {
   $('.extended-search-form__search-field').focus();
});


// Ange höjd till video
$(document).ready(function(e) {
   
    $(window).on('load resize scroll', function(e) {
      var innerHeight = $(window).innerHeight();
      var searchHeight = $('.hh-search__input-field').innerHeight();
      $('.hh-pagecontent__startpage, .hh-overlay img').height(innerHeight);

      $('.hh-pagecontent__startpage').height(innerHeight - 130);
   }); 
});


/* 
	Vid klick på sökikon på undersidor, visa sökruta i header, 
	gör sökruta ej tab-möjlig om ej allt är aktivt 
*/

$('.extended-search-form__search-field').attr('tabindex', '-1');
$('.extended-search-form__input-button').attr('tabindex', '-1');

$('.hh-header-search__btn').on('click', function(e) {
   console.log("test");
   e.stopPropagation();
   $('.extended-search-form__container').toggleClass('hh-header-search__form--active');
   $('.extended-search-form__search-field').focus();
   
   if ($('.extended-search-form__search-field').closest('.extended-search-form__container').hasClass('hh-header-search__form--active')) {
      $('.extended-search-form__search-field').attr('tabindex', '0');
      $('.extended-search-form__input-button').attr('tabindex', '0');
   } else {
      $('.extended-search-form__search-field').attr('tabindex', '-1');
      $('.extended-search-form__input-button').attr('tabindex', '-1');
   }
});

$('.hh-page-wrap').on('click', function(event) {
   if (!$(event.target).closest('.hh-header-search__form--active').length) {
      $('.hh-header-search__form').removeClass('hh-header-search__form--active');
      $('.hh-header-search__input-field').attr('tabindex', '-1');
      $('.hh-header-search__input-button').attr('tabindex', '-1');
   }
});


// Sidhuvud scrollas till content
if ( $('.extended-search-form__search-field').length > 0 ) {

   $(window).on('load resize scroll', function(e) {

      var scrollTop     = $(window).scrollTop(),
          elementOffset = $('.extended-search-form__search-field').offset().top,
          distance      = (elementOffset - scrollTop),
          searchForm = $('.extended-search-form__search-field').height();

      if ( $(window).scrollTop() < 1 ) {
         $('.hh-site-header').removeClass('is-not-topcover').addClass('is-topcover');
      } else {
         $('.hh-site-header').addClass('is-not-topcover').removeClass('is-topcover');
      }
   });

}


// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 100;
var navbarHeight = $('.hh-site-header').outerHeight();


$(window).scroll(function(event){

   scrolls();

   didScroll = true;

   if ( $('.hh-pillar-sticky').length === 0 ) {
      $('.hh-pillar-menu').css({ 'padding-top' : 0 + 'px' });
   }

});

$('.hh-pillar-menu__list-item-link').click(function(event){
   didScroll = false;
   clearInterval(scroll);

   if ( $('.hh-pillar-menu--scrolling').length > 0 ) {

      $('.hh-pillar-menu').css({ 'padding-top' : 0 + 'px' });
      $('.hh-site-header').css({ 'top' : -navbarHeight + 'px' });

   }

   setTimeout(function(){
      didScroll = false;

   }, 1000);

});

function scrolls() {
   scroll = setInterval(function() {
      if (didScroll) {
         hasScrolled();
         didScroll = false;
      }
   }, 250);
}



function hasScrolled() {

   var st = $(this).scrollTop();

   // Make sure they scroll more than delta
   if(Math.abs(lastScrollTop - st) <= delta)
      return;

   // If they scrolled down and are past the navbar, add class .nav-up.
   // This is necessary so you never see what is "behind" the navbar.


   if (st > lastScrollTop && st > navbarHeight) {

		if ( $('.hh-search__form--startpage').length ) {
         var scrollTop     = $(window).scrollTop(),
             elementOffset = $('.hh-search__form--startpage').offset().top,
             distance      = (elementOffset - scrollTop),
             searchForm = $('.hh-search__form--startpage').height();


         if ( distance < searchForm ) {
            // Scroll Down
            $('.hh-site-header').removeClass('is-scroll').css({ top : -navbarHeight + 'px' });
            $('.hh-pillar-sticky').css({ 'padding-top' : 0 + 'px' });
         }
      } else {
         // Scroll Down
         $('.hh-site-header').removeClass('is-scroll').css({ top : -navbarHeight + 'px' });
         $('.hh-pillar-sticky').css({ 'padding-top' : 0 + 'px' });
      }


   } else {
      // Scroll Up
      if ( $('.hh-pillar-menu--scrolling').length === 0  ) {

         if(st + $(window).height() < $(document).height()) {
            $('.hh-site-header').addClass('is-scroll').css({ top : 0 + 'px' });
            $('.hh-pillar-sticky').css({ 'padding-top' : navbarHeight + 'px' });
         }
      }
   }

   lastScrollTop = st;

}


$('.hh-site-header').addClass('is-scroll');

if ( $('.hh-pagecontent__startpage').length > 0 ) {
   $('.hh-site-header').addClass('hh-site-header--startpage');

}

$(".hh-dropdown__picker").click(function(){$(this).toggleClass("active");$(".hh-dropdown__list").slideToggle("fast")});$(".hh-dropdown__list li").click(function(){var a=$(this).text();$(".hh-dropdown__picker").text(a);$(".hh-dropdown__picker").removeClass("active");$(".hh-dropdown__list").slideUp("fast")});$(document).mouseup(function(a){var b=$(".hh-dropdown__list, .hh-dropdown__picker");b.is(a.target)||0!==b.has(a.target).length||($(".hh-dropdown__picker").removeClass("active"),$(".hh-dropdown__list").slideUp("fast"))});
$(function(){$("form tr td select").click(function(a){$(this).parent().toggleClass("active")})});$(document).mouseup(function(a){var b=$("form tr td label");b.is(a.target)||0!==b.has(a.target).length||$("form tr td label").removeClass("active")});
$(".hh-tabs__menu a").click(function(a){a.preventDefault();$(this).addClass("hh-tabs__menu--active").closest("li").siblings().find("a").removeClass("hh-tabs__menu--active");a=$(this).attr("href");$(a).addClass("hh-tabs__content-tab--active").siblings().removeClass("hh-tabs__content-tab--active")});$(".hh-checkbox__container input").focus(function(){$(this).closest(".hh-checkbox__container").addClass("focus")}).blur(function(){$(this).closest(".hh-checkbox__container").removeClass("focus")});
$(".hh-footer__scrolltop").click(function(a){a.preventDefault();$("html, body").animate({scrollTop:0},300)});
$(document).ready(function(){if(0<$(".hh-sidebar").lenght){var b=function(){var a=$(".hh-site-footer").offset().top-100-$(".hh-sidebar").height(),c=$(window).scrollTop(),b=c-d;c>d&&c<a&&$(".hh-sidebar").css("top",b)},d=$(".hh-sidebar").parent(".sv-layout").prev(".sv-layout").offset().top-488,a=$(".hh-site-footer").offset().top-100-$(".hh-sidebar").height(),e=$(window).scrollTop();b();e>a&&(a=$(".hh-pagecontent_educationPage").next().height()-252,console.log(a),$(".hh-sidebar").css("top",a));$(document).scroll(function(){b()})}});
$(document).on("click",".hh-facts-card__expand-sign-decoration",function(){$(this).closest(".sv-text-portlet").find(".hh-facts-cards").toggleClass("active");$(this).toggleClass("hh-facts-card__plus-sign-decoration hh-facts-card__minus-sign-decoration");var a=$(this).closest(".sv-script-portlet").prev().children().height()+90;$(this).closest(".sv-text-portlet").find(".hh-facts-cards").hasClass("active")?($(this).closest(".sv-script-portlet").prev().animate({height:a},200),$(this).attr("aria-expanded",
"true")):($(this).closest(".sv-script-portlet").prev().animate({height:210},200),$(this).attr("aria-expanded","false"));$([document.documentElement,document.body]).animate({scrollTop:$(this).closest(".sv-text-portlet").find(".hh-facts-cards").offset().top},1E3)});
$(document).ready(function(){$(".hh-direct-links__picker-toggle").click(function(a){console.log("Ping klick");$(this).parents(".hh-direct-links__vertical").toggleClass("hh-direct-links--active")});$(document).mouseup(function(a){$(a.target).closest(".hh-direct-links--active")});$(".hh-direct-links__vertical").on("keyup",function(a){13==a.which&&($(this).toggleClass("hh-direct-links--active"),$(this).children(".hh-direct-links__list-item:first-child a").focus())})});
function applyFocusVisiblePolyfill(c){function f(a){return a&&a!==document&&"HTML"!==a.nodeName&&"BODY"!==a.nodeName&&"classList"in a&&"contains"in a.classList?!0:!1}function k(a){a.classList.contains("focus-visible")||(a.classList.add("focus-visible"),a.setAttribute("data-focus-visible-added",""))}function m(a){a.hasAttribute("data-focus-visible-added")&&(a.classList.remove("focus-visible"),a.removeAttribute("data-focus-visible-added"))}function d(a){e=!1}function l(){document.addEventListener("mousemove",
b);document.addEventListener("mousedown",b);document.addEventListener("mouseup",b);document.addEventListener("pointermove",b);document.addEventListener("pointerdown",b);document.addEventListener("pointerup",b);document.addEventListener("touchmove",b);document.addEventListener("touchstart",b);document.addEventListener("touchend",b)}function b(a){a.target.nodeName&&"html"===a.target.nodeName.toLowerCase()||(e=!1,document.removeEventListener("mousemove",b),document.removeEventListener("mousedown",b),
document.removeEventListener("mouseup",b),document.removeEventListener("pointermove",b),document.removeEventListener("pointerdown",b),document.removeEventListener("pointerup",b),document.removeEventListener("touchmove",b),document.removeEventListener("touchstart",b),document.removeEventListener("touchend",b))}var e=!0,g=!1,h=null,n={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};document.addEventListener("keydown",function(a){a.metaKey||
a.altKey||a.ctrlKey||(f(c.activeElement)&&k(c.activeElement),e=!0)},!0);document.addEventListener("mousedown",d,!0);document.addEventListener("pointerdown",d,!0);document.addEventListener("touchstart",d,!0);document.addEventListener("visibilitychange",function(a){"hidden"==document.visibilityState&&(g&&(e=!0),l())},!0);l();c.addEventListener("focus",function(a){if(f(a.target)){var b;if(!(b=e)){b=a.target;var c=b.type,d=b.tagName;b="INPUT"==d&&n[c]&&!b.readOnly||"TEXTAREA"==d&&!b.readOnly||b.isContentEditable?
!0:!1}b&&k(a.target)}},!0);c.addEventListener("blur",function(a){f(a.target)&&(a.target.classList.contains("focus-visible")||a.target.hasAttribute("data-focus-visible-added"))&&(g=!0,window.clearTimeout(h),h=window.setTimeout(function(){g=!1;window.clearTimeout(h)},100),m(a.target))},!0);c.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&c.host?c.host.setAttribute("data-js-focus-visible",""):c.nodeType===Node.DOCUMENT_NODE&&document.documentElement.classList.add("js-focus-visible")}
window.applyFocusVisiblePolyfill=applyFocusVisiblePolyfill;var event;try{event=new CustomEvent("focus-visible-polyfill-ready")}catch(c){event=document.createEvent("CustomEvent"),event.initCustomEvent("focus-visible-polyfill-ready",!1,!1,{})}window.dispatchEvent(event);applyFocusVisiblePolyfill(document);
svDocReady(function(){var c=$svjq(".hh-blue-block-linkable");c.css("cursor","pointer");c.on("click",function(a){a.stopPropagation();a.stopImmediatePropagation();a.preventDefault();a=$svjq(this).find("a").first();var b=a.attr("href");"external"==a.attr("rel")&&window.open(b,"_blank");void 0!==b&&0<b.length&&"external"!=a.attr("rel")&&(window.location.href=b)});$svjq(".hh-library-direct-links .hh-direct-links__picker-toggle").on("click",function(a){$svjq(".hh-library-direct-links").toggleClass("hh-direct-links--active")});
$svjq(".hh-library-direct-links").on("keyup",function(a){13==a.which&&($svjq(".hh-library-direct-links").toggleClass("hh-direct-links--active"),$svjq(".hh-library-direct-links .hh-direct-links__list-item:first-child a").focus())})});
$(function(){function e(){var b=$(this).val();console.log(b.length);if(1<$(this).val().length)if($(this).data("lastval")!=b){$(this).data("lastval",b);clearTimeout(f);var d=$(this);f=setTimeout(function(){$.get(document.location.origin+"/rest-api/hh-search-personal-rest/getpersonal",{searchString:encodeURIComponent(d.val())},function(a){if(a.message.combineHits&&0<a.message.combineHits.length){a=4<a.message.combineHits.length?a.message.combineHits.slice(0,5):a.message.combineHits;for(var b="",d=0;d<
a.length;d++)b+='\x3cli class\x3d"sv-autocomplete-result-item hh-search-personal__result-item"\x3e\x3ca href\x3d"'+(document.location.origin+"/sitevision/proxy/information/sok-personal.html/svid12_3252fcc5165f6c51bf6b69ae/-1708965309/l9/hhstaff/detail.lasso?do\x3dstart\x26groupmember\x3d"+a[d].pID)+'"\x3e'+a[d].lName+" "+a[d].fName+"\x3c/a\x3e\x3c/li\x3e";if(b){$(".hh-search-personal").remove();a='\x3cul class\x3d"hh-search-personal"\x3e'+b+"\x3c/ul\x3e";$(".autocomplete-wrapper").append(a);var g;
$(".sv-autocomplete-search-result").each(function(){""!==$(this).html()&&(g=$(this).attr("style"))});$(".hh-search-personal").attr("style",g);$(".hh-search-personal").show();$(".hh-search-personal__result-item").on("mousedown",function(a){window.location=$("a",this).attr("href")})}else $(".hh-search-personal").hide();$(document).mouseup(function(a){var b=$(".hh-search-personal"),c=$(".hh-search__input-field");c.show();(!b.is(a.target)&&0===b.has(a.target).length||!c.is(a.target)&&0===c.has(a.target).length)&&
b.hide()})}})},500)}else $(".hh-search-personal").show();else $(".hh-search-personal").hide()}function h(){0<$(".hh-search-result__list-persons").length&&(console.log("searchpage"),$.get(document.location.origin+"/rest-api/hh-search-personal-rest/getpersonal",{searchString:$(".hh-search__input-field").val()},function(b){if(b.message.combineHits)if(0<b.message.combineHits.length){b=14<b.message.combineHits.length?b.message.combineHits.slice(0,15):b.message.combineHits;for(var d=$("html").attr("lang"),
a='\x3cul class\x3d"hh-search-result__list-persons__list"\x3e',c=0;c<b.length;c++){var e=document.location.origin+"/sitevision/proxy/information/sok-personal.html/svid12_3252fcc5165f6c51bf6b69ae/-1708965309/l9/hhstaff/detail.lasso?do\x3dstart\x26groupmember\x3d"+b[c].pID,a=a+'\x3cli class\x3d"hh-search-result__list-persons__list-item"\x3e',a=a+('\x3cspan\x3e\x3ca class\x3d"hh-search-result__list-persons__list-item-name" href\x3d"'+e+'"\x3e'+b[c].lName+" "+b[c].fName+"\x3c/a\x3e\x3c/span\x3e");b[c].groupMembership[0].personTitle[0].title.sv&&
(a="sv"===d?a+("\x3cspan\x3e"+b[c].groupMembership[0].personTitle[0].title.sv+"\x3c/span\x3e"):a+("\x3cspan\x3e"+b[c].groupMembership[0].personTitle[0].title.en+"\x3c/span\x3e"));b[c].groupMembership[0].groupMemberPhone&&(a+='\x3cspan\x3e\x3ca href\x3d"tel:035-16'+b[c].groupMembership[0].groupMemberPhone+'"\x3e035-16'+b[c].groupMembership[0].groupMemberPhone+"\x3c/a\x3e\x3c/span\x3e");b[c].groupMembership[0].groupMemberMobilePhone&&(a+='\x3cspan\x3e\x3ca href\x3d"tel:'+b[c].groupMembership[0].groupMemberMobilePhone+
'"\x3e'+b[c].groupMembership[0].groupMemberMobilePhone+"\x3c/a\x3e\x3c/span\x3e");b[c].groupMembership[0].groupMemberEmail&&(a+='\x3cspan\x3e\x3ca href\x3d"mailto:'+b[c].groupMembership[0].groupMemberEmail+'"\x3e'+b[c].groupMembership[0].groupMemberEmail+"\x3c/a\x3e\x3c/span\x3e");a+="\x3c/li\x3e"}a+="\x3c/ul\x3e";$(".hh-search-result__list-persons").html(a)}else $(".hh-search-result__list-persons").html("\x3ch2\x3e"+k.noPersonalFound+"\x3c/h2\x3e")}))}$(".sv-autocomplete-search-result").wrapAll("\x3cdiv class\x3d'autocomplete-wrapper' /\x3e");
if(0<$(".hh-search-result__list-persons").length)var d=$("#hh-search__translations").attr("data-translations"),k=JSON.parse(d);var f;if(d=document.querySelector(".hh-search__input-field"))d.addEventListener("input",e,!1),d.addEventListener("onpaste",e,!1);if(d=document.querySelector(".hh-header-search__input-field"))d.addEventListener("input",e,!1),d.addEventListener("onpaste",e,!1);$(".hh-search__input-field, hh-header-search__input-field").focusout(function(){$(".hh-search-personal").hide()});(new MutationObserver(function(b){b.forEach(function(b){for(var a=
0;a<b.addedNodes.length;a++)if(b.addedNodes[a].hasChildNodes()){if(b.addedNodes[a].querySelectorAll(".hh-search-toggle-result__button--person"))$(".hh-search-toggle-result__button--person").on("click",function(){h()});break}})})).observe(document,{subtree:!0,childList:!0});h()});
$(function() {
   
   //Responsive fixes
   $('.hh-direct-links__picker-toggle').click(function (e) {

      $('.hh-direct-links').toggleClass('hh-direct-links--active');

   });
   
   // Stäng menyn vid klick utanför menyn
   
   $(document).mouseup(function(e) {
      if ($(e.target).closest('.hh-direct-links--active').length) {
         //$('.hh-direct-links').removeClass('hh-direct-links--active');
      }
   });
   
   $('.hh-direct-links').on( 'keyup', function( e ) {
      if(e.which == 13) {
         $('.hh-direct-links').toggleClass('hh-direct-links--active');
         $('.hh-direct-links__list-item:first-child a').focus();
      }
   });
   
});

$(function(){$(".hh-block").css("display","block");if(3<$(".hh-startpage__loadmore").find(".sv-row").length){if($(".hh-startpage__list-load-more-btn").length){var a=$(".hh-block"),b=0;a.length&&a.each(function(){3>=b?$(this).show():$(this).closest(".sv-row").addClass("hh-block__hidden");b++});$(".hh-startpage__list-load-more-btn").on("click",function(a){a.preventDefault();$(".hh-block__hidden").slice(0,3).fadeIn("slow").removeClass("hh-block__hidden").find(".hh-block").show();0===$(".hh-block__hidden").length&&
$(this).hide();scaleEllipsisText()})}}else $(".hh-startpage__list-load-more-btn").length&&$(".hh-startpage__list-load-more-btn").hide()});
function scaleEllipsisText(){$(".hh-other-programs__item--description").length&&$(".hh-other-programs__item--description p").ellipsis({lines:3,ellipClass:"ellip",responsive:!1});$(".hh-flex-block__paragraph").length&&($(".hh-flex-block__heading").ellipsis({lines:2,ellipClass:"ellip",responsive:!0}),$(".hh-flex-block__paragraph").ellipsis({lines:3,ellipClass:"ellip",responsive:!0}),$(".hh-news-block__paragraph").ellipsis({lines:2,ellipClass:"ellip",responsive:!0}))};
$(function(){$(document).on("click",function(a){$(a.target).closest("a").length&&"#"!==$(a.target).closest("a").attr("href")&&($(a.target).hasClass("hh-header__btn")||$("#hh-overlay__video")[0].pause())});var d=$(".hh-overlay").data("onlyimage");$("#hh-overlay--video");var b=$("#hh-overlay__video").data("videosourceone"),c=$("#hh-overlay__video").data("videosourcetwo");$("#hh-overlay__video .hh-overlay_source-one").attr("src",b);$("#hh-overlay__video .hh-overlay_source-two").attr("src",c);$("#hh-overlay__video")[0].load();
$(window).on("load",function(){var a=$(this).scrollTop();$("#hh-overlay--video").css("transform","translate3d(0, "+-(.25*a)+"px, 0)")});768<$(window).width()&&!0!==d?($("#hh-overlay__video-image").show(),$("#hh-overlay__video").show(),$("#hh-overlay__video .hh-overlay_source-one").attr("src",b),$("#hh-overlay__video .hh-overlay_source-two").attr("src",c),$("#hh-overlay__video")[0].load()):($("#hh-overlay__video-image").hide(),$("#hh-overlay__video").hide());$("#hh-overlay__image img").attr("data-object-fit",
"cover");objectFitPolyfill();$(window).on("load resize",function(a){a=$(".hh-overlay").data("onlyimage");if($("#hh-overlay--video").length)$(window).on("load",function(){var a=$(this).scrollTop();$("#hh-overlay--video").css("transform","translate3d(0, "+-(.25*a)+"px, 0)")});if(768<$(window).width()&&!0!==a){$("#hh-overlay__video-image").show();$("#hh-overlay__video").show();a=$("#hh-overlay__video").data("videosourceone");var b=$("#hh-overlay__video").data("videosourcetwo");$("#hh-overlay__video .hh-overlay_source-one").attr("src",
a);$("#hh-overlay__video .hh-overlay_source-two").attr("src",b)}else $("#hh-overlay__video-image").hide(),$("#hh-overlay__video").hide();$("#hh-overlay__image img").attr("data-object-fit","cover");objectFitPolyfill()})});
