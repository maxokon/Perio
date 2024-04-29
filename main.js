/***************
 *** ROUTER ***
 **************/

const router = {
  pages: [],
  render: new Event("render"),

  //initialiser: listens for a click on one of the links in the navigation sidebar and dispaches the event
  init: function () {
    router.pages = document.querySelectorAll(`.page`);
    router.pages.forEach((newPage) => {
      newPage.addEventListener("render", router.renderPage);
    });

    document.querySelectorAll(".navLink").forEach((link) => {
      link.addEventListener("click", router.nav);
    });
    history.replaceState({}, "", "#moodTracker"); //initial URL
    document.title = "Perio | moodTracker"; //initial title
    window.addEventListener("popstate", router.pop); //copies the page
  },

  //nav: changes 'active' class from previous page to current one
  //changes behaviour of the arrows
  //user can use them without refreshing the SPA
  nav: function (e) {
    e.preventDefault();
    let currentPage = e.target.getAttribute("data-target");
    document.querySelector(".active").classList.remove("active");
    document.getElementById(currentPage).classList.add("active");
    history.pushState({}, currentPage, `#${currentPage}`); //updates URL
    document.title = "Perio | " + currentPage; //updates document title
    document.getElementById(currentPage).dispatchEvent(router.render);
  },

  //pop: loads content from history
  pop: function (e) {
    let hash = location.hash.replace("#", "");
    document.querySelector(".active").classList.remove("active");
    document.getElementById(hash).classList.add("active");
    document.getElementById(hash).dispatchEvent(router.render);
  },
};

document.addEventListener("DOMContentLoaded", router.init);

/***************
 * MOOO FORM **
 **************/
const moodTracker = {
mood: function () {
  let newMoodForm = document.querySelector("#moodForm");
  let newSymptomsForm = document.querySelector("#symptomsForm");

  newMoodForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const moodFormData = new FormData(newMoodForm);
    const moodData = Object.fromEntries(moodFormData);
    const moodData_json = JSON.stringify(moodData);
  })
  
  newSymptomsForm.addEventListener("submit"), (e) => {
      e.preventDefault();
      const symptomsFormData = new FormData(newSymptomsForm);
      const symptomsData = Object.fromEntries(symptomsFormData);
      const symptomsData_json = JSON.stringify(symptomsData);
  }
}

};

document.addEventListener("DOMContentLoaded", moodTracker.mood);

/***************
 * CYCLE INFO *
 **************/

const cycle = {
  storePeriod: function () {
    let pastPeriods = document.querySelector("#pastPeriodsUL").innerHTML;
    let periodHolder = "";
    let newPeriodForm = document.querySelector(".periodForm");

    newPeriodForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(newPeriodForm);
      const periodData = Object.fromEntries(formData);

      const periodData_json = JSON.stringify(periodData);

      periodHolder = `<li>From ${periodData.firstDay} to ${periodData.lastDay}</li>`;

      pastPeriods = periodHolder;

      console.log(periodHolder);

      localStorage.setItem("period", periodData_json);
    });
  },
};

document.addEventListener("DOMContentLoaded", cycle.storePeriod);
