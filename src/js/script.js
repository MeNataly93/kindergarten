// --SHADOW FOR NAV IN SCROLL

const nav = document.getElementById("nav");
document.onscroll = function navStyleScroll() {
  const navCoords = nav.getBoundingClientRect();
  nav.style.boxShadow = "none";

  if (navCoords.top === 0) {
    nav.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.2)";
  }

  const scrollTop = document.documentElement.scrollTop;
  if (scrollTop === 0) {
    nav.style.boxShadow = "none";
  }
};

// --ARROW SCROLL
// -Visible or not
const arrow = document.getElementById("arrow");
function arrowNone() {
  let scrollHeight = window.pageYOffset;
  arrow.style.display = "block";
  if (scrollHeight < 460) {
    arrow.style.display = "none";
  }
}
setInterval(arrowNone, 1);
// -Scroll to which element due to media query
const mediaQuery = window.matchMedia("(min-width: 990px)");
function scrollTo() {
  if (mediaQuery.matches) {
    arrow.href = "#header-container";
  } else arrow.href = "#";
}

// --MENU-BUTTON and MOBILE MENU
// -Button
const menuButtonContainer = $("#menu-button-container");
const menuButton = $("#menu-button");
const closeButton = $("#close-button");

// -Mobile menu
const mobileMenuContainer = $("#menu-container-mobile");
const mobileMenuSublist = $(".nav__mobile__hidden-list__sublist");
const mobileMenuPlus = $(".nav__mobile__hidden-list__item_arrow");
const mobileMenuItem = $(".nav__mobile__hidden-list__item");

// -Open or close mobile-menu

menuButtonContainer.on("click", function (e) {
  e.preventDefault();
  menuButton.toggleClass("none");
  if (menuButton.hasClass("none")) {
    closeButton.removeClass("none");
    mobileMenuContainer.slideDown();
  } else {
    closeButton.addClass("none");
    mobileMenuContainer.slideUp();
    mobileMenuPlus.html("+");
    mobileMenuSublist.hide();
  }
});

// -Hide opened mobile-menu in desctop version
function resetMobileMenu() {
  menuButton.removeClass("none");
  closeButton.addClass("none");
  mobileMenuContainer.hide();
  mobileMenuPlus.html("+");
  mobileMenuSublist.hide();
}

// -Open subitems when click on +

mobileMenuItem.on("click", function () {
  $(this)
    .closest("li.first-list")
    .prevAll("li.first-list")
    .next("ul")
    .slideUp()
    .end()
    .closest("li.first-list")
    .children()
    .html("+");
  $(this)
    .closest("li.first-list")
    .nextAll("li.first-list")
    .next("ul")
    .slideUp()
    .end()
    .closest("li.first-list")
    .children()
    .html("+");

  if ($("#about-arrow").is(`:contains("+")`)) {
    $("#about-gallery-arrow").html("+");
    $("#about-gallery-sublist").slideUp();
  }

  if ($(this).children().is(`:contains("+")`)) {
    $(this).children().html("-");
    $(this).next(".nav__mobile__hidden-list__sublist").slideDown();
    return;
  } else if ($(this).children().is(`:contains("-")`)) {
    $(this).children().html("+");
    $(this).next(".nav__mobile__hidden-list__sublist").slideUp();

    return;
  }
  return;
});

// --DESCTOP MENU

// -Open menu

const menuItem = $(".nav-container__nav__item");
const menuSublist = $(".nav__desctop-list");

// -Hover on main menu item
// *When hover on main menu - open list of nesessary item

menuItem.mouseover(function () {
  // *Close other blocks
  // $(this)
  //   .siblings(".nav-container__nav__item")
  //   .removeClass("opened")
  //   .children(".nav__desctop-list")
  //   .slideUp("slow");
  // *Find coords and give it to item-block
  let subItemTop = $(this).height();

  let subItemleft = -$(this).children(".nav__desctop-list").width() * 0.4;

  $(this).children(".nav__desctop-list").css({
    left: subItemleft,
    top: subItemTop,
  });

  // *Open nesessary item-block
  $(this).addClass("opened").children(".nav__desctop-list").slideDown("slow");
});

// -Open second sublist
// * Open second list, if it is
// *All items
const subItems = $(".nav__desctop-list__item__sub");
// *Items, which have second list
const secondSublist = $(".second-sublist");

// * When mouse is on item with sublist - open sub item-block
subItems.mouseover(function () {
  // *Close other blocks

  $(this)
    .siblings(".nav__desctop-list__item__sub")
    .removeClass("sub-opened")
    .children("ul.nav__desctop-list")
    .slideUp("slow");

  // -Coords
  let secondSubItemTop = $(this).position().top;
  let secondSubItemleft = $(this).position().left + $(this).width();

  $(this).children(".nav__desctop-list").css({
    left: secondSubItemleft,
    top: secondSubItemTop,
  });

  // *Open nessessary block

  if ($(this).hasClass("second-sublist")) {
    $(this)
      .addClass("sub-opened")
      .children("ul.nav__desctop-list")
      .slideDown("slow");
    return;
  }

  return;
});

// -Close sublist when it is not hover
secondSublist.children("ul").mouseout(function () {
  if (secondSublist.is(":hover")) {
    return;
  }

  $(this)
    .parent(".second-sublist")
    .removeClass("sub-opened")
    .children(".nav__desctop-list")
    .slideUp("slow");
  return;
});

// -Hide opened desctop-menu in mobile/tablet version
function resetDesctopMenu() {
  menuItem.removeClass("opened").children(".nav__desctop-list").slideUp("slow");
  menuItem
    .children("ul.nav__desctop-list")
    .children(".second-sublist")
    .removeClass("sub-opened")
    .children("ul.nav__desctop-list")
    .slideUp("slow");
  return;
}

// -Close menu when it is not hover
$(document).mouseover(function (e) {
  if ($(e.target).is(".nav-container__nav__item")) {
    return;
  }
  if ($(e.target).is(".nav-container__nav__item__point")) {
    return;
  }
  if ($(e.target).is(".nav-container__nav__item__point use")) {
    return;
  }
  if ($(e.target).is(".nav__desctop-list")) {
    return;
  }
  if ($(e.target).is(".nav__desctop-list__item")) {
    return;
  }
  resetDesctopMenu();
});

// --SLIDER IN TITLE
$("#slider").slick({
  arrows: false,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplaySpeed: 5000,
  infinity: true,
  fade: true,
  speed: 2000,
});

// --MAIN SLIDER

const settings = {
  arrows: false,
  autoplay: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplaySpeed: 5000,
  infinity: true,
  speed: 2000,
  dots: true,
  appendDots: ".mydots",
  dotsClass: "dots-box",
  responsive: [
    { breakpoint: 1600, settings: { slidesToShow: 4 } },
    { breakpoint: 990, settings: { slidesToShow: 3 } },
  ],
};

$("#slider-main").slick(settings);

// --FANCY BOX
Fancybox.bind("[data-fancybox]", {
  Toolbar: false,
  Thumbs: false,
});

// --COUNTER

const statBlock = document.querySelector(".statinfo");
// -Find nesessary coords
// *Find coords every 10ms
const checkCoordsInt = setInterval(checkCoords, 10);
function checkCoords() {
  // *Coords from statBlock to top
  let statCoords = statBlock.getBoundingClientRect().top;
  // *85% of visible display
  let displayHeight = document.documentElement.clientHeight * 0.85;

  if (statCoords < displayHeight) {
    clearInterval(checkCoordsInt);
    counterActive();
  }
}

// -Coutner in active phase
function counterActive() {
  const counters = document.querySelectorAll(".js-counter");
  counters.forEach((counter) => {
    counter.innerText = "0";
    const updateCounter = () => {
      const target = +counter.getAttribute("data-target");
      const c = +counter.innerText;
      const increment = target / 32;

      if (c < target) {
        counter.innerText = `${Math.ceil(c + increment)}`;
        setTimeout(updateCounter, 40);
      } else counter.innerText = target;
    };
    updateCounter();
  });
}

// --PRICES - LINES ANIMATION
const lineFirst = document.querySelector(".js-92");
const lineSecond = document.querySelector(".js-75");
const lineThird = document.querySelector(".js-63");
// -Find nesessary coords
// *Find coords every 10ms
const checkLineCoordsInt = setInterval(checkLineCoords, 10);
function checkLineCoords() {
  // *Coords from Line to top
  let lineCoords = lineFirst.getBoundingClientRect().top;
  // *85% of visible display
  let displayHeight = document.documentElement.clientHeight * 0.85;

  if (lineCoords < displayHeight) {
    lineFirst.classList.add("js-92_active");
    setTimeout(function () {
      lineSecond.classList.add("js-75_active");
      setTimeout(function () {
        lineThird.classList.add("js-63_active");
      }, 100);
      clearInterval(checkLineCoordsInt);
    }, 100);
  }
}

// --OTHER
function initMobile() {
  resetDesctopMenu();
  scrollTo();
  console.log("is-mobile");
}

function initTablet() {
  resetDesctopMenu();
  scrollTo();
  console.log("is-tablet");
}

function initDesktop() {
  resetMobileMenu();
  scrollTo();
  console.log("is-desktop");
}

ssm.addStates([
  {
    id: "mobile",
    query: "(max-width: 640px)",
    onEnter: function () {
      initMobile();
    },
  },
  {
    id: "tablet",
    query: "(min-width: 641px) and (max-width: 1199px)",
    onEnter: function () {
      initTablet();
    },
  },
  {
    id: "desktop",
    query: "(min-width: 1200px)",
    onEnter: function () {
      initDesktop();
    },
  },
]);
