"use strict";

const planScreen = document.querySelector(".main__screen-slider");
const planRightBlock = document.querySelector(".main__right-block");
const cardsPlanBuild = document.querySelectorAll(".card-slider");
const cardShowNewBuilt = document.querySelector(".card-show");
const sliderInfoNewBuilt = document.querySelector(".main__slide-show");

(function slideInfo() {
    let widthInfoSlide = 0;
    (function slideInfoCount() {
        sliderInfoNewBuilt.style.transform = `translate3d(${-widthInfoSlide}px, 0px, 0px)`;
        widthInfoSlide += cardShowNewBuilt.offsetWidth;
        if (widthInfoSlide >= sliderInfoNewBuilt.offsetWidth - 50) {
            widthInfoSlide = 0;
        }
        setTimeout(slideInfoCount, 9000);
    })();
})();

const bottomSlider = document.querySelector(".main__more-bottom");
const swiperAllSlide = document.querySelectorAll(".main__center-more-info");
const imgCont = document.querySelector(".main__more-img");

const circlePosition = document.querySelector(".main__chek-pos");
const circleImg = document.querySelector(".main__check-pos-circle");
const circleMini = document.querySelector(".circle-mini");

const heightTextConteiner = document.querySelectorAll(".main__right-more-text");
const mainRightTitle = document.querySelectorAll(".main__right-title");

let biggestHeightSlider;
let arrSizePictures = [];

let orientation = screen.orientation.type;

(function sizeSlider() {
    if (window.innerWidth <= 551) {
        for (let y = 0; y < heightTextConteiner.length; y++) {
            arrSizePictures.push(
                heightTextConteiner[y].offsetHeight +
                    mainRightTitle[y].offsetHeight +
                    parseInt(window.getComputedStyle(mainRightTitle[y]).padding) * 2 + imgCont.offsetHeight * 1.2
            );
            arrSizePictures.sort((a, b) => b - a);
        }
        bottomSlider.style.height = `${arrSizePictures[0]}px`;
    }
    if (window.innerWidth > 552) {
        for (let y = 0; y < heightTextConteiner.length; y++) {
            arrSizePictures.push(
                heightTextConteiner[y].clientHeight + mainRightTitle[y].clientHeight
            );
            arrSizePictures.sort((a, b) => b - a);
        }
        bottomSlider.style.height = `${arrSizePictures[0] + 100}px`;
    }
})();

window.addEventListener("orientationchange", changeOrient);

function changeOrient(event) {
    if (window.innerWidth < 671 && orientation == "landscape-primary") {
        bottomSlider.style.height = imgCont.offsetHeight + heightTextConteiner.offsetHeight + "px";
    }
}

if (window.innerWidth < 671 && orientation == "landscape-primary") {
    bottomSlider.style.minHeight = imgCont.offsetHeight + heightTextConteiner.offsetHeight + "px";
}

for (let r = 0; r < swiperAllSlide.length - 1; r++) {
    circlePosition.append(circleImg.cloneNode());
}
const allCircleImg = document.querySelectorAll(".main__check-pos-circle");

bottomSlider.addEventListener("click", swiper);

let numSwipe = 0;

function swiper(event) {
    if (event.target.closest(".l-arrow")) numSwipe--;
    if (event.target.closest(".r-arrow")) numSwipe++;
    if (numSwipe < 0) numSwipe = swiperAllSlide.length - 1;
    if (numSwipe == swiperAllSlide.length) numSwipe = 0;

    for (let i = 0; i < swiperAllSlide.length; i++) {
        if (swiperAllSlide[i].classList.contains("showSlideVis")) {
            swiperAllSlide[i].classList.remove("showSlideVis");
        }
    }
    swiperAllSlide[numSwipe].classList.add("showSlideVis");
    allCircleImg[numSwipe].prepend(circleMini);
}

const arrowUpPage = document.querySelector(".footer__button-top");

const header = document.querySelector("header");

arrowUpPage.onclick = function (event) {
    if (event.target.closest(".footer__button-top")) {
        header.scrollIntoView({
            behavior: "smooth",
        });
    }
};

const panelToddlers = document.querySelector(".main__all-polz");
const allToddlers = document.querySelectorAll(".main__polzunok input");
const outputToddler = document.querySelectorAll(".main__polzunok output");
const resultToddlerChoised = document.querySelectorAll(".main__move-result");

let coordinateArray = [];
let coordinateToddler;
let quantityDownToddler;
let calculatePercentsToddler;

for (let p = 0; p < allToddlers.length; p++) {
    allToddlers[p].setAttribute("id", `fader${p}`);
    resultToddlerChoised[p].setAttribute("id", `resNum${p}`);
    outputToddler[p].setAttribute("for", `fader${p}`);
}

for (let i = 0; i < allToddlers.length; i++) {
    coordinateArray.push(allToddlers[i].value);
    calculatePercentsToddler = (Math.round(coordinateArray[i]) / allToddlers[i].max) * 100;

    if (allToddlers[i].max < 30) {
        resultToddlerChoised[i].style.left = Math.trunc(calculatePercentsToddler) + "%";
        resultToddlerChoised[i].style.transform = `translateX(${-25}px)`;
    } 
    else {
        resultToddlerChoised[i].style.left = Math.trunc(calculatePercentsToddler) + "%";
    }
    resultToddlerChoised[i].innerHTML = Math.trunc(coordinateArray[i]);
}

let eventMove;
let eventStart;
let eventEnd;

if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
) {
    eventMove = "touchmove";
    eventStart = "touchstart";
    eventEnd = "touchend";
} else {
    eventMove = "mousemove";
    eventStart = "mousedown";
    eventEnd = "mouseup";
}

panelToddlers.addEventListener(eventMove, polzMove);

function polzMove(event) {
    if (event.target.closest(".main__polz-bottom")) {
        if (quantityDownToddler) {
            let idTarget = event.target.id;
            if (idTarget) {
                coordinateToddler = document.getElementById(`${idTarget}`).value;
                let narrowID = idTarget.slice(-1);
                coordinateArray.splice(narrowID, 1, coordinateToddler);
                resultToddlerChoised.innerHTML = Math.trunc(coordinateToddler);
                calculatePercentsToddler = (coordinateArray[narrowID] / event.target.max) * 100;
                resultToddlerChoised[narrowID].style.left = Math.trunc(calculatePercentsToddler) + "%";
                resultToddlerChoised[narrowID].innerHTML = Math.trunc(
                    coordinateArray[narrowID]
                );
            }
        }
    }
}

panelToddlers.addEventListener(eventStart, () => (quantityDownToddler = true));
panelToddlers.addEventListener(eventEnd, () => (quantityDownToddler = false));

window.onresize = function () {
    let widthInfoSlide = 0;
    sliderInfoNewBuilt.style.transform = `translate3d(${-widthInfoSlide}px, 0px, 0px)`;
    for (let y = 0; y < heightTextConteiner.length; y++) {
        arrSizePictures.push(
            heightTextConteiner[y].offsetHeight +
                mainRightTitle[y].offsetHeight +
                parseInt(window.getComputedStyle(mainRightTitle[y]).padding)
        );
        arrSizePictures.sort((a, b) => b - a);
        sizeOnWindow();
    }
    bottomSlider.style.height = `${arrSizePictures[0]}px`;
};

const baseInfoSlide = document.querySelector(".main__base-info-slide");
const cardInfoBuilding = document.querySelectorAll(".card__info");
const cardImgages = document.querySelectorAll(".card__image");
const cardVisibleBanner = document.querySelectorAll(".card-show");
const slideAreaHidden = document.querySelector(".main__base-slide-hidden");

function sizeOnWindow() {
    if (window.innerWidth < 550) {
        let heightAr = [];
        let heightArImg = [];

        for (let p = 0; p < cardInfoBuilding.length; p++) {
            heightAr.push(cardInfoBuilding[p].offsetHeight);
            heightArImg.push(cardImgages[p].offsetHeight);
        }

        let bigInfo = heightAr.sort((a, b) => b - a);
        let bigImg = heightArImg.sort((a, b) => b - a);
        let heightAuto = bigInfo[0] + bigImg[0] + parseInt(window.getComputedStyle(cardInfoBuilding[0]).padding) * 2;
        baseInfoSlide.style.minHeight = heightAuto + "px";
        slideAreaHidden.style.minHeight = heightAuto + "px";
    }
}

const slideSw = document.querySelector(".main__more-info");

function clickSwipe(event) {
    let widthBlockSwipe = slideSw.offsetWidth;
    let cX = event.clientX;
    let result = cX > widthBlockSwipe / 2;
    result ? numSwipe++ : numSwipe--;
    if (numSwipe < 0) {
        numSwipe = swiperAllSlide.length - 1;
    }
    if (numSwipe == swiperAllSlide.length) {
        numSwipe = 0;
    }
    for (let i = 0; i < swiperAllSlide.length; i++) {
        if (swiperAllSlide[i].classList.contains("showSlideVis")) {
            swiperAllSlide[i].classList.remove("showSlideVis");
        }
    }
    swiperAllSlide[numSwipe].classList.add("showSlideVis");
    allCircleImg[numSwipe].prepend(circleMini);
}

if (window.innerWidth < 401) {
    slideSw.addEventListener("click", clickSwipe);
} else slideSw.removeEventListener("click", clickSwipe);

const strokeSlide = document.querySelectorAll(".header__stroke-slide");
const lineRun = document.querySelector(".header__row-visible");
const hiddenLine = document.querySelector(".header__hidden-row");

let widthLineSlider = lineRun.offsetWidth;
let intervalAutoScroolSlider = widthLineSlider / 100;

lineRun.style.animationDuration = intervalAutoScroolSlider * 2 + "s";

let styleTransitionSlider = document.createElement("style");

styleTransitionSlider.innerHTML = `@keyframes marcu {
	0%{
		transform: translateX(0);
	}
	100% {
		transform: translateX(${-widthLineSlider}px);
	}
}`;
