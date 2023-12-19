"use strict";

const formPhone = document.querySelector(".tel-forms");
const formPhoneInput = document.getElementsByName("tel");
const popUpPhone = document.querySelector(".list-country");
const countryPlaceFlag = document.querySelector(".country");

formPhone.addEventListener("click", choiseNumberVal);

function choiseNumberVal(event) {
    if (!event.target.closest(".tel-forms")) {
        popUpPhone.classList.remove("open-block");
    }
    if (event.target.closest(".country-name")) {
        popUpPhone.classList.remove("open-block");
        let idCountry = event.target.parentElement.id;
        if (event.target.tagName == "IMG") {
            idCountry = event.target.parentElement.parentElement.id;
        }
        let currentElementChoised = document.getElementById(idCountry);
        let flag = document.querySelectorAll(`[data-country=${idCountry}]`)[0].cloneNode();
        countryPlaceFlag.innerHTML = "";
        countryPlaceFlag.prepend(flag);
        formPhoneInput[0].value = currentElementChoised.textContent.trim();
    }
    if (event.target.closest(".country")) {
        popUpPhone.classList.toggle("open-block");
    }
}

const mainForm = document.querySelector(".main__forms");

mainForm.onclick = function (event) {
    if (!event.target.closest(".tel-forms")) {
        if (popUpPhone.classList.contains("open-block")) {
            popUpPhone.classList.remove("open-block");
        }
    }
};

formPhoneInput[0].onkeydown = function (event) {
    if (popUpPhone.classList.contains("open-block")) {
        popUpPhone.classList.remove("open-block");
    }
};

const imagesPhonesEveryCountry = document.querySelectorAll(".image");
const placePhotoImg = document.querySelector(".main__build-wraper");
const sliderImgUnit = document.querySelector(".main__build_slide-show");

const imagesSliderArray = [];

for (let i = 0; i < imagesPhonesEveryCountry.length; i++) {
    imagesSliderArray.push(imagesPhonesEveryCountry[i].firstElementChild.cloneNode());
}

const HTML = document.documentElement;
sliderImgUnit.addEventListener("click", clickSliderPhoto);

let currentElemInSliderCount = 0;
placePhotoImg.prepend(imagesSliderArray[currentElemInSliderCount]);

function clickSliderPhoto(event) {
    placePhotoImg.innerHTML = "";

    if (event.target.closest(".arrow")) {
        let trg = event.target;
        if (event.target.tagName == "svg") {
            trg = trg.parentElement;
        }
        if (event.target.nodeName == "polygon") {
            trg = trg.parentElement.parentElement;
        }
        if (trg.className.endsWith("left-ar")) {
            currentElemInSliderCount--;
            currentElemInSliderCount < 0 ? (currentElemInSliderCount = 0) : currentElemInSliderCount;
        }
        if (trg.className.endsWith("right-ar")) {
            currentElemInSliderCount++;
            currentElemInSliderCount > imagesSliderArray.length - 1 ? (currentElemInSliderCount = imagesSliderArray.length - 1) : currentElemInSliderCount;
        }
    }
    placePhotoImg.prepend(imagesSliderArray[currentElemInSliderCount]);
}

const imgsGallery = document.querySelector(".main__images-build");
const closeSlider = document.querySelector(".main__slider-close");

imgsGallery.addEventListener("click", openSl);

function openSl(event) {
    sliderImgUnit.classList.add("vis");
    placePhotoImg.prepend(imagesSliderArray[currentElemInSliderCount]);
    hiddenPage(true);
    if (event.target.closest(".main__slider-close")) {
        sliderImgUnit.classList.remove("vis");
        hiddenPage(false);
        currentElemInSliderCount = 0;
        placePhotoImg.innerHTML = "";
    }
}

function hiddenPage(bool) {
    bool ? (HTML.style.overflow = "hidden") : (HTML.style.overflow = "unset");
}

if (window.innerWidth < 671) {
    placePhotoImg.addEventListener("click", mobileSlide);
}

function mobileSlide(event) {
    let isPosCursorLessHalfScreen = event.clientX < this.offsetWidth / 2;
    this.innerHTML = "";
    if (isPosCursorLessHalfScreen === true) {
        currentElemInSliderCount--;
        currentElemInSliderCount < 0 ? (currentElemInSliderCount = 0) : currentElemInSliderCount;
    }
    if (isPosCursorLessHalfScreen === false) {
        currentElemInSliderCount++;
        currentElemInSliderCount > imagesSliderArray.length - 1 ? (currentElemInSliderCount = imagesSliderArray.length - 1) : currentElemInSliderCount;
    }
}
