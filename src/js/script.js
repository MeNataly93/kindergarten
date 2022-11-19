// console.log("TEST");

function initMobile() {
  console.log("is-mobile");
}

function initTablet() {
  console.log("is-tablet");
}

function initDesktop() {
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
    query: "(min-width: 641px) and (max-width: 992px)",
    onEnter: function () {
      initTablet();
    },
  },
  {
    id: "desktop",
    query: "(min-width: 993px)",
    onEnter: function () {
      initDesktop();
    },
  },
]);

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
