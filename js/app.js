//global variables/constants
const navList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
let currentActiveSection = 0;

//helper functions for adding and removing active class for highlighting
/**
 * @description adds active class to the index passed to the function
 * @param {number} link
 */
function makeActive(link) {
  list[link].classList.add("active");
}

/**
 * @description removes active class to the index passed to the function
 * @param {number} link
 */
function removeActive(link) {
  list[link].classList.remove("active");
}

/**
 * @description removes all active class of the anchors in navBar
 * @returns no return value
 */
function removeAllActive() {
  let anchorList = [...Array(sections.length).keys()];
  anchorList.forEach((link) => removeActive(link));
}


// When clicking an item from the navigation menu, the link will scroll to the appropriate section.
/**
 * @description scroll to the sepcific section when the anchor tag is clicked
 * @param event from the listener
 * @returns none
 */
// used event delegation
function scrollSection(event) {
  let target = event.target;
  if (target.tagName == "A") {
    let section = document.getElementById(
      event.target.dataset.section.toLowerCase()
    );
    let position = section.offsetTop;
    window.scrollTo({ top: position, behavior: "smooth" });
  }
}

//Scroll event listerner to highlight the specific nav anchor when a particular section is on the viewport
document.addEventListener("scroll", function (event) {
  const current =
    sections.length -
    [...sections]
      .reverse()
      .findIndex((section) => window.scrollY >= section.offsetTop - 200) -
    1;
  if (
    current !== currentActiveSection &&
    current < sections.length &&
    current >= 0
  ) {
    removeAllActive();
    currentActiveSection = current;
    makeActive(current);
  }
});

//onclick event for smooth scrolling
navList.onclick = scrollSection;

// Navigation is built dynamically as an unordered list.
sections.forEach(function (currentElement) {
  let anchorTag = document.createElement("a");
  anchorTag.setAttribute(
    "data-section",
    currentElement.dataset.nav.toLowerCase()
  );
  anchorTag.textContent = currentElement.dataset.nav;
  let li_Tag = document.createElement("li");
  li_Tag.appendChild(anchorTag);
  navList.appendChild(li_Tag);
});

let list = document.querySelectorAll("#navbar__list > li > a");
list[0].classList.add("active");
