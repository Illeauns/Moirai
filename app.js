const wrapper = document.querySelector(".wrapper");
// const wrapper2 = document.querySelector(".wrapper2");
// const wrapper3 = document.querySelector(".wrapper3");
const carousel = document.querySelector(".carousel");
// const carousel2 = document.querySelector(".carousel2");
// const carousel3 = document.querySelector(".carousel3");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
// const arrowBtns2 = document.querySelectorAll(".wrapper2 i");
// const arrowBtns3 = document.querySelectorAll(".wrapper3 i");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    // carousel2.insertAdjacentHTML("afterbegin", card.outerHTML);
    // carousel3.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    // carousel2.insertAdjacentHTML("beforeend", card.outerHTML);
    // carousel3.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// carousel2.classList.add("no-transition");
// carousel2.scrollLeft = carousel.offsetWidth;
// carousel2.classList.remove("no-transition");
// carousel3.classList.add("no-transition");
// carousel3.scrollLeft = carousel.offsetWidth;
// carousel3.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
// arrowBtns2.forEach(btn => {
//     btn.addEventListener("click", () => {
//         carousel2.scrollLeft += btn.id == "left2" ? -firstCardWidth : firstCardWidth;
//     });
// });
// arrowBtns3.forEach(btn => {
//     btn.addEventListener("click", () => {
//         carousel3.scrollLeft += btn.id == "left3" ? -firstCardWidth : firstCardWidth;
//     });
// });
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
        carousel2.classList.add("no-transition");
        carousel2.scrollLeft = carousel2.scrollWidth - (2 * carousel2.offsetWidth);
        carousel2.classList.remove("no-transition");
        carousel3.classList.add("no-transition");
        carousel3.scrollLeft = carousel3.scrollWidth - (2 * carousel3.offsetWidth);
        carousel3.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
        carousel2.classList.add("no-transition");
        carousel2.scrollLeft = carousel2.offsetWidth;
        carousel2.classList.remove("no-transition");
        carousel3.classList.add("no-transition");
        carousel3.scrollLeft = carousel3.offsetWidth;
        carousel3.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 5000 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 5000);
}
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
// carousel2.addEventListener("scroll", infiniteScroll);
// carousel3.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

const navigation = document.querySelector('.links')
const hamburger = document.querySelector('.hamburger')

hamburger.addEventListener('click', () => {
    navigation.classList.toggle("active")
    hamburger.classList.toggle("active")

    document.querySelectorAll(".collections-wrapper").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navigation.classList.remove("active")
    }))
})




