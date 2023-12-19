//План и информация о проекте;
const allImageGallary = document.querySelectorAll(".image");
const aboutProjects = document.querySelector(".main__about-build");
const imagesPlanBuild = document.querySelector(".main__content-plan");
const choisePanel = document.querySelector(".main__list-elem-slider");

window.addEventListener("scroll", scrollPage);

let boolsScroll = {
    first: true,
    second: true,
};

function scrollPage() {
    if (
        window.innerHeight >= allImageGallary[0].getBoundingClientRect().top + 100
    ) {
        if (boolsScroll.first) {
            addAnim();
            boolsScroll.first = false;
        }
    }
    if (window.innerHeight >= aboutProjects.getBoundingClientRect().top) {
        aboutProjects.classList.add("show-text");
    }
    if (window.innerHeight >= imagesPlanBuild.getBoundingClientRect().top) {
        planScreen.classList.add("plan-left");
        planRightBlock.classList.add("plan-right");
    }
    if (window.innerHeight >= choisePanel.getBoundingClientRect().top) {
        if (boolsScroll.second) {
            showMiniImagesPlans();
            boolsScroll.second == false;
            window.removeEventListener("scroll", scrollPage);
        }
    }
}

function addAnim() {
    let count = 0;
    (function addAnimatonInside() {
        if (count < allImageGallary.length) {
            allImageGallary[count].classList.add("show-swing-photo");
            count++;
            setTimeout(addAnimatonInside, 350);
        } else return;
    })();
}

function showMiniImagesPlans() {
    let i = 0;
    (function showMiniImagesPlansInside() {
        if (i < cardsPlan.length) {
            if (i % 2 == 0) cardsPlan[i].classList.add("choise-img-show2");
            if (i % 2 != 0) cardsPlan[i].classList.add("choise-img-show1");
            i++;
            setTimeout(showMiniImagesPlansInside, 100);
        } else return;
    })();
}
for (let k = 0; k < cardsPlan.length; k++) {
    cardsPlan[k].setAttribute("img-ch", k);
}

let arrayChoisedImg = [];

for (let i = 0; i < cardsPlan.length; i++) {
    let elemImg = cardsPlan[i].firstElementChild;
    if (elemImg.tagName == "IMG") {
        arrayChoisedImg.push(elemImg.cloneNode());
    }
}

choisePanel.addEventListener("click", selectImg);

function selectImg(event) {
    if (event.target.closest(".card-slider")) {
        let id = event.target.getAttribute("img-ch");
        if (event.target.tagName == "IMG") {
            id = event.target.parentElement.getAttribute("img-ch");
        }
        planScreen.innerHTML = "";
        planScreen.prepend(arrayChoisedImg[id]);
    }
}
