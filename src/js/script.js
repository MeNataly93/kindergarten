// SHADOW FOR NAV IN SCROLL

const nav = document.getElementById("nav");
document.onscroll = function navStyleScroll() {
  const navCoords = nav.getBoundingClientRect();
  nav.style.boxShadow = "none";

  if (navCoords.top === 0) {
    nav.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.2)";
  }
};

// ARROW SCROLL - VISIBLE OR NOT
const arrow = document.getElementById("arrow");
function arrowNone() {
  let scrollHeight = window.pageYOffset;
  arrow.style.display = "block";
  if (scrollHeight < 460) {
    arrow.style.display = "none";
  }
}
setInterval(arrowNone, 1);

// MENU-BUTTON
const menuButtonContainer = $("#menu-button-container");
const menuButton = $("#menu-button");
const closeButton = $("#close-button");
const mobileMenuContainer = $("#menu-container-mobile");
const mobileMenuPlus = $(".nav__mobile__hidden-list__item_arrow");
const mobileMenuSublist = $(".nav__mobile__hidden-list__sublist");
const mobileMenuItem = $(".nav__mobile__hidden-list__item");
const menuGallery = $("#menu-gallery");

// Click on menu-button
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

// Hide opened mobile-menu in desctop version
function resetMobileMenu() {
  menuButton.removeClass("none");
  closeButton.addClass("none");
  mobileMenuContainer.hide();
  mobileMenuPlus.html("+");
  mobileMenuSublist.hide();
}

// Open subitems when click on +

mobileMenuItem.on("click", function () {
  if ($(this) == $("#menu-gallery")) {
    console.log("hi");
  // } !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if ($(this).children().is(`:contains("+")`)) {
    //

    $(this).children().html("-");
    $(this).next(".nav__mobile__hidden-list__sublist").slideDown();
    return;
  } else if ($(this).children().is(`:contains("-")`)) {
    //

    $(this).children().html("+");
    $(this).next(".nav__mobile__hidden-list__sublist").slideUp();
    return;
  } else return;
});

// OTHER

function initMobile() {
  console.log("is-mobile");
}

function initTablet() {
  console.log("is-tablet");
}

function initDesktop() {
  resetMobileMenu();
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
