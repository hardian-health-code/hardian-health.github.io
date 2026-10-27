/**
 * 
 * ALWAYS USE JQUERY DOMREADY INSTEAD OF VANILLA JS DOMContentLoaded
 * OTHERWISE DYNAMIC JS SCRIPT LOADING WILL NOT WORK
 * 
 */


/**
 * 🌸🌸🌸 SECTION - UNIVERSAL / HELPER FUNCTIONS 
 */


/**
 * Fetch cache headers - for any fetch request
 */

var myHeaders = new Headers();
// If the url contains .squarespace.com, we're assuming it's admin logged in and won't cache the portfolio SEO description
// If the url does not contain .squarespace.com, we're assuming it's a visitor and will cache the portfolio SEO description
if(document.location.host.includes(".squarespace.com")){
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
}


/**
* 🌸🌸🌸 SECTION - BLOG STUFF
*/

// SINGLE BLOG POST: reposition tags and categories to be under author bio inside .custom-metabox
$( document ).ready(function() {    
  if( (window.location.pathname.includes("/insights")) && $('article').length   ){
  
      
      //move categories and tags after author
          $("<div class='custom-metabox'></div>").insertAfter(".blog-item-author-profile-wrapper");
          $("div.blog-meta-item.blog-meta-item--tags").prependTo(".custom-metabox");
          $("div.blog-meta-item.blog-meta-item--categories").prependTo(".custom-metabox");
          
          
          //create labeels for categories and tags
          $("<span class='custom-meta-label category-label'>Categories:</span>").prependTo("div.blog-meta-item.blog-meta-item--categories");
          $("<span class=' custom-meta-label custom-tag-label'>Tags:</span>").prependTo("div.blog-meta-item.blog-meta-item--tags");    


  }
}); 


// if Blog category page (filtering of blog post) is on, let's make this category tag in each blog post (inside grid) have a class so we can show that yeah, this blog post is indeed filtered correctly
$( document ).ready(function() {    
  if(window.location.pathname.includes("/insights/category/")){
$("body").addClass("blog-category-filtered");

var currentCategory = window.location.pathname;
$(".blog-categories-list a").each(function(i){
var categoryLabelLink = $(this).attr("href");

  if(categoryLabelLink == currentCategory){
      $(this).addClass("blog-post-category-current-filter active-filter");
  }
  
})
  
}
}); 


// BLOG CATEGORY NAVIGATION - ADD SELECTED CLASS TO CURRENTLY SELECTED CATEGORY
function styleBlogTagNavigation() {

  // ADD BLOG TAG NAVIGATION SECTION ID HERE)
  var blogCategoryNavigationBlockLink = 'section[data-section-id="63936a7c3d674d7079783a93"] a';

  if (window.location.pathname.includes("/insights")) {
      $(document).ready(function() {

        var currentPagePath = window.location.pathname;
  
        $(blogCategoryNavigationBlockLink).each(function() {
          if (currentPagePath == $(this).attr("href")) {
            $(this).addClass("active-filter");
          }
        })
      });
  }
}

styleBlogTagNavigation();


/**
* 🌸🌸🌸 SECTION - ANALYTICS
*/

// UTM & REF --> Form. Let's hide any field that talks about UTM codes so when we duplicate pages, we don't need to get field ID's for CSS every time.
$( document ).ready(function() {    
  $( ".form-item.field.text:contains('UTM'), .form-item.field.text:contains('GTM')" ).addClass( "GTM-hidden-field-hide");    
}); 


/*
* 🌸🌸🌸 SECTION - FORMATTING DATES
*/

//// BLOG PAGE GRID DATES – ORIGINALLY MONTH/DAY/YEAR WITH HTML <time class="blog-date" pubdate="" data-animation-role="date">9/14/22</time>
$(document).ready(function() {    

    $('time.blog-date').each(function(i, obj) {
        var dateArray = $(this).text().split("/");

        var day = dateArray[0];
        if(day.length <= 1) {
            day = "0" + day;
        }

        var month = dateArray[1];
        if(month.length <= 1) {
            month = "0" + month;
        }

        var year = dateArray[2];
        // Assuming year is already in YY format, if not, you might need additional logic

        $(this).html(year + "-" + month + "-" + day).addClass("dateFormatted-and-ready-to-show");
    });

});


  

/**
 * SINGLE POST DATE FORMAT
 */

  $( document ).ready(function() {    
    //❗IF BLOG POST SINGLE  DATE FORMAT 
if(document.querySelector("meta[itemprop=datePublished]")){

  //if(document.querySelector("meta[itemprop=datePublished]").getAttribute("content") === "Description of the webpage")

    //console.log("BLOG SINGLE POST WITH DATE FOR IT");
    
    //insights post single - <meta itemprop="datePublished" content="2022-09-14T16:31:36+0300">
     var blogSinglePublishDate = $('meta[itemprop="datePublished"]').attr("content")
    var blogSingleDateArray = blogSinglePublishDate.split("T");
    var blogSingleDateSplitted = blogSingleDateArray[0].split("-");

    var year = blogSingleDateSplitted[0];
    var month = blogSingleDateSplitted[1];
    var day = blogSingleDateSplitted[2]
    $(".blog-meta-item--date span").html(year + "-" + month + "-" + day).addClass("dateFormatted-and-ready-to-show");

}
else{

}

}); 


/**
 * SUMMARY BLOCK DATE FORMAT
 */
$( document ).ready(function() {    
  $('time.summary-metadata-item--date').each(function(i, obj) {
      var dateArray = $(this).attr("datetime").split("-");
      var year = dateArray[0];
      var month = dateArray[1];
      var day = dateArray[2];
      $(this).html(year + "-" + month + "-" + day).addClass("dateFormatted-and-ready-to-show");
      
  });
}); 


/**
 * ANIMATED HEADINGS - HOMEPAGE 5 SERVICES
 */

try {

     //code that might throw an exception
     var howLongWeShowALineFor = 2500;
     var howCloseShouldTheAnimationsOverlap = 360;
     var letterspeed = 45;
     $( document ).ready(function() {    
         
     
     
     
     //select a heading that has a strike through (way for user to select a heading to be animated)
     var animatedH1 = $( "h1, h2, h3" ).has( "span[style*='line-through']" ); // let's check if we have a heading with a strike through first
     if(animatedH1.length){
        //remove white-space:pre-wrap;
     animatedH1.css("white-space", "normal");
     
     //add a class so we can add CSS animations not for all headings, but only animated specific ones
     animatedH1.addClass("codetonic-textanimation-one");
     
     // get the page breaked lines as array
     var animationArray = animatedH1.children("span")[0].innerHTML.split("<br>");
     
     //add the first line and a container for animated lines
     animatedH1.html(animationArray[0] + '<br><span class="container"></span>');
     
     
     //loop through lines and add them as span.word -tags
     for (var i = 1; i < animationArray.length; i++) { 
         $("span.container").append("<span class='word'>" + animationArray[i] + "</span>");
     }
     
     
     ///Animation JS
     //animoidaan
     var words = document.getElementsByClassName('word');
     var wordArray = [];
     var currentWord = 0;
     
     words[currentWord].style.opacity = 1;
     for (var i = 0; i < words.length; i++) {
       splitLetters(words[i]);
     }
     
     function changeWord() {
       var cw = wordArray[currentWord];
       var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
       for (var i = 0; i < cw.length; i++) {
         animateLetterOut(cw, i);
       }
       
       for (var i = 0; i < nw.length; i++) {
         nw[i].className = 'letter behind';
         nw[0].parentElement.style.opacity = 1;
         animateLetterIn(nw, i);
       }
       
       currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
     }
     
     function animateLetterOut(cw, i) {
       setTimeout(function() {
         cw[i].className = 'letter out';
       }, i*letterspeed);
     }
     
     function animateLetterIn(nw, i) {
       setTimeout(function() {
         nw[i].className = 'letter in';
       }, howCloseShouldTheAnimationsOverlap+(i*letterspeed));
     }
     
     function splitLetters(word) {
       var content = word.innerHTML;
       word.innerHTML = '';
       var letters = [];
       for (var i = 0; i < content.length; i++) {
         var letter = document.createElement('span');
         letter.className = 'letter';
         letter.innerHTML = content.charAt(i);
         word.appendChild(letter);
         letters.push(letter);
       }
       
       wordArray.push(letters);
     }
     
     changeWord();
     setInterval(changeWord, howLongWeShowALineFor);
  
     } else{
  
     }
  
     
     
     
       
       }); 
  
  
  
  
  } //END OF TRY FUNCTION
  catch (e) {
     //code to handle the exception
  }


/**
* 🌸🌸🌸 SECTION - PORTFOLIO GRID MAIN PARENT PAGE
*/


/**
 * PRE-MARKET & POST-MARKET TITLES TO TIMELINE
 */
var preAndPostMarketTitleBeforeFirstOfThose = function() {
  $(".grid-item").first().before("<h4 class='pre-market-title'>Pre-Market</h4>");
  //before .pre-market-title add a h2 with content: "The Journey"
  $(".pre-market-title").before("<h2 class='pre-market-title-journey'>The Journey</h2>");
  var $firstPostMarket = $('.grid-item[href*="post-market"]:first');
  $firstPostMarket.before('<h4 class="post-market-title">Post-market</h4>');
}

$( document ).ready(function() {   
  preAndPostMarketTitleBeforeFirstOfThose();
});
 
 


/**
 * FETCH SEO DESCRIPTIONS FOR GRID ITEMS
 */

function fetchAndAddDescriptions(url){
  var fetchUrl = window.location.origin + window.location.pathname + "?format=json-pretty";

  fetch(fetchUrl, { 
      method: 'GET',
      headers: myHeaders
  })
  .then(function(response) { return response.json(); })
  .then(function(json) {
      // use the json
  portfolioItems = json.items;

      // This function is called after the portfolio items are loaded
      // We loop through each JSONitem and check if it has a SEO description
      // If the SQSP JSON item has a SEO description, we add it to the corresponding a.grid-item
      function addSeoDescriptionToPortfolioItems() {
          // Loop through all portfolio items in the JSON
          portfolioItems.forEach((item) => {
              // Check if the porftolio item has a SEO description
              if (item.seoData && item.seoData.seoDescription) {
                  // Get all grid items (portfolio links in the tube map)
                  const gridItems = document.querySelectorAll(`a.grid-item`);
                  // Loop through all grid items
                  gridItems.forEach((gridItem) => {
                      // Get the href attribute of the grid item
                      const href = gridItem.getAttribute('href');
                      // Check if the link destiontion is the same as the JSON full URL of the portfolio item
                      if (href === item.fullUrl) {
                          // Create a paragraph element
                          const description = document.createElement('p');
                          // Add a class to the paragraph element
                          description.classList.add('seo-description');
                          // Set the inner text of the paragraph element
                          //description.innerText = item.seoData.seoDescription;
                          // edit the description text to also have this html: <span class="pofo-readmore">Read More →</span>
                          description.innerHTML = item.seoData.seoDescription + '<span class="pofo-readmore">Read More  <span class="arrow">→</span></span>';
                          // Get the portfolio text element
                          const portfolioText = gridItem.querySelector('.portfolio-text');
                          // Append the description to the portfolio text (so it appears below the h3 title)
                          portfolioText.appendChild(description);
                      }
                  });
              } else {
                // Get all grid items (portfolio links in the tube map)
                const gridItems = document.querySelectorAll(`a.grid-item`);
                // Loop through all grid items
                gridItems.forEach((gridItem) => {
                    // Get the href attribute of the grid item
                    const href = gridItem.getAttribute('href');
                    // Check if the link destiontion is the same as the JSON full URL of the portfolio item
                    if (href === item.fullUrl) {
                        // Create a paragraph element
                        const description = document.createElement('p');
                        // Add a class to the paragraph element
                        description.classList.add('seo-description');
                        // Set the inner text of the paragraph element
                        //description.innerText = item.seoData.seoDescription;
                        // edit the description text to also have this html: <span class="pofo-readmore">Read More →</span>
                        description.innerHTML = '<span class="pofo-readmore">Read More  <span class="arrow">→</span></span>';
                        // Get the portfolio text element
                        const portfolioText = gridItem.querySelector('.portfolio-text');
                        // Append the description to the portfolio text (so it appears below the h3 title)
                        portfolioText.appendChild(description);
                    }
                });
                
              
              }
          });
      }
      // Call the function to add the SEO descriptions to the portfolio items
      addSeoDescriptionToPortfolioItems();

  
  
  });
} // end of fetchAndAddDescriptions() function


//run fetchAndAddDescriptions() on document ready
//document.addEventListener("DOMContentLoaded", function(event) { //replace with jquery dom ready
$(document).ready(function() {
  // portfolio parent page (service tube map): add SEO descriptions and a body class
  if (document.querySelector("#gridThumbs.portfolio-grid-basic")) {
      $('body').addClass('portfolio-main-or-child-page portfolio-parent-page');
      fetchAndAddDescriptions();
  }
});


//Loop each .grid-item, adds a div called "number" and adds the number of the item to it.
function addNumber(){
  $(".grid-item").each(function(i){
    var number = i++;
    $(this).prepend("<div class='number'>" + i + "</div>");
    //$(this).prepend("<div class='tube-item-vertical-line'></div>");
  });
}

//call the function
$( document ).ready(function() {
//addPreMarketAndPostMarketTitles(); // FIRST work the pre-market and post-market titles in the timeline
addNumber(); // THEN add the number to each grid item. otherwise the number will be added to the pre-market and post-market title h2s
//prepend <div class='tube-item-vertical-line'></div> to the first .grid-item
$( ".grid-item" ).first().prepend("<div class='tube-item-vertical-line'></div>");
});


/**
 * PORTFOLIO TUBE LINE ANIMATION
 */

function updateTimelineVerticalLine() {
  // get the distance between the first .tube-item-vertical-line and the top of the window and log it
  var distance = document.querySelector('.tube-item-vertical-line').getBoundingClientRect().top;
  //if the distance is less than 50px. for each scrolled pixel add 1px more to the CSS height of the .tube-item-vertical-line
  // console log the distance of window top VS top of page

  var pageWindowOffset = window.pageYOffset


  // calculate the height of viewport and divide by 2. create a variable for it
  let viewportHeight = window.innerHeight;
  let viewportHeightDividedByTwo = viewportHeight / 2;


  // EDIT THIS to change the distance at which the animation starts
  //let verticalLineAnimationOffset = 400;
  let verticalLineAnimationOffset = viewportHeightDividedByTwo; // animation the middle of the page - even if resized
  // get the height of the last .grid-item and log it
  //var lastGridItemHeight = document.querySelector('.grid-item').getBoundingClientRect().height;
  //console.log('last grid item height: ' + lastGridItemHeight);

  // get the difference between last grid item bottom and the top of the window and log it
  //var lastGridItemBottom = document.querySelector('.grid-item').getBoundingClientRect().bottom; // this gets the first grid item. let's get the last one
  // Q: if there are multiple elements how to use document query selector all and get the last one?
  // A: use document.querySelectorAll and then get the last one with [array.length - 1]
  // get the last .grid-item using that method
  var lastGridItem = document.querySelectorAll('.grid-item')[document.querySelectorAll('.grid-item').length - 1];
  // calculate the height difference betweet top of ".tube-item-vertical-line" and the bottom of last .grid-item
  var lastGridItemBottom = lastGridItem.getBoundingClientRect().bottom;


  if ( (distance < verticalLineAnimationOffset ) && (lastGridItemBottom > verticalLineAnimationOffset) ) {
      // edit height of .tube-item-vertical-line so when distance is 50, the height is 0. when distance is 40, the height is 10. when distance is 30, the height is 20. when distance is 20, the height is 30. when distance is 10, the height is 40. when distance is 0, the height is 50. but it'll keep growing as you scroll down

      document.querySelector('.tube-item-vertical-line').style.height = (verticalLineAnimationOffset - distance) + 'px';
  }
  // make else if statements for when we are over the animation offset and when we are under the animation offset
  else if (lastGridItemBottom < verticalLineAnimationOffset) {
    //a bug. if scrolling too quickly the line may not reach  the bottom of the last grid item. it may stay a few px short. let's fix that
    document.querySelector('.tube-item-vertical-line').style.height = (lastGridItemBottom - distance) + 'px'; // so the height is until the bottom of the last grid item? yes
  }
  else {
    // same problem here, when scrolling up fast, we may leave a few px of the line visible. when it should be 0px if we're above timeline. let's fix that
    document.querySelector('.tube-item-vertical-line').style.height = 0 + 'px'; // so the height is 0px? yes
  }
  
  // a function that checks if a .number -element is less than verticalLineAnimationOffset from the top of the window. if it is, the vertical line has "touched" it. add a class to the .number called "number-overlap". if it's not, remove the class
  function checkNumberOverlap() {
    var numbers = document.querySelectorAll('.number');
    numbers.forEach(function(number) {
      var numberRect = number.getBoundingClientRect();
      if (numberRect.top < verticalLineAnimationOffset) {
        number.classList.add('number-overlap');
      } else {
        number.classList.remove('number-overlap');
      }
    });
  }

  checkNumberOverlap();
}


// on jquery domready, if page contains #gridThumbs, update the timeline vertical line
$( document ).ready(function() {
  if ($('#gridThumbs').length) {
    updateTimelineVerticalLine();
    // tubemaps - update vertical line if window is scrolled
    window.onscroll = function () {
      updateTimelineVerticalLine();
    }

    // tubemaps - run updateTimelineVerticalLine(); if window is resized. to calculate the new viewport height and keep the animated part in the middle of the page
    window.onresize = function () {
      updateTimelineVerticalLine();
    }
  }
});


/**
* 🌸🌸🌸 SECTION - PORTFOLIO SUB-PAGES
*/


/**
 * Process fetch stuff: 
 * get the number of this page
 * get next and prev pagination numbers
 * TODO: get title for h1
 * todo get seo description for lead
 */


function portfolioSubPageFetch() {

var fetchUrl = window.location.origin + window.location.pathname.split("/").slice(0, -1).join("/") + "?format=json-pretty";


fetch(fetchUrl, { 
   method: 'GET',
   headers: myHeaders
})
.then(function(response) { return response.json(); })
.then(function(json) {

   // make an iterator number. To check which nth page we are on
   var i = 0;

   var numberOfThisPortfolioItem = 0;

   jsonItems = json.items;
   
    totalNumberOfPortfolioItems = jsonItems.length;
    //log it:
    
    // loop through the json and find the title that matches the page title
   json.items.forEach((item) => {
    i++;

     if (item.fullUrl === window.location.pathname) { // we found this page in the json portfolio items list

          numberOfThisPortfolioItem = i;
         
        
          // PAGINATION: ADD NUMBERS TO NEXT/PREV 
          $(".item-pagination-link--next .item-pagination-title").text( (numberOfThisPortfolioItem + 1) + ". " + $(".item-pagination-link--next .item-pagination-title").text());
          //same for item-pagination-link--prev but with the number of the previous item
          $(".item-pagination-link--prev .item-pagination-title").text( (numberOfThisPortfolioItem - 1) + ". " + $(".item-pagination-link--prev .item-pagination-title").text());

         //get the href of . item-pagination-link--next and . item-pagination-link--prev as variables
          var nextHref = $(".item-pagination-link--next").attr("href");
          var prevHref = $(".item-pagination-link--prev").attr("href");


          //before first h1, prepend ".sub-service-meta".
          $("h1").first().before('<div class="sub-service-meta"></div>');


        var path = window.location.pathname;
      
        var vertical = "";

       // BREADCRUMBS TITLE AND URL FOR VERTICAL
        //var verticalTitle = "";
        if (path.startsWith("/clinical")) {
          verticalTitle = "Clinical";
          //vertical = "/clinical";// get this automatically from the path
          //vertical = path.split('/')[1];
          vertical = path.split('/')[1];
        } else if (path.startsWith("/regulatory")) {
          verticalTitle = "Regulatory";
          //vertical = "/services/regulatory";
          vertical = path.split('/')[1];
        } else if (path.startsWith("/marketaccess")) {
          verticalTitle = "Market Access";
          //vertical = "/services/marketaccess";
          vertical = path.split('/')[1];
        } else if (path.startsWith("/health-economics")) {
          verticalTitle = "Health Economics";
          //vertical = "/services/health-economics";
          vertical = path.split('/')[1];
        } else if (path.startsWith("/intellectual-property")) {
          verticalTitle = "Intellectual Property";
          //vertical = "/services/intellectual-property";
          vertical = path.split('/')[1];
        } else {
         // verticalTitle = "Clinical";
          //vertical = "/services/clinical";
          //vertical = path.split('/')[1];
        }


        // add the vertical title to the breadcrumbs
        //$(".service-subpage-breadcrumbs").append('Services &gt; <a href="' + vertical + '">' + verticalTitle + '</a>  &gt; <a href="">' /*+ numberOfThisPortfolioItem + ". " */ + item.title + '</a>');
        //
        $(".sub-service-meta").prepend('<div class="service-subpage-breadcrumbs"><a href="/#services">Services</a> &gt; <a href="/' + vertical + '">' + verticalTitle + '</a>  &gt; <a href="">' /*+ numberOfThisPortfolioItem + ". " */ + item.title + '</a></div>');


         // set the meta (Step 1/12) above title
         //$(".automatic-sub-page-meta").html(" Step " + i + "/" + totalNumberOfPortfolioItems );
         // insert the above line html after ProductItem-next-prev-codeandtonic
         $(".sub-service-meta").append('<div class="automatic-sub-page-meta"> Step ' + i + '/' + totalNumberOfPortfolioItems + '</div>');

         //MINI-PAGINATION: ADD NEXT/PREV LINKS TO THE TOP OF THE PAGE FROM THE BOTTOM
         var prevOnlyPaginationHtml = '<div class="ProductItem-next-prev-codeandtonic"> <a class="codetonic-product-pagination-link-simple codetonic-prev" href="' + prevHref + '">Prev</a></div>';
         var nextOnlyPaginationHtml = '<div class="ProductItem-next-prev-codeandtonic"><a class="codetonic-product-pagination-link-simple codetonic-next" href="' + nextHref + '">Next</a></div>';
         var nextAndPrevPaginationHtml = '<div class="ProductItem-next-prev-codeandtonic"> <a class="codetonic-product-pagination-link-simple codetonic-prev" href="' + prevHref + '">Prev</a> <span class="ProductItem-nav-pagination-separator ProductItem-nav-pagination-separator--hasPrev ProductItem-nav-pagination-separator--hasNext"></span> <a class="codetonic-product-pagination-link-simple codetonic-next" href="' + nextHref + '">Next</a></div>';
         
       
         //make if else logic for adding the pagination html depending on if there is a next and prev or just one of them. add it before .automatic-sub-page-meta
         if(nextHref && prevHref) {
           //$(".automatic-sub-page-meta").before(nextAndPrevPaginationHtml);
           //actually isnert the html inside .sub-service-pagination
          // $(".sub-service-pagination").html(nextAndPrevPaginationHtml);
          //append pagination inside .sub-service-meta
           $(".sub-service-meta").append(nextAndPrevPaginationHtml);
         } else if (nextHref) {
           //$(".automatic-sub-page-meta").before(nextOnlyPaginationHtml);
          // $(".sub-service-pagination").html(nextOnlyPaginationHtml);
          //append pagination inside .sub-service-meta
           $(".sub-service-meta").append(nextOnlyPaginationHtml);
          
         } else if (prevHref) {
           //$(".automatic-sub-page-meta").before(prevOnlyPaginationHtml);
          // $(".sub-service-pagination").html(prevOnlyPaginationHtml);
          //append pagination inside .sub-service-meta
           $(".sub-service-meta").append(prevOnlyPaginationHtml);
          
         }

 
     }
   

 }); // end of json.items.forEach((item) => {

}); // end of fetch.then
} // end of portfolioSubPageFetch() function


/**
 * 5 KEY VERTICAL SPECIFIC EDITS -  COLORS FOR TOP BAR AND BOTTOM BAR IN IOS SAFARI 
 * AND CHROME OVERSCROLL
 * AND  .clinical -type BODY CLASS SO WE CAN STYLE TUBE MAP COLORS 
 */


// function to get CSS variable values from CSS
function getCSSVariableValue(variableName) {
  return getComputedStyle(document.documentElement).getPropertyValue(variableName);
}


//Function to set the body background color (bottom bar in iOS and chrome overscroll) and the top-bar theme color for iOS Safari
function setBodyBackgroundAndThemeColor(color) {
  $('body').css('background', color);
  $('head').append('<meta name="theme-color" content="' + color + '">');
}
// e.g. setBodyBackgroundAndThemeColor(getCSSVariableValue('--health-economics-brightpink'));


// add the vertical's class to the body and set its colour. className is also the vertical's first path segment, e.g. /regulatory
function addVerticalClassToBody(className, cssVariable) {
  document.querySelector('body').classList.add(className);
  setBodyBackgroundAndThemeColor(getCSSVariableValue(cssVariable));
}

var verticalColours = {
  'clinical': '--clinical-purple',
  'regulatory': '--regulatory-mintgreen',
  'intellectual-property': '--ip-darkblue',
  'health-economics': '--health-economics-brightpink',
  'marketaccess': '--marketaccess-lightblue'
};

// service pages and their sub-pages, e.g. /regulatory and /regulatory/pre-market-intended-use
var firstPathSegment = window.location.pathname.split('/')[1];
if (verticalColours[firstPathSegment]) {
  addVerticalClassToBody(firstPathSegment, verticalColours[firstPathSegment]);
}

// single blog post: colour by its first category, e.g. Regulatory = green
var blogCategoryColours = {
  'clinical': 'clinical',
  'regulatory': 'regulatory',
  'intellectual property': 'intellectual-property',
  'health economics': 'health-economics',
  'market access': 'marketaccess'
};

$(document).ready(function () {
  if (window.location.pathname.startsWith('/insights/') && $('.blog-item-wrapper').length) {
    var firstCategoryLink = document.querySelector('.blog-item-wrapper a[href*="/insights/category/"]');
    if (!firstCategoryLink) return;
    var category = decodeURIComponent(firstCategoryLink.getAttribute('href').split('/insights/category/')[1]).replace(/\+/g, ' ').toLowerCase();
    if (category === 'case study') {
      addVerticalClassToBody('case-study', '--case-study-orange');
    } else if (blogCategoryColours[category]) {
      addVerticalClassToBody(blogCategoryColours[category], verticalColours[blogCategoryColours[category]]);
    }
  }
});


// Portfolio sub pages - has pagination but not .blog-item-wrapper like single blog post OR .blog-list-pagination like blog list page (which also has empoty #itemPagination for some reason)
$(document).ready(function () {

    //if($('#itemPagination').length && !$('.blog-item-wrapper').length){
      // if page has #itemPagination and does not have .blog-item-wrapper and does not have .blog-list-pagination
      if($('#itemPagination').length && !$('.blog-item-wrapper').length && !$('.blog-list-pagination').length){
      $('body').addClass('portfolio-main-or-child-page portfolio-child-page');
      portfolioSubPageFetch();
  }
});


// link to services section on homepage (by scrolling to it) so we can use the link on breadcrumbs
var servicesDataSectionID = '630906727a98a14798f4b3f4'
$(document).ready(function () {
  if (window.location.hash == '#services') {
    $('html, body').animate({
      //scrollTop: $('[data-section-id="630906727a98a14798f4b3f4"]').offset().top 
      // use the variable instead of the hardcoded data-section-id
      scrollTop: $('[data-section-id="' + servicesDataSectionID + '"]').offset().top - 40 // -40 to account for the sticky header
    }, 1000);
  }
});


//EXTERNAL LINKS IN NEW TABS
//function that loops each link, cheks if its internal or external. if it's external, it adds a target="_blank" attribute to it.
function addTargetBlankToExternalLinks() {
  /*
  loop through all links on the page
  check if link starts with http or https
  if it does start with http, then check if it contains hardianhealth.com or hardian-health-71.squarespace.com
  those are the only 2 domains we use. if it starts with http AND doesn't contain either of those, then it's an external link and we add target="_blank" to it. 
  also add a class "automatic-external-link" to it so we can style it
  */
    $('a').each(function () {
      if ($(this).attr('href').startsWith('http')) {
        if (!$(this).attr('href').includes('hardianhealth.com') && !$(this).attr('href').includes('hardian-health-71.squarespace.com')) {
          $(this).attr('target', '_blank');
          $(this).addClass('automatic-external-link');
        }
      }
    });
}

//run the function on document ready
$(document).ready(function () {
  addTargetBlankToExternalLinks();
});


/**
 * CONTACT FORM THANK-YOU: cube, styling, GTM and LinkedIn conversion
 * Scripts in the form's Post-Submit HTML don't run with Squarespace's current form block,
 * so we watch for the form's own save request and react to it here instead.
 * Keep the form's Post-Submit HTML empty, or these events will be sent twice.
 */
if (window.location.pathname === '/contact') {
  var contactFormSubmitted = false;

  var onContactFormSubmitted = function () {
    if (contactFormSubmitted) return;
    contactFormSubmitted = true;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'event': 'contact-form-submit' });
    if (window.lintrk) window.lintrk('track', { conversion_id: 15337562 });

    // wait for Squarespace to swap the form for the thank-you message, then add the cube under it
    var tries = 0;
    var addCube = function () {
      var block = document.querySelector('.sqs-block-form');
      if (!block) return;
      if (block.querySelector('form') && tries++ < 50) return setTimeout(addCube, 100);
      block.classList.add('hh-form-submitted');
      if (!block.querySelector('.hh-form-thanks')) {
        var thanks = document.createElement('div');
        thanks.className = 'hh-form-thanks';
        thanks.innerHTML = '<div data-hardian-cube data-background="transparent"></div>';
        (block.querySelector('.sqs-block-content') || block).appendChild(thanks);
      }
      if (!window.HardianCube && !document.querySelector('script[src*="hardian-cube.js"]')) {
        var s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/gh/hardian-health-code/Cube@main/dist/hardian-cube.js';
        document.head.appendChild(s);
      }
    };
    addCube();
  };

  // the form component saves with an XHR to .../SaveFormSubmission
  var originalXhrOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    if (String(url).indexOf('SaveFormSubmission') !== -1) {
      this.addEventListener('load', function () {
        if (this.status >= 200 && this.status < 300) onContactFormSubmitted();
      });
    }
    return originalXhrOpen.apply(this, arguments);
  };

  // in case it uses fetch instead
  if (window.fetch) {
    var originalFetch = window.fetch;
    window.fetch = function (input) {
      var url = typeof input === 'string' ? input : (input && input.url) || '';
      var request = originalFetch.apply(this, arguments);
      if (url.indexOf('SaveFormSubmission') !== -1) {
        request.then(function (response) { if (response.ok) onContactFormSubmitted(); });
      }
      return request;
    };
  }
}
