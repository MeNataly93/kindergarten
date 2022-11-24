// --SHADOW FOR NAV IN SCROLL

const nav = document.getElementById("nav");
document.onscroll = function navStyleScroll() {
  const navCoords = nav.getBoundingClientRect();
  nav.style.boxShadow = "none";

  if (navCoords.top === 0) {
    nav.style.boxShadow = "0 0 5px rgba(0, 0, 0, 0.2)";
  }
};

// --ARROW SCROLL - VISIBLE OR NOT
const arrow = document.getElementById("arrow");
function arrowNone() {
  let scrollHeight = window.pageYOffset;
  arrow.style.display = "block";
  if (scrollHeight < 460) {
    arrow.style.display = "none";
  }
}
setInterval(arrowNone, 1);

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

// -Hover on menu item
// *When hover on main menu - open list of nesessary item

menuItem.mouseover(function () {
  // *Find coords and give it to item-block
  let subItemTop =
    $(this).closest(".nav-container__nav__item ").position().top +
    $(this).closest(".nav-container__nav__item ").height();

  let subItemleft =
    $(this).closest(".nav-container__nav__item ").position().left -
    $(this).next(".nav__desctop-list").width() * 0.4;
  $(this).next(".nav__desctop-list").css({
    left: subItemleft,
    top: subItemTop,
    "margin-top": 15,
  });

  // *Open item-block
  $(this).addClass("opened").next(".nav__desctop-list").slideDown();

  // $(this)
  //   .next(".nav__desctop-list")
  //   .mouseout(function () {
  //     $(this)
  //       .prev(".nav-container__nav__item")
  //       .removeClass("opened")
  //       .next(".nav__desctop-list")
  //       .slideUp();
  //     return;
  //   });
});

// -ONCLICK
// menuItem.on("click", function () {
//   let subItemTop =
//     $(this).closest(".nav-container__nav__item ").position().top +
//     $(this).closest(".nav-container__nav__item ").height();

//   let subItemleft =
//     $(this).closest(".nav-container__nav__item ").position().left -
//     $(this).next(".nav__desctop-list").width() * 0.4;

//   $(this).next(".nav__desctop-list").css({
//     left: subItemleft,
//     top: subItemTop,
//     "margin-top": 15,
//   });
//   if ($(this).hasClass("opened")) {
//     $(this).removeClass("opened").next(".nav__desctop-list").slideUp();
//     return;
//   }

//   $(this).addClass("opened").next(".nav__desctop-list").slideDown();
//   return;
// });

// -Open second sublist
// * Open second list, if it is
// *All items
const subItems = $(".nav__desctop-list__item__sub");
// *Items, which have second list
const secondSublist = $(".second-sublist");

// * When mouse is on item with sublist - open sub item-block
subItems.mouseover(function () {
  // if ($(this).hasClass("sub-opened")) {
  //   $(this).removeClass("sub-opened").next(".nav__desctop-list").slideUp();
  //   return;
  // }
  // -Coords

  let secondSubItemTop = $(this)
    .closest(".nav__desctop-list__item")
    .position().top;
  let secondSubItemleft =
    $(this).closest(".nav__desctop-list__item").position().left +
    $(this).closest(".nav__desctop-list").width();

  $(this).next(".nav__desctop-list").css({
    left: secondSubItemleft,
    top: secondSubItemTop,
  });

  $(this).addClass("is-here");

  // *Close other sublists
  $(this)
    .parent()
    .children(".nav__desctop-list__item")
    .removeClass("sub-opened");
  if ($(this).hasClass("no-sublist")) {
    $(this).parent().children("ul.nav__desctop-list").slideUp();
  }

  if ($(this).hasClass("second-sublist")) {
    $(this).addClass("sub-opened").next("ul.nav__desctop-list").slideDown();
    return;
  }

  return;
});

// subItems.mouseleave(function () {
//   if ($(this).hasClass("second-sublist")) {
//     $(this).removeClass("sub-opened");
//   }
// });

// secondSublist.next("ul").mouseover(function () {
//   $(this).prev("second-sublist").addClass("in-here");
// });

secondSublist.next("ul.nav__desctop-list").mouseover(function () {
  $(this).prev(".second-sublist").removeClass("is-here");
});

// -Close second sublist
secondSublist.next("ul").mouseleave(function () {
  // *!!!!!!!!!!!!!!!!!!!!!!!

  $(this).prev(".second-sublist").removeClass("is-here");

  if ($(this).parent().closest(".second-sublist").hasClass("is-here")) {
    return;
  }

  // if (secondSublist.hasClass("sub-opened")) {
  //   return;
  // }
  $(this)
    .prev(".second-sublist")
    .removeClass("sub-opened")
    .next(".nav__desctop-list")
    .slideUp();
  return;
});
// secondSublist.mouseout(function () {
//   // if ($(this).hasClass("sub-opened")) {
//   //   return;
//   // }
//   $(this).removeClass("sub-opened").next(".nav__desctop-list").slideUp();
//   return;
// });

// -Open only one submenu
menuItem.on("click", function () {
  if ($(this).hasClass("opened")) {
    $(this)
      .prevAll(".nav-container__nav__item")
      .removeClass("opened")
      .next(".nav__desctop-list")
      .slideUp();
    $(this)
      .nextAll(".nav-container__nav__item")
      .removeClass("opened")
      .addClass("closed")
      .next(".nav__desctop-list")
      .slideUp();
    $(this)
      .prevAll(".nav-container__nav__item")
      .next("ul.nav__desctop-list")
      .children(".second-sublist")
      .removeClass("sub-opened")
      .next("ul.nav__desctop-list")
      .slideUp();
    $(this)
      .nextAll(".nav-container__nav__item")
      .next("ul.nav__desctop-list")
      .children(".second-sublist")
      .removeClass("sub-opened")
      .next("ul.nav__desctop-list")
      .slideUp();
    return;
  }
});

// -Hide opened desctop-menu in mobile/tablet version
function resetDesctopMenu() {
  menuItem.removeClass("opened").next(".nav__desctop-list").slideUp();
  menuItem
    .next("ul.nav__desctop-list")
    .children(".second-sublist")
    .removeClass("sub-opened")
    .next("ul.nav__desctop-list")
    .slideUp();
  return;
}

// --OTHER

function initMobile() {
  resetDesctopMenu();
  console.log("is-mobile");
}

function initTablet() {
  resetDesctopMenu();
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
