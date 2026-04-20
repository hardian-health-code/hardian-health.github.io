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
    console.log("url contains .squarespace.com so we're assuming it's admin logged in and won't cache the portfolio SEO description");
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');

} else{
    console.log("url  DOES NOT contain .squarespace.com. Assuming its' a visitor and will cache portfolio SEO description to make everything quicker");
}












/**
* 🌸🌸🌸 SECTION - BLOG STUFF
*/

// SINGLE BLOG POST: reposition tags and categories to be under author bio inside .custom-metabox
$( document ).ready(function() {    
  if( (window.location.pathname.includes("/insights")) && $('article').length   ){
      console.log("blog page and article found. LEt's fix meta categories and tags");
  
      
//move categories and tags after author
$("<div class='custom-metabox'></div>").insertAfter(".blog-item-author-profile-wrapper");
$(".blog-meta-item--date").prependTo(".custom-metabox"); /* <-- ADD THIS LINE TO RESCUE THE DATE */
$("div.blog-meta-item.blog-meta-item--tags").prependTo(".custom-metabox");
          
          
          //create labeels for categories and tags
          $("<span class='custom-meta-label category-label'>Categories:</span>").prependTo("div.blog-meta-item.blog-meta-item--categories");
          $("<span class=' custom-meta-label custom-tag-label'>Tags:</span>").prependTo("div.blog-meta-item.blog-meta-item--tags");    
  
  }
}); 





// if Blog category page (filtering of blog post) is on, let's make this category tag in each blog post (inside grid) have a class so we can show that yeah, this blog post is indeed filtered correctly
$( document ).ready(function() {    
  if(window.location.pathname.includes("/insights/category/")){
console.log("category page - filtering enabled");
$("body").addClass("blog-category-filtered");

var currentCategory = window.location.pathname;
console.log()
$(".blog-categories-list a").each(function(i){
var categoryLabelLink = $(this).attr("href");
  console.log(categoryLabelLink);

  if(categoryLabelLink == currentCategory){
      console.log("ACTIVATE THIS ONE");
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
            console.log(" ✅ Blog Tag Navigation — Current URL and the link matches. Lets style it to be active:" + $(this).text());
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
 * SINGLE POST DATE FORMAT (REPAIRED)
 */
$( document ).ready(function() {    
    // Check if the metadata exists
    if(document.querySelector("meta[itemprop='datePublished']")){
        var publishDate = $('meta[itemprop="datePublished"]').attr("content");
        
        // Safely extract the YYYY-MM-DD format
        var dateOnly = publishDate.split("T")[0]; 

        // Inject it directly into the <time> tag, avoiding the missing 'span' bug
        $(".blog-meta-item--date time.blog-date").text(dateOnly);
        
        // Add the visibility classes just in case
        $(".blog-meta-item--date").addClass("dateFormatted-and-ready-to-show");
    } else {
        console.log("No meta description for blog date found.");
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

  function animateStrikedThroughHeadingsCodeAndTonicStyle(){
    
  }
  
     //code that might throw an exception
     var howLongWeShowALineFor = 2500;
     var howCloseShouldTheAnimationsOverlap = 360;
     var letterspeed = 45;
     $( document ).ready(function() {    
         
     
     
     
     //select a heading that has a strike through (way for user to select a heading to be animated)
     var animatedH1 = $( "h1, h2, h3" ).has( "span[style*='line-through']" ); // let's check if we have a heading with a strike through first
     if(animatedH1.length){
          console.log("✅ We have a heading with a strike through. Let's animate it");
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
         console.log(animationArray[i]); 
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
        console.log("no heading with a strike through - no animation for you");
  
     }
  
     
     
     
       
       }); 
  
  
  
  
  } //END OF TRY FUNCTION
  catch (e) {
     //code to handle the exception
     console.log("no animation for striketrough headings here...");
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

  //fetchAndAddDescriptions();
  // check if we have this element: #gridThumbs.portfolio-grid-basic on the page. if we do, run the function
  if (document.querySelector("#gridThumbs.portfolio-grid-basic")) {
      console.log("we are on a portfolio page");
      fetchAndAddDescriptions();
  }
});
//end of document ready



$(document).ready(function() {

  //fetchAndAddDescriptions();
  // check if we have this element: #gridThumbs.portfolio-grid-basic on the page. if we do, run the function
  if (document.querySelector("#gridThumbs.portfolio-grid-basic")) {
      console.log("we are on a portfolio page");
      //add class to the body: .main-service-portfolio-milestones-page
      $('body').addClass('portfolio-main-or-child-page portfolio-parent-page');
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
  console.log(distance);
  //if the distance is less than 50px. for each scrolled pixel add 1px more to the CSS height of the .tube-item-vertical-line
  // console log the distance of window top VS top of page

  var pageWindowOffset = window.pageYOffset
  console.log('window top: ' + pageWindowOffset);


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

  console.log('last grid item bottom: ' + lastGridItemBottom);




  if ( (distance < verticalLineAnimationOffset ) && (lastGridItemBottom > verticalLineAnimationOffset) ) {
      console.log("ANIMATE");
      // edit height of .tube-item-vertical-line so when distance is 50, the height is 0. when distance is 40, the height is 10. when distance is 30, the height is 20. when distance is 20, the height is 30. when distance is 10, the height is 40. when distance is 0, the height is 50. but it'll keep growing as you scroll down

      document.querySelector('.tube-item-vertical-line').style.height = (verticalLineAnimationOffset - distance) + 'px';
  }
  // make else if statements for when we are over the animation offset and when we are under the animation offset
  else if (lastGridItemBottom < verticalLineAnimationOffset) {
    console.log("Stop animation. We are over the animation offsets. let's not animate as we've scrolled past the last grid item bottom and dont want to make the line too long. however let's make sure the line reaches the bottom of the last grid item even if we scroll too quickly ");
    //a bug. if scrolling too quickly the line may not reach  the bottom of the last grid item. it may stay a few px short. let's fix that
    document.querySelector('.tube-item-vertical-line').style.height = (lastGridItemBottom - distance) + 'px'; // so the height is until the bottom of the last grid item? yes
  }
  else {
    console.log("Stop animation. We are under the animation offsets. Let's not animate if we're not yet at the timeline");
    // same problem here, when scrolling up fast, we may leave a few px of the line visible. when it should be 0px if we're above timeline. let's fix that
    document.querySelector('.tube-item-vertical-line').style.height = 0 + 'px'; // so the height is 0px? yes
  }
  
  /*else {
    console.log("Stop animation. We are over or under the animation offsets. Let's not animate if we're too high on page or if we're past the last grid item bottom");
  }*/


      /*
          // ⛔ let's use a more simple function below a function that checks if the .tube-item-vertical-line overlaps with a .number. if it does, add a class to the .number called "number-overlap"
            function checkOverlap() {
              var verticalLine = document.querySelector('.tube-item-vertical-line');
              var numbers = document.querySelectorAll('.number');
              numbers.forEach(function(number) {
                var numberRect = number.getBoundingClientRect();
                var verticalLineRect = verticalLine.getBoundingClientRect();
                if (numberRect.top < verticalLineRect.bottom && numberRect.bottom > verticalLineRect.top) {
                  number.classList.add('number-overlap');
                } else {
                  number.classList.remove('number-overlap');
                }
              });
            }

            //checkOverlap();
    */


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


/* make a jquery $ thing from following html
<div>







*/ 

//add the html before the pagination element here with jQuery








function portfolioSubPageFetch() {

var pageTitle = document.title;
console.log("pageTitle: " + pageTitle);

var fetchUrl = window.location.origin + window.location.pathname.split("/").slice(0, -1).join("/") + "?format=json-pretty";
console.log("fetchUrl: " + fetchUrl);


fetch(fetchUrl, { 
   method: 'GET',
   headers: myHeaders
})
.then(function(response) { return response.json(); })
.then(function(json) {
   console.log("json: " + json);

   // make an iterator number. To check which nth page we are on
   var i = 0;

   var numberOfThisPortfolioItem = 0;

   jsonItems = json.items;
    console.log("jsonItems: " + jsonItems);
   
    totalNumberOfPortfolioItems = jsonItems.length;
    //log it:
    console.log("totalNumberOfPortfolioItems: " + totalNumberOfPortfolioItems);
    
    // loop through the json and find the title that matches the page title
   json.items.forEach((item) => {
    i++;
    console.log("i: " + i);

     if (pageTitle.toLowerCase().includes(item.title.toLowerCase())) { // we found this page from json portfolio items list

          numberOfThisPortfolioItem = i;
         
        
         /* 
         //skip automatic title and lead for now
            // Get this pages title from json so we can use it in the h1
            thisPageH1Title = item.title;
              document.querySelector('.automatic-sub-page-title').innerHTML = thisPageH1Title; // TODO hide until we have the title
              document.querySelector('.automatic-sub-page-title').classList.add('jsonContentLoadedFadeIn');
            
              //do the same thing for the lead (.sqsrte-large) using item.seoData.seoDescription instead of item.title
              thisPageLead = item.seoData.seoDescription;
              document.querySelector('.automatic-sub-page-lead').innerHTML = thisPageLead; // TODO hide until we have the title
              document.querySelector('.automatic-sub-page-lead').classList.add('jsonContentLoadedFadeIn');
          */
          


          // PAGINATION: ADD NUMBERS TO NEXT/PREV 
          $(".item-pagination-link--next .item-pagination-title").text( (numberOfThisPortfolioItem + 1) + ". " + $(".item-pagination-link--next .item-pagination-title").text());
          //same for item-pagination-link--prev but with the number of the previous item
          $(".item-pagination-link--prev .item-pagination-title").text( (numberOfThisPortfolioItem - 1) + ". " + $(".item-pagination-link--prev .item-pagination-title").text());

          /*
          prepend follow html before "".automatic-sub-page-title": <div class="ProductItem-next-prev-codeandtonic"> <a class="codetonic-product-pagination-link-simple codetonic-prev" href="/shop/p/acuity-scheduling-redirect-forward-plugin">Prev</a> <span class="ProductItem-nav-pagination-separator ProductItem-nav-pagination-separator--hasPrev ProductItem-nav-pagination-separator--hasNext"></span> <a class="codetonic-product-pagination-link-simple codetonic-next" href="/shop/p/squarespace-text-animations">Next</a></div>
          */
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
          console.log("!!!!!!!!");
          //vertical = "/clinical";// get this automatically from the path
          //vertical = path.split('/')[1];
          vertical = path.split('/')[1];
        } else if (path.startsWith("/regulatory")) {
          verticalTitle = "Regulatory";
          //vertical = "/services/regulatory";
          vertical = path.split('/')[1];
        } else if (path.startsWith("/marketaccess")) {
          verticalTitle = "marketaccess";
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

 
     } else{
         console.log( item.title + " VS " + pageTitle + " — not a match.");
     }
   

 }); // end of json.items.forEach((item) => {

}); // end of fetch.then
} // end of portfolioSubPageFetch() function


// run portfolioSubPageFetch() on jquey document ready

$(document).ready(function () {
  //portfolioSubPageFetch();
});









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


//make a function that will check if window location path contains a substring. if it does, add a class to the body. it takes 3 arguments: the substring to check for, the class to add to the body and a css variable to set as the body background color
function checkIfPathContainsSubstringAndAddClassToBody(substring, className, cssVariable) {
  var path = window.location.pathname;
  var body = document.querySelector('body');
  if (path.includes(substring)) {
    body.classList.add(className);
    setBodyBackgroundAndThemeColor(getCSSVariableValue(cssVariable));
  }
}

// TODO check final urls - run it for each vertical

checkIfPathContainsSubstringAndAddClassToBody('health-economics', 'health-economics', '--health-economics-brightpink');
checkIfPathContainsSubstringAndAddClassToBody('/marketaccess', 'marketaccess', '--marketaccess-lightblue');
checkIfPathContainsSubstringAndAddClassToBody('/intellectual-property', 'intellectual-property', '--ip-darkblue');
checkIfPathContainsSubstringAndAddClassToBody('/regulatory', 'regulatory', '--regulatory-mintgreen');
checkIfPathContainsSubstringAndAddClassToBody('/clinical', 'clinical', '--clinical-purple');


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




//CUBE from https://github.com/marklundin/cube
// CSS added to our less – library dependencies loaded in page specific code injection.


$(document).ready(function () {
  // If the window location href includes /cube BUT does not include .squarespace.com
  if(window.location.href.includes('/cube') && !window.location.href.includes('.squarespace.com')){
    console.log("Launching Cube as we're not on a Squarespace logged-in page BUT are on /cube");

    // Load the scripts
    $.when(
      //$.getScript("https://codetonics3bucket.s3-eu-north-1.amazonaws.com/cube/js/cube/cuber.min.js"), 
      //use https://hardian-health-71.squarespace.com/s/cubermin.js instead of https://codetonics3bucket.s3-eu-north-1.amazonaws.com/cube/js/cube/cuber.min.js
      $.getScript("https://hardian-health-71.squarespace.com/s/cubermin.js"),
      //$.getScript("https://codetonics3bucket.s3-eu-north-1.amazonaws.com/cube/js/photon.js") use https://hardian-health-71.squarespace.com/s/photon.js instead of https://codetonics3bucket.s3-eu-north-1.amazonaws.com/cube/js/photon.js
      $.getScript("https://hardian-health-71.squarespace.com/s/photon.js")
    ).done(function(){
      // Cube code which will run once the scripts are loaded and generate the cube
      var container = document.querySelector('#cube-container'),
          cube      = new ERNO.Cube(),
          light     = new Photon.Light(10, 0, 100);

      container.appendChild(cube.domElement);
     
     
     
        /**
 * Generates a random scramble string for a Rubik's cube.
 * The scramble ensures:
 * 1. No same move is repeated consecutively.
 * 2. No move is immediately followed by its inverse.
 * 
 * @param {number} length - Number of moves in the scramble string.
 * @return {string} - The scramble string.
 */
function generateRandomString(length) {
  // Possible moves on a Rubik's cube
  const moves = ['U', 'u', 'D', 'd', 'R', 'r', 'L', 'l'];

  // Mapping of a move to its inverse.
  // This helps in quickly finding the inverse of a move, e.g., 'U' -> 'u'.
  const inverseMoves = {'U': 'u', 'u': 'U', 'D': 'd', 'd': 'D', 'R': 'r', 'r': 'R', 'L': 'l', 'l': 'L'};

  let scramble = ''; // To build the resulting scramble string
  let lastMove = null; // To track the last move that was added to the scramble

  // Generate the scramble string move-by-move
  for (let i = 0; i < length; i++) {
      let nextMove;
      do {
          // Randomly select a move from the list
          nextMove = moves[Math.floor(Math.random() * moves.length)];
      } 
      // Check if the selected move is either the same as the last move
      // or is the inverse of the last move.
      // If either condition is true, we loop again to pick a different move.
      while (nextMove === lastMove || nextMove === inverseMoves[lastMove]);

      // Append the selected move to the scramble string
      scramble += nextMove;
      // Update lastMove to the move we just added
      lastMove = nextMove;
  }

  return scramble;
}

// Usage:
const randomstring = generateRandomString(8);
//console.log("Rubic: " + randomstring);
cube.twist(randomstring.multiply(1));

    



    });
  } //else if /cube AND .squarespace.com, do nothing
  else if(window.location.href.includes('/cube') && window.location.href.includes('.squarespace.com')){
    console.log("Not launching Cube as we're on a Squarespace logged-in page AND on /cube");
    // #cube-container add a h2 saying "Cube is not available on Squarespace logged-in pages. Please visit via hardianhealth.com instead of hardian-health-71.squarespace.com."
  }

  //refresh icon
  //link with #cube-refresh as href for click
  $("a.refresh").click(function(){
    console.log("refresh click");
    location.reload();
});

});


/*
if (window.location.href.includes('cube')) {
  console.log("Cube");
  $( document ).ready(function() {    
  

      var container 	= document.querySelector( '#cube-container' ),
      cube 		= new ERNO.Cube();
      light 		= new Photon.Light( 10, 0, 100 );

    container.appendChild( cube.domElement );   
  }); 
  
}
*/







/**
 * animation canvas test
 */

/*
// get the Squarespace section ID for the section you want to add the canvas to
var sectionIDforCanvas = '63ff4493e22cef12e961eace';

$('<canvas id="canv" style=""></canvas>').prependTo('section[data-section-id="' + sectionIDforCanvas +'"] .section-background');

//need a z-index to show content in front of canvas
$('section[data-section-id="' + sectionIDforCanvas +'"] .content-wrapper ').css("z-index", "2");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const aspectRatio = 16 / 9;

function setCanvasDimensions() {
  const windowAspectRatio = window.innerWidth / window.innerHeight;
  if (windowAspectRatio > aspectRatio) {
    canvas.width = window.innerHeight * aspectRatio;
    canvas.height = window.innerHeight;
  } else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth / aspectRatio;
  }
}

setCanvasDimensions();

class Circle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#a37af5";
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

const circles = [];

function createCircles() {
  circles.length = 0;
  for (let i = 0; i < 6; i++) {
    const radius = Math.random() * 100 + 50;
    let x = Math.random() * (canvas.width - radius) + radius / 2;
    let y = Math.random() * (canvas.height - radius * 2) + radius / 2;
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;

    // Avoid middle horizontal and vertical space
    while ((x > canvas.width * 0.3 && x < canvas.width * 0.7) || (y > canvas.height * 0.3 && y < canvas.height * 0.7)) {
      x = Math.random() * (canvas.width - radius) + radius / 2;
      y = Math.random() * (canvas.height - radius * 2) + radius / 2;
    }

    circles.push(new Circle(x, y, radius, dx, dy));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const circle of circles) {
    circle.update();
  }
}

function resizeCanvas() {
  setCanvasDimensions();
  createCircles();
}

window.addEventListener("resize", resizeCanvas);

createCircles();
animate();

*/


//if page path contains /cube, then run function on domready






