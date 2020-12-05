AppRegistry.registerBundle({applicationId:'hhSearch|0.0.50',bundle: {"en":{"hits":"Hits","staff":"Staff","noHits":"No hits"},"sv":{"hits":"Träffar","staff":"Personal","noHits":"Inga träffar"}}});
AppRegistry.registerModule({applicationId:'hhSearch|0.0.50',path:'/template/main',module:function(define){define(function(require){var _=require('underscore');return function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='';
 if(showSearch) { 
__p+='\n<div class="'+
((__t=( extraClass ))==null?'':__t)+
'">\n    <div class="extended-search-form__container">\n    ';
 if(location == "searchpage") { 
__p+='\n        <form class="extended-search-form--searchpage">\n    ';
 } else { 
__p+='\n        <form class="extended-search-form">\n    ';
 } 
__p+='\n        \n            ';
 if(location == "header") { 
__p+='\n            <div class="extended-search-form__inner-container">\n                ';
 } 
__p+='\n                <input class="extended-search-form__search-field" type="text"\n                    placeholder="'+
((__t=( translations.placeholder ))==null?'':__t)+
'" />\n                ';
 if(location == "header") { 
__p+='\n                <div class="extended-search__auto-complete">\n\n                </div>\n                <input type="image" class="extended-search-form__input-button sv-vamiddle" name="submitButton" alt="Sök"\n                    src="'+
((__t=( searchIcon ))==null?'':_.escape(__t))+
'" tabindex="0">\n            </div>\n            <a class="hh-header__btn hh-header-search__btn" title="öppna sök" href="#"></a>\n\n            ';
 } 
__p+='\n        </form>\n        ';
 if(location != "header") { 
__p+='\n        <div class="extended-search__auto-complete">\n\n        </div>\n        ';
 } 
__p+='\n    </div>\n</div>\n';
 if(location == "searchpage") { 
__p+='\n<div class="extended-search__result-list-container">\n    <p class="extended-search__amount-of-hits"></p>\n    <!--<div class="extended-search__filter-container">\n        <ul class="extended-search-form__filter-items">\n            <li class="extended-search-form__filter-item"><a href="">Hit1</a></li>\n    <li class="extended-search-form__filter-item"><a href="">Hit2</a></li>\n    <li class="extended-search-form__filter-item"><a href="">Hit3</a></li>\n    <li class="extended-search-form__filter-item"><a href="">Hit4</a></li>\n        </ul>\n        <div class="extended-search-form__clear-filter-button">\n            <p class="normal">\n                <a class="extended-search__reset-filter">Rensa filter</a>\n            </p>\n        </div>\n    </div>-->\n    <div class="extended-search__hits-or-staff">\n        <button class="extended-search__toggle-result-button extended-search__toggle-result-button--hits extended-search__toggle-result-button--active">'+
((__t=( i18n('hits') ))==null?'':_.escape(__t))+
'</button>\n        <button class="extended-search__toggle-result-button extended-search__toggle-result-button--staff">'+
((__t=( i18n('staff') ))==null?'':_.escape(__t))+
'</button>\n    </div>\n</div>\n<div class="extended-search__result-list--hits">\n\n</div>\n<div class="extended-search__result-list--staff">\n\n</div>\n<div class="extended-search__pagination">\n</div>\n';
 } 
__p+='\n';
 } 
__p+='';
}
return __p;
};});}});
AppRegistry.registerModule({applicationId:'hhSearch|0.0.50',path:'/module/client/search',module:function(define){'use strict';define(function (require) {
    'use strict';

    var
        $ = require('jquery'),
        router = require('router'),
        requester = require('requester'),
        store = require('store');


    var search = {
        initSearchPage: function (e, store) {
            var searchQuery = decodeURIComponent(window.location.search);
            const urlParams = new URLSearchParams(searchQuery);
            const queryParam = urlParams.get('query');

            if (queryParam) {
                $(".extended-search-form__search-field").val(queryParam);
                //console.log("debug_1");
                search.searchpageSearch(null, 0, store, true);
            }
        },
        searchpageSearch: function (e, startValue, store, type) {
            if (e) {
                e.preventDefault();
            }
            $(".extended-search__auto-complete").hide();
            var value = $(".extended-search-form__search-field").val();
            //console.log("debug_2");
            
            requester.doPost({
                url: router.getStandaloneUrl('/search'),
                data: {
                    search: encodeURIComponent(value),
                    startValue: startValue || 0,
                    type: type || ""
                }
            }).done(function (response) {
                console.log("start");
                var lang = $("html").attr("lang");
                var htmlHits = '<ul class="extended-search__result-list">${list}</ul>';
                var htmlPersons = '<ul class="extended-search__result-list">${list}</ul>'
                var hitsList = '';
                var personsList = '';
                //console.log("stop");
                if (response.indexResult.length !== 0 || response.apiResult.combineHits.length !== 0) {
                    if (response.indexResult !== null && response.indexResult.length !== 0) {
                        for (var i = 0; i < response.indexResult.length; i++) {
                            var displayName = response.indexResult[i].displayName;
                            var excerpt = response.indexResult[i].excerpt;
                            var date = response.indexResult[i].date;
                            var uri = response.indexResult[i].uri;
                            var relevance = response.indexResult[i].relevanceScore;
                            var clickTracking = response.indexResult[i].clickTracking;
                            hitsList += '<li class="extended-search-form__result-list-hit" data-relevance="' + relevance + '">';
                            hitsList += '<div class="extended-search__result-list-headline">';
                            //hitsList += '<a onkeypress="' + clickTracking + '" onclick="' + clickTracking + '" href="' + uri + '">' + displayName + '</a></div>';
                            hitsList += response.indexResult[i].link + '</div>';
                            hitsList += '<div class="extended-search__result-list-container"><p class="extended-search__result-list-excerpt">' + excerpt + '</p></div>';
                            if(date){
                                hitsList += '<span class="extended-search__result-list-date">' + date + '</span></li>';
                            } else {
                                hitsList += '</li>';
                            }
                        }
                        htmlHits = htmlHits.replace("${list}", hitsList);
                        $(".extended-search__result-list--hits").html(htmlHits);
                    } else {
                        $(".extended-search__result-list--hits").html('<p>' + store.translations.nohits + '</p>');
                    }
                    if (response.apiResult !== null && response.apiResult.combineHits.length !== 0) {
                        var hits = response.apiResult.combineHits;

                        for (var i = 0; i < hits.length; i++) {
                            var hit = hits[i];
                            var url = document.location.origin + '/sitevision/proxy/information/sok-personal.html/svid12_3252fcc5165f6c51bf6b69ae/-1708965309/l9/hhstaff/detail.lasso?do=start&groupmember=' + hit.pID;
                            personsList += '<li class="extended-search__search-hit">';


                            personsList += '<div class="extended-search__result-list-headline"><a href="' + url + '">' + hit.lName + ' ' + hit.fName + '</a></div>';

                            if (lang == "sv")
                                personsList += '<p>' + hit.groupMembership[0].personTitle[0].title.sv + '</p>';
                            else {
                                personsList += '<p>' + hit.groupMembership[0].personTitle[0].title.en + '</p>';
                            }
                            if (hit.groupMembership[0].groupMemberPhone)
                                personsList += '<p><a href="tel:035-16' + hit.groupMembership[0].groupMemberPhone + '">035-16' + hit.groupMembership[0].groupMemberPhone + '</a></p>';
                            if (hit.groupMembership[0].groupMemberMobilePhone)
                                personsList += '<p><a href="tel:' + hit.groupMembership[0].groupMemberMobilePhone + '">' + hit.groupMembership[0].groupMemberMobilePhone + '</a></p>';
                            if (hit.groupMembership[0].groupMemberEmail)
                                personsList += '<p><a href="mailto:' + hit.groupMembership[0].groupMemberEmail + '">' + hit.groupMembership[0].groupMemberEmail + '</a></p>';

                            personsList += '</li>';
                        }
                        htmlPersons = htmlPersons.replace("${list}", personsList);

                        $(".extended-search__result-list--staff").html(htmlPersons);

                        



                        $([document.documentElement, document.body]).animate({
                            scrollTop: $(".extended-search-form__filter-items").offset().top
                        }, 1000);
                    } else {
                        $(".extended-search__result-list--staff").html('<p>' + store.translations.nohits + '</p>');
                    }
                    if (response.amountOfHits) {
                        if (lang == "sv") {
                            $(".extended-search__amount-of-hits").html('Din sökning på <strong>' + value + '</strong> gav <strong>' + response.amountOfHits + '<strong> träffar');
                        } else {
                            $(".extended-search__amount-of-hits").html('Your search on <strong>' + value + '</strong> gave <strong>' + response.amountOfHits + '<strong> hits');
                        }
                        console.log("before pagination");
                        if (response.pagination) {
                            $(".extended-search__pagination").html(response.pagination);
                            $(".extended-search__pagination-list-item[value]").on("click", function (e) {
                                search.searchpageSearch(e, $(this).val(), store, false);
                            });
                        }
                    }
                } else {
                    if (lang == "sv") {
                        $(".extended-search__amount-of-hits").html('Din sökning på <strong>' + value + '</strong> gav <strong>0<strong> träffar');
                    } else {
                        $(".extended-search__amount-of-hits").html('Your search on <strong>' + value + '</strong> gave <strong>0<strong> hits');
                    }
                    $(".extended-search__result-list--staff").html('<p>' + store.translations.nohits + '</p>');
                    $(".extended-search__result-list--hits").html('<p>' + store.translations.nohits + '</p>');
                }


            }).fail(function (response) {
                console.log(response);
            });
        },
        autoComplete: function (e) {
            //e.preventDefault();

            console.log("autocompletehit");
            var target = $(e.currentTarget);
            var value = target.val();
            if (value.length > 1) {
                requester.doPost({
                    url: router.getStandaloneUrl('/autoComplete'),
                    data: {
                        search: encodeURIComponent(value)
                    }
                }).done(function (response) {
                    var html = '<ul class="extended-search__auto-complete-list">${list}</ul>';
                    var list = '';
                    if (response.indexResult.length !== 0 || response.apiResult !== 0) {
                        if (response.indexResult !== null && response.indexResult.length !== 0) {
                            for (var i = 0; i < response.indexResult.length; i++) {
                                var query = response.indexResult[i].displayName;
                                if (query.indexOf("+" !== -1)) {
                                    var queryParsed = query.replace(/ /g, "+");
                                    list += '<li class="extended-search__auto-complete-item"><a class="extended-search__auto-complete-link" href="' + store.getState().searchPage + '?query=' + queryParsed + '">' + response.indexResult[i].displayName + '</a></li>';
                                }
                                if (i === 5) break;
                            }
                        }
                        if (response.apiResult !== null && response.apiResult !== 0) {
                            var hits = response.apiResult.combineHits;

                            for (var i = 0; i < hits.length; i++) {
                                var url = window.location.origin + '/sitevision/proxy/information/sok-personal.html/svid12_3252fcc5165f6c51bf6b69ae/-1708965309/l9/hhstaff/detail.lasso?do=start&groupmember=' + hits[i].pID;
                                list += '<li class="extended-search__auto-complete-item extended-search__auto-complete-item-personal"><a class="extended-search__auto-complete-link" href="' + url + '">' + hits[i].lName + ' ' + hits[i].fName + '</a></li>';
                                if (i === 5) break;
                            }
                        }
                        html = html.replace('${list}', list);
                        $(".extended-search__auto-complete").html(html);
                        $(".extended-search__auto-complete").show();
                    } else {
                        $(".extended-search__auto-complete").hide();
                    }

                    // Check if div is visible in the window

                    var el = document.getElementsByClassName("extended-search__auto-complete")[0];
                    var rect = el.getBoundingClientRect();
                    var elemTop = rect.top;
                    var elemBottom = rect.bottom;

                    // Only completely visible elements return true:
                    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
                    // Partially visible elements return true:
                    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;

                    if (!isVisible) {
                        $(".extended-search__auto-complete").css("bottom", "88px");
                    } else {
                        $(".extended-search__auto-complete").css("bottom", "auto");
                    }


                }).fail(function (response) {
                    console.log(response);
                });
            } else {
                $(".extended-search__auto-complete").hide();
                $(".extended-search__auto-complete").css("bottom", "auto");
            }

        },
        autoCompleteOut: function (e) {
            $(".extended-search__auto-complete").hide();
        },
        doSearch: function (e, store) {
            e.preventDefault();
            var target = $(e.currentTarget);
            //console.log("continued do search");
            var inputField = $(".extended-search-form__search-field", target);
            if (inputField.val().length > 0) {
                var value = inputField.val();
                var query = value;
                var queryParsed = query.replace(/ /g, "+");
                window.location.href = store.searchPage + '?query=' + queryParsed;
            }
        },
        preventFocusOut: function (e) {
            $(document).on("mousedown", function (e) {
                if (e.target.className === "extended-search__auto-complete-link") {
                    e.preventDefault();
                }
            });
        },
        toggleSearchList: function (e) {
            //console.log("here");
            var button = $(e.currentTarget);
            $(".extended-search__toggle-result-button").removeClass("extended-search__toggle-result-button--active");
            button.addClass("extended-search__toggle-result-button--active");

            if (button.hasClass("extended-search__toggle-result-button--hits")) {
                $(".extended-search__result-list--staff").hide();
                $(".extended-search__result-list--hits").show();
            } else {
                $(".extended-search__result-list--hits").hide();
                $(".extended-search__result-list--staff").show();
            }
        },
        initPaginationEvents: function (e) {
            $(".extended-search__pagination-list-item [value]").on("click", function (e) {
                search.searchpageSearch(e, this.val(), store, false);
            });
        },
        delay: function (callback, ms) {
            var timer = 0;
            return function () {
                var context = this,
                    args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    callback.apply(context, args);
                }, ms || 0);
            };
        }
    };
    return search;
});}});
AppRegistry.registerModule({applicationId:'hhSearch|0.0.50',path:'/main',module:function(define){'use strict';define(function (require) {
   'use strict';

   var
      _ = require('underscore'),
      Component = require('Component'),
      template = require('/template/main'),
      search = require('/module/client/search'),
      store = require('store'),
      $ = require('jquery');

   return Component.extend({

      template: template,

      events: {
         dom: {
            //'input .extended-search-form__search-field': 'autoComplete',
            'focusout .extended-search-form__search-field': 'autoCompleteOut',
            'submit .extended-search-form': 'doSearch',
            'submit .extended-search-form--searchpage': 'searchpageSearch',
            'click .extended-search__toggle-result-button': 'toggleSearchList'
         }
      },
      onRendered: function (e) {
         search.preventFocusOut(e);
         search.initSearchPage(e, store.getState());
         $(".extended-search-form__search-field").on("input", search.delay(function(e){
            search.autoComplete(e);
         }, 700));
      },
      /*autoComplete: function (e) {
         search.delay(search.autoComplete(e), 500);
      },*/
      autoCompleteOut: function (e) {
         search.autoCompleteOut(e);
      },
      doSearch: function (e) {
         search.doSearch(e, store.getState());
      },
      searchpageSearch: function (e, startValue) {
         search.searchpageSearch(e, startValue, store.getState(), true);
      },
      toggleSearchList: function (e) {
         search.toggleSearchList(e);
      },
      filterState: function (state) {
         return _.extend({}, {
            searchPage: state.searchPage,
            proxyPageUri: state.proxyPageUri
         });
      }
   });
});}});