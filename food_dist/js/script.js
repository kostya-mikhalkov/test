

const parentButton = document.querySelector(".tabheader__items");
const tabsContent = document.querySelectorAll(".tabcontent");
const tabsButton = document.querySelectorAll(".tabheader__item");

function hideTabs() {
    tabsContent.forEach(item => {
        item.style.display = "none";
    });

    tabsButton.forEach(item => {
        item.classList.remove("tabheader__item_active");
    });
}
function showTabs(i = 0) {
    tabsContent[i].style.display = "block";
    tabsButton[i].classList.add("tabheader__item_active");
}
hideTabs();
showTabs();
parentButton.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("tabheader__item")) {
        tabsButton.forEach((item, ind) => {
            if (target === item) {
                hideTabs();
                showTabs(ind);
            }
        });
    }
});
// Timer
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const deadline = "2024-03-25";
function getTimer(date) {
    let days, hours, minutes, seconds;

    const timerId = Date.parse(date) - Date.parse(new Date());

    if (timerId <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
          days = Math.floor(timerId / (1000 * 60 * 60 * 24));
          hours = Math.floor(timerId / 360000 % 24);
          minutes = Math.floor((timerId / 60000) % 60);
          seconds = Math.floor((timerId / 1000) % 60);
    }

    return {
        timerId,
        days,
        hours,
        minutes,
        seconds
    }
}
function changeTimer(num) {
    if (num >= 0 && num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}
const timerStart = setInterval(timerGo, 1000);
function timerGo() {
    const time = getTimer(deadline);
    if (time.timerId <= 0) {
        clearInterval(timerStart);
    } else {
        days.textContent = changeTimer(time.days);
        hours.textContent = changeTimer(time.hours);
        minutes.textContent = changeTimer(time.minutes);
        seconds.textContent = changeTimer(time.seconds);
    }
}

const btn = document.querySelectorAll("[data-btn]");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close");
btn.forEach(item => item.addEventListener("click", () => {
    modal.classList.add("show");
}));
modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
});
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("show");
    }
});
let booleanCount = true;
window.addEventListener("scroll", () => {
    if ((window.pageYOffset >= document.documentElement.scrollHeight - window.innerHeight) && booleanCount === true) {
        modal.classList.add("show");
        booleanCount = false;
    }
});
// Classes
const container = document.querySelector(".menu .container");
console.log(container)
class Elements {
    constructor(img, altimg, title, descr, price) {
        this.img = img;
        this.altimg = altimg;
        this.title = title;
        this.descr = descr;
        this.price = price;
    }
    addElement() {
        const div = document.createElement("div");
        div.classList.add("menu__item");
        div.innerHTML = `
                    <img src=${this.img} alt=${this.altimg}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
        `;
        container.append(div);
    }
}
// new Elements(
//     "img/tabs/elite.jpg",
//     "Ali",
//     "Меню “Премиум",
//     "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
//     550
// ).addElement();
// new Elements(
//     "img/tabs/vegy.jpg" ,
//     "Ali",
//     "Меню “cbcbc",
//     "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
//     550
// ).addElement();
// new Elements(
//     "img/tabs/post.jpg",
//     "Ali",
//     "Меню “cbcbc",
//     "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
//     550
// ).addElement();

async function createGetEl(url) {
    let res = await fetch(url);
    if (!res.ok) {
        throw new Error('WERY BAD');
    }
    return await res.json();
}
createGetEl("http://localhost:3000/menu")
.then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {
        new Elements(img, altimg, title, descr, price).addElement();
    });
});
// Forms
const forms = document.querySelectorAll("form");
const message = {
    load: "img/spinner.svg",
    succes: "okfff",
    err: "errror"
}
forms.forEach(item => {
    postData(item);
});

function createNewHTMLElements(message) {
    const modalDialog = document.querySelector(".modal__dialog");
    modalDialog.classList.add("hide");
    const div = document.createElement("div");
    div.classList.add("modal__dialog");
    div.innerHTML = `
        <div class="modal__content">
            <div class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    modal.append(div);
    setTimeout(() => {
        div.remove();
        modalDialog.classList.remove("hide");
        modal.classList.remove("show");
    }, 3000);
}
const getPostData = async (url, obj) => {
    let promise = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: obj
    });
    return await promise.json();
}
function postData(form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let div = document.createElement("img");
        div.src = message.load;
                div.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.append(div);

        // const request = new XMLHttpRequest();
        // request.open("POST", "server.php");
        const formData = new FormData(form);
        const obj = JSON.stringify(Object.fromEntries(formData.entries()));
        // const formData = new FormData(form);
        // formData.forEach((value, key) => {
        //     obj[key] = value;
        // });
        // request.send(JSON.stringify(obj));

        let request = getPostData("http://localhost:3000/requests", obj);
        request.then(
            () => {
            createNewHTMLElements(message.succes);
            div.remove();
            }
        ).catch(
            () => {
                createNewHTMLElements(message.err);
            }
        ).finally(
            form.reset()
        )
        // request.addEventListener("load", () => {
        //     if(request.status === 200) {
        //         // console.log(request.response);
        //         // div.textContent = message.succes;
        //         createNewHTMLElements(message.succes);
        //         div.remove();
        //         form.reset();
        //     } else {
        //         createNewHTMLElements(message.err);
        //     }
        // });
    });
}
// fetch("http://localhost:3000/menu").then(data => data.json())
// .then(res => console.log(res));

//slider
let countIndex = 1;
const slides = document.querySelectorAll(".offer__slide"),
      prev = document.querySelector(".offer__slider-prev"),
      next = document.querySelector(".offer__slider-next"),
      total = document.querySelector("#total"),
      current = document.querySelector("#current"),
      counterWrap = document.querySelector(".counter"),
      slidWrap = document.querySelector(".offer__slider-wrapper"),
      wrapperBoxAllSlider = document.querySelector(".offer__slider");

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${countIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = countIndex;
    }

    counterWrap.style.overflow = "hidden";
    counterWrap.style.position = "relative";

    slidWrap.style.cssText = `
        display: flex;
        transition: transform 0.5s ease;
    `;

// showSlide(countIndex);

// if (slides.length < 10) {
//     total.textContent = `0${slides.length}`
// } else {
//     total.textContent = slides.length;
// }

// function showSlide(n) {
//     if (n > slides.length) {
//         countIndex = 1;
//     }
//     if (n < 1) {
//         countIndex = slides.length;
//     }

//     if (countIndex < 10) {
//         current.textContent = `0${countIndex}`;
//     } else {
//         current.textContent = countIndex;
//     }

//     slides.forEach((item, ind) => {
//         item.style.display = (ind === countIndex - 1) ? "block" : "none";
//     });

// }
// prev.addEventListener("click", () => {
//     showSlide(--countIndex);
// });
// next.addEventListener("click", () => {
//     showSlide(++countIndex);
// });

// Dots

const dotsElem = document.createElement("div");
dotsElem.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
`;

for (let i = 0; i < slides.length; i++) {
    const span = document.createElement("span");
    span.setAttribute("data-set-dots", i + 1);
    span.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
    `;
    if (countIndex - 1 == i) {
        span.style.opacity = 1.0;
    }
    dotsElem.append(span);
}
counterWrap.append(dotsElem);

const dots = document.querySelectorAll("[data-set-dots]");

    slides.forEach(item => item.style.minWidth = 100 + "%");

    prev.addEventListener("click", () => {
        if (countIndex <= 1) {
            countIndex = slides.length;
            slidWrap.style.transform = `translateX(-${(countIndex-1) * 100}%)`;
        } else {

            countIndex--;
            slidWrap.style.transform = `translateX(-${(countIndex-1) * 100}%)`;
        }
        if (countIndex < 10) {
            current.textContent = `0${countIndex}`;
        } else {
            current.textContent = countIndex;
        }
        dots.forEach(item => item.style.opacity = 0.5);
        dots[countIndex - 1].style.opacity = 1.0;
    });
        next.addEventListener("click", () => {
        if (countIndex >= slides.length) {
            countIndex = 1;
            slidWrap.style.transform = `translateX(-${(countIndex-1) * 100}%)`;
        } else {

            countIndex++;
            slidWrap.style.transform = `translateX(-${(countIndex-1) * 100}%)`;
        }
        if (countIndex < 10) {
            current.textContent = `0${countIndex}`;
        } else {
            current.textContent = countIndex;
        }
        dots.forEach(item => item.style.opacity = 0.5);
        dots[countIndex - 1].style.opacity = 1.0;
    });

dots.forEach(item => {
    item.addEventListener("click", () => {
        let indexDots = item.getAttribute("data-set-dots");
        countIndex = indexDots;
        slidWrap.style.transform = `translateX(-${(countIndex-1) * 100}%)`;
        if (countIndex < 10) {
            current.textContent = `0${countIndex}`;
        } else {
            current.textContent = countIndex;
        }
        dots.forEach(item => item.style.opacity = 0.5);
        item.style.opacity = 1.0;
    });
});

// Calculator

// const gender = document.querySelectorAll("#gender");
// console.log(gender);
const genderBtn = document.querySelectorAll("[data-gender]");
const result = document.querySelector(".calculating__result span");
const inputValue = document.querySelectorAll(".calculating__choose_medium input");
const activeBtn = document.querySelectorAll(".calculating__choose_big div");
let height, weight, age, gender = 'female', ratio = 1.375;

function totalResult() {
    if (!height || !weight || !age) {
        result.textContent = '****';
        return;
    }
    if (gender === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
}

genderBtn.forEach(item => item.addEventListener("click", (e) => {
    genderBtn.forEach(item => item.classList.remove("calculating__choose-item_active"));
    e.target.classList.add("calculating__choose-item_active");
    gender = e.target.getAttribute("data-gender");
    totalResult();
}));

inputValue.forEach(item => item.addEventListener("input", (e) => {
    const target = e.target;
    console.dir(target)
    if (target.getAttribute("id") === 'height') {
        height = +target.value;
    }
    if (target.getAttribute("id") === 'weight') {
        weight = +target.value;
    }
    if (target.getAttribute("id") === 'age') {
        age = +target.value;
    }
    totalResult();
}));

activeBtn.forEach(item => {
    item.addEventListener("click", (e) => {
        const target = e.target.getAttribute("data-active");
        activeBtn.forEach(it => it.classList.remove("calculating__choose-item_active"));
        item.classList.add("calculating__choose-item_active");
        ratio = +target;
        totalResult();
    });
});



