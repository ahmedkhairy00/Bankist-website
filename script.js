'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// open model with all elements that h ave class .btn--show-modal
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Implementing Smooth Scrolling
// and we want btn scrolling to section-1 => id

// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  // we must get the coordinates of the element that we want scroll to
  const s1coords = section1.getBoundingClientRect();
  /* here where {
  x => is measured from left side
  y  => is measured from the top 
  and then width .
  and then height.
  and somo preporties
}
*/
  // ang get coordinates of clicked element.
  console.log(e.target.getBoundingClientRect());

  //Note => getBoundingClientRect() => it's relative to this visible view port.
  console.log(s1coords);
  console.log('Current scroll (x/y)', window.pageXOffset, window.pageYOffset);
  console.log(
    'hight/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // Scrolling
  /*   window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  ); */

  // Old School way
  /* window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth', // to add behavior we must add left and topn in object in scrollTo()
  }); */
  // New Way
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation

// use page navigation without event delegation
// it's good that we attach addEventListener for each link in nav , thats mean there three function .
/* but what if we had 1000 , or 10,000 elements ? => if we attach an event handler for 10,000 element like this forEach function.
- then would effectively be creating ,10,000 copies of this same function here .
- it's really not a clean solution in that case .
- the better solution is use events delegation .

*/
/* document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    // to get href of element we clicked
    const id = this.getAttribute('href');
    console.log(id);
    // scroll smooth to id view
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
}); */

// page navigation with event delegation
/* 
- in event delegation we use the fact that events bubble up , we do that by putting the eventListener on a common parent of all the elements that we interested in 
- parent element for this elements will be  => all nav with class (.nav__links)
- then the user clicked on of the link the event is generated , and bubbles up.
- then we can catch this event in this common parent element, and handle it there . 
- in event delegation we need two step.
1. add eventListener to a common parent element
2. Determine what element originated the event.

// In fact there is actually an even more important use case of event delegation => Which is when we are working with elements that are not yet on the page on runtime.
*/
// 1. add eventListener to a common parent element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    // 2. Determine what element originated the event.
    const id = e.target.getAttribute('href');
    // scroll smooth to id view
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// Selecting , Creating and Deleting Elements.

// Selecting elements

// to select all entire document elements
console.log(document.documentElement);
// to select head element
console.log(document.head);
//to select body element
console.log(document.body);
// to select specific element
const header = document.querySelector('.header'); // thats will return first element with class header.

// To select multiple elements .
const allSection = document.querySelectorAll('.section'); // IT'S return NodeList => it's not changed if we remove element.
console.log(allSection);

// to selecet element by Id name
document.getElementById('section--1');
// select elements by Tag name
const allButtons = document.getElementsByTagName('button'); // its return HTMLCollecttion => here it auto changed if we removed and elements
console.log(allButtons);

// select elements  by class name
console.log(document.getElementsByClassName('btn')); // its also return HTMLCollection .

// Creating and inserting elements
// .insertAdjacentHTML
/* const message = document.createElement('div');
//add classes
message.classList.add('cookie-message');
//add text
message.textContent = 'We use cookied for improved functionality and analytics';
message.innerHTML =
  'We use cookied for improved functionality and analytics . <button class="btn btn--close-cookie">Got it!</button>'; */
/* header.prepend(message); */ // prepend => use to add element as first child in header section
/* header.append(message); */ // append => use to add element as last child in header section , and here it moved the element for last element in header .and cant inserted the element beacuse it already in page.

// For that we can use prepend and append => for move elements in DOM , Because a DOM element is unique , so it can always only exist at one place at a time.

// if we want add same element more than once , we must cloned it
/* header.append(message);
 */
// insert also element as sibling to header

//before
/* header.before(message);
 */ //after
/* header.after(message);
 */
//Delete elements
/* document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); // That recent Method
    // back time they was deleted like this
    // message.parentElement.removeChild(message); // and use element we want to delete as Argument.
  }); */

// Styles Atrributes and Classes

// To set Styles to Element
// we write element.style.propertyName = '' ;
// Note => This styles set direactly in the DOM as => Inline style
/* message.style.backgroundColor = '#37383d';
 */ /* message.style.width = '120%';
 */
/*
// To read Property value
console.log(message.style.height); // There its empaty => because style work in inline style , not css style

console.log(message.style.backgroundColor); // beacuse it sets in inline style = rgb(55, 56, 61)
console.log(message.style.width); // 120% aslo from inline style
console.log(message.style.color); // empaty aslo

// To get styles property value from css , we use => getComputedStyle () method. , and use element that we get it's peroperty value as argument.
console.log(getComputedStyle(message)); // here get all styles for message element and it's values .
// to get color propert value of message element
console.log(getComputedStyle(message).color); //rgb(187, 187, 187)
console.log(getComputedStyle(message).height); //  43.75px

// Note => getComputedStyle() => get property value as it appear in browser , and if we didnt defined it it computed  and log the value .

// if we need increase height with 35 px to message element .
// but becasue getComputedStyle(message).height); = 43.75px , we must do parseFloat
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 35 + 'px';
  */

// To Change custom property . => thats mean css variables , that defined in :root {--color-primary : #5ec576}
// :root => it's a document element.
// we can also chanage property with setProperty()
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes => as like src and alt in img , and target in a .
// must the Attribute me standart like this examples
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// set Attribute
logo.alt = 'Beautiful minmalist logo';

//Non-standard
console.log(logo.designer); // undefined
// but we can get this also attribute by use getAttribute() method.
console.log(logo.getAttribute('designer')); //Ahmed Khairy

// setAttirbute the oppsit of getAttribute
logo.setAttribute('company', 'BankList');
console.log(logo.src); // http://127.0.0.1:5500/img/logo.png  => it's absolute address
console.log(logo.getAttribute('src')); //   img/logo.png  => it's relative address between floders.

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //http://127.0.0.1:5500/index.html
console.log(link.getAttribute('href')); //  #

// special type of Attributte => Data Attribute

// Data attribute
/* 
Data attribute> must start with word data then - then whatever
Exe :-
data-version-number = "3.0"
data-phone-number = "01124865152"
to get this data attribute
we use dataset.name on CamelCase
data-version-number = "3.0"
console.log(logo.dataset.versionNumber)

*/
// Exe we add one data attribute to image logo where => data-version-number = "3.0"
console.log(logo.dataset.versionNumber); // 3.0

// Classes
logo.classList.add('v', 'j');
logo.classList.remove('v');
logo.classList.toggle('v');
logo.classList.contains('v');

// we can use className
/* logo.className = 'jonas'; */ // dont use this beacuse it will remove all classes , and overrdie all classes.

// TYPES OF EVENTS AND EVENT HANDLERS

/* const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};
h1.addEventListener('mouseenter', alertH1); */

// we will removeEventListener after 3 second
// we can use removeEventListener() => to remove addEventListenenr()

/* setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
 */
//Old way school
//another way of mouseenter event
/* h1.onmouseeanter = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
}; */

// and There are old one of onClick => function with Html element.

// Event Propagation Bubbling and Capturing.
/* 
Capturing phase => events travels all away of DOM tree down to target element.
Target phase => it's when event arrive to the target Element.
Bubbling phase => the event travels all the way up to arrive to document , and pass all parent's element Not Sibling elements.

* what will happend if any parent element have also eventlistener => the event will run twice on target element and parent element with eventlistener .

NOTE => This behavior will allow us to implement really  powerful pattarns.
NOTE => by the deafult , events can only be handled in the target and in the bubbling phase.
               However , we can set up evenetlistener in away that they listen to event in the capturing phase instead.

NOTES = > 1- not all types of events do have a capturing and bubbling phase.
                   2- some of them are created right on the target element.
                   3 - most of events do capture and bubble.



*/

//// EVENT PROPAGATION ON PRACTICE .

/*we will do that by attaching event handlers to this navigation link in page and also , all of it's parent elements. 
Then , as we click this link we will give all these elements random background colors.

*/
// random color => it will be rgb(0:255, 0:255, 0:255) ,  and thre numbers between 0 and 255 , spread them by comma , rgb(255,255,255)

// lets start random number generator
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
// use randomInt to generate random color.
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

// attache event handler to link  => with class nav-link , in nav , and all ul with class => nav-links. and also entire header with class => nav .

// first to link
/* document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  // here this => element we clicked and equal to e.currentTarget.
  console.log(this, e.currentTarget);
  console.log(this === e.currentTarget); // true
  console.log(e.target);
  this.style.backgroundColor = `${randomColor(0, 255)}`;
  console.log('LINK', e.target, e.currentTarget);

  // Stop propagation
  // here will stop bubbling phase and eventListener will happen on clicked element only.
  e.stopPropagation(); // => but in parcatice it's not good idea to stopPropagation().
}); */
// to all ul
/* document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // here this => element we clicked
  this.style.backgroundColor = `${randomColor(0, 255)}`;
  console.log('CONTAINER', e.target, e.currentTarget);
}); */
// to all header
/* document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    e.preventDefault();
    // here this => element we clicked
    this.style.backgroundColor = `${randomColor(0, 255)}`;
    console.log('NAV', e.target, e.currentTarget);
    // and here we can find element from Capture phase , when we add third parameters to addEventListener to true
  },
  true // THATS Will make this element clicked first element from Capturing phase , and also loged first element.
  // and for third parameter => eventListener will listen to capturing phase not bubbling phase.
  // if we put third parameter to false => its mean eventListener will listen to bubbling phase.
  //and meand that we didint put this third parametrs
); */

// and here the event is bubbling up => that mean the event done on target element and also to parent elements.
// Note => if we clicked nav__links , that ul => the a<link> background color will not change any more and , the ul and it's parent element header => will continue background color change , because the Bubbling up phase.

// Event Delegation
/* 
Delegation => معناها التفويض
- it up in code .
*/

// DOM Traversing
/* 
DOM Traversing => is basically walking through the dom which means we can select an element  based on another element .
Exe : - direct child or a parent element or sometimes we don't event know the structure of the Dom at runtime.

*/
// Exe :- H1 element on page
const h1 = document.querySelector('h1');

// Going downwards: child
// get all element with class highlight that only children to h1 element.
console.log(h1.querySelectorAll('.highlight'));
// get all nodes in h1 element from childNodes like(text , comment , element,)
console.log(h1.childNodes);
// get direct children as live in page
console.log(h1.children); // span , br , span
// get first element and last element for h1 and styled it
/* h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered'; */

// Going upwards: parent
console.log(h1.parentElement);
console.log(h1.parentNode);

// closest => get closest element with specific selector like (class or id or tagName)
/* h1.closest('.header').style.background = 'var(--gradient-secondary)'; */

// use closest with same element will get the same element.
/* h1.closest('h1').style.background = 'var(--gradient-primary)';  */ // thats mean get same h1 element.
//closest its same like querySelector => but querySelector get child element
// closest => get parent element

// Going sideways: siblings
/* 
we can get direct siblings in javascript => mean previous and next sibling.
*/
console.log(h1.previousElementSibling); // null beacuse h1 => is first element
console.log(h1.nextElementSibling); // h4

console.log(h1.previousSibling); //node
console.log(h1.nextSibling); // node

// if we need get all sibling we must go to parentElment and then get all children
console.log(h1.parentElement.children);
// make array from Html Collection
// here all elements in h1 parent will scale excpet h1. element

/* const headerTitle = [...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
 */

// Building a Tabbed Component

// First all elements we need all tabs , tabsContainer ,  tabsContent
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container ');
const tabsContent = document.querySelectorAll('.operations__content');

// do addEventListener on tabs with event delegation
tabContainer.addEventListener('click', function (e) {
  // beacuse there span in btn tabs we will use closest() method
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  // because we clicked on empaty places get  null
  if (!clicked) return;

  // remove active classes from tabsButtons and tabsContent
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Active tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  // get number of content area with data-tab from cliked tabs
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Passing Arguments to Event Handlers.

// Menu fade animation

// refactor the code
const handleHover = function (e, opacity) {
  // Matching element with class (nav__link)
  if (e.target.classList.contains('nav__link')) {
    // because this === e.currentTarget
    /*     console.log(this, e.currentTarget);
     */ const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Note => we can pass only event in event handler and if we need another argument we use this keyword
// - use event delegation => so select parent element for links
const nav = document.querySelector('nav');
// use addEventListener on nav
// use bind method that we used before
// passing an "argument " into handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));

// the oppsite to make fade when hover links
nav.addEventListener('mouseout', handleHover.bind(1));

// if we use old way
/* nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
}); */

// Implementing a Sticky Navigation

// clcalute section 1 higet
const initialCoords = section1.getBoundingClientRect();

// Note => use scroll event , it very bad for preformance
/* window.addEventListener('scroll', function () {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  // here we need line for else statament
  else nav.classList.remove('sticky');
}); */

// A Better Way_ The Intersection Observer API

// Sticky navigation: Intersection Observer API

// 1- we need to start by creating a new intersection observer
/* 
new IntersectionObserver( here callbk function and object of option);

 */
/* 
create  callbk function and object of option => and this function will take 2 argument
 1 - entries
 2 - observer object itself
 */
/* const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
}; */
/* 
 1- this object need root property first => the element we target like section1
but we better put = null , to intersecting the entire viewport 
2 - we can define a threshold => and this basically the percentage of intersection at which the observer callback will be called.

*/
/* const obsOptions = {
  root: null, */
// threshold but it to 10%
// here we can have multiple threshold = > and it's value can be array
/*   threshold: [0.1, 0.5],
}; */
/* const observer = new IntersectionObserver(obsCallback, obsOptions);
// 2- we have use this observer to observe a certing target.
// - observer section 1
observer.observe(section1); */

// Here Make Sticky Navgation for header section

const navHeight = nav.getBoundingClientRect().height;
// Name Function stickyNav
// entries => it's get data from overview  where we scroll sent new data.
const stickyNav = function (entries) {
  const [entry] = entries;
  // make if statment to appear sticky class and removed it.
  // here if statment mean => if we in  header intersection overview remove sticky class , and after we be out header intersection overview add sticky class
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

// creater observer => and it take two argument
// 1- callbk Fun
// 2- object of options
const headerObserver = new IntersectionObserver(stickyNav, {
  // it's object property
  root: null,
  threshold: 0,
  // add rootMargin property => it's mean header will deal with sticky class with header section + rootMargin value , but if rootMargin with miniz value , then header section - rootMargin will deal with sticky class
  // and because nav hight = 90 px , but we must calclute it's hight value correctly getBoundingClientRect()
  rootMargin: `-${navHeight}px`,
});

// make headerObserver to observe header section
headerObserver.observe(header);

// Reveal Sections

// 1- create callbk fn with 2 argument
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // not observe section any more after we do once
  observer.unobserve(entry.target);
};

// 2 - observe secttions
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // it's mean will observe section when 0.15 % appear of section
});

// 3-  add class section--hidden to all sections
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  /*   section.classList.add('section--hidden');
   */
});

// Lazy Loading Images

// get all images with attribute data-src
const imgTargets = document.querySelectorAll('img[data-src]');

// create callbk Fn loadImg
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
// create imgObserver
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

// make observer for each img
imgTargets.forEach(img => imgObserver.observe(img));

// Building a Slider Component

// put all code of slider in function => it's like mean functional Slider Component in React
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const maxSlide = slides.length;
  let currentSlide = 0;
  // create dot btn to move slides by clicking the slides
  const dotContainer = document.querySelector('.dots');

  // Note
  /* 
  if currentSlide = 1 ,  then we need currentSlide be 0%
  and all slide transform = translateX = -100% , 0% , 100% , 200%
  the active slide will = currentIndex = i => i - currenSlide
  the mean role here slide = i - currentSlide
  then if we clicked one = slide => 1-1
  then if we clicked twice = slide=> 2-2
  then if we cliked three =  slide => 3 - 3
  then if we clicked fourth = slide => 4-4
  */

  // Functions

  // function create dots and it's all have class dots-dot and dataAttribute data-slide="0" => and there 0 => number of the slide where dot will go to it.

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class = "dots__dot" data-slide = "${i}"></button>`
      );
    });
  };

  // function to activate dot
  const activeDot = function (slide) {
    // here remove class active from all dots
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    // her put class active in dot that data-slide = slide argument
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  // function goToSlide
  const goToSlide = function (activeslide) {
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - activeslide)}%)`)
    );
  };
  // function nextSlide
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  //function prevSlide
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activeDot(currentSlide);
  };
  // put all intial function in global function called init()
  const init = function () {
    // Add Transform = translateX() value automaticlly
    goToSlide(0);
    // function to create dots
    createDots();

    // to put active class in first dot
    activeDot(0);
  };
  init();

  // move to right slide
  btnRight.addEventListener('click', nextSlide);
  //move to left slide
  btnLeft.addEventListener('click', prevSlide);

  // Move slides with arrow right and arrow left from keyboard
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  // addeventListener to dots use eventDelegation
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      // get slide that connect to the dot by use dataset.slide
      //const slide = e.target.dataset.slide;
      // but we can use dustrcture
      const { slide } = e.target.dataset;
      //use function doToSlide to go there by use slide as argument
      goToSlide(slide);
      activeDot(slide);
    }
  });
};
// call slider functiono component
slider();

// Lifecycle Dom Events
// Events that occur in the DOM during a webpage's life cycle.
// and we mean lifecycle => that the page first accessed, until the user leaves it.

// 1- first Event that we need to talk about is called DOM content loaded => and this event is fired by the document as soon as the HTML is completely parsed , which means that the HTML has been downloaded and been converted to the DOM tree.
// - Also, all scripts must be downloaded and executed before the DOM content loaded event can happen.

document.addEventListener('DOMContentLoaded', function (e) {
  // now this event does actually not wait for images and other external resources to load.
  // so just HTML and JavaScript need to be loaded
  console.log('HTML parsed and DOM tree built!', e);
  // here we can executed  code after the DOM is available.
  // we can put all code in this event to excuted
  // are we can put script tag in bottom of html file
});

// on JQuery we was wrap all code in
/* document.ready(){

} */

// 2-load event it fired by the window . As soon as not only the HTML is parsed but also all the images and external resources like CSS files are also loaded.

// so basically when the conplete page has finished loading is when this event gets fired.
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// 3 - the last event is before unload => which also gets fired on window

/* window.addEventListener('beforeunload', function (e) {
  // this event is created immediately before a user is about to leave a page.
  // In Some browser to make this event work we must preventDrfault
  e.preventDefault();
  console.log(e);
  // actually in order to display a leaving confirmation we need to set the return value in the event to an empty string
  e.returnValue = ' '; // this for histroical reasons
});
 */
