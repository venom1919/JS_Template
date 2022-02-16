window.addEventListener('DOMContentLoaded', () => {
    ////Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.style.display = 'none';
        });

        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    const dedline = '2022-02-03';

    function getDateRemain(endTime) {
        const diff = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours = Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes = Math.floor(((diff / 1000 / 60) % 60) % 60),
            seconds = Math.floor((diff / 1000) % 60);

        return {
            total: diff,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }

    function checkNumber(number) {
        if (number >= 0 && number < 10) {
            return `0${number}`;
        } else {
            return number;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(upDateClock, 1000);

        upDateClock();

        function upDateClock() {
            const t = getDateRemain(endTime);
            days.innerHTML = checkNumber(t.days);
            hours.innerHTML = checkNumber(t.hours);
            minutes.innerHTML = checkNumber(t.minutes);
            seconds.innerHTML = checkNumber(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.time', dedline);

    const modalOp = document.querySelector('[data-modal]'),
        modal = document.querySelector('.modal');
    (modalClose = document.querySelector('[data-close]')),
        (mForm = document.forms.tsd);

    modalOp.addEventListener('click', () => {
        // modal.classList.add('show'),
        modal.show();
    });

    modalClose.addEventListener('click', () => {
        modal.classList.add('hide'), modal.classList.remove('show');
    });

    class Menu {
        constructor(price, title, src, descr, alt, parentSelector, ...classes) {
            this.price = price;
            this.src = src;
            this.title = title;
            this.descr = descr;
            this.alt = alt;
            this.transfer = 27;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.overPrice();
        }

        overPrice(price) {
            this.price = this.price * this.transfer;
        }

        render() {
            const newEl = document.createElement('div');
            if (this.classes.length == 0) {
                this.newEl = "menu__item";
                newEl.classList.add(this.newEl);
            }

            this.classes.forEach(classN => newEl.classList.add(classN))
            newEl.innerHTML = `
                    <img src= ${this.src} alt = ${this.alt}>
                    <h3 class = "menu__item-subtitle">${this.title}"</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                            <div class="menu__item-price">
                                <div class="menu__item-cost">Цена:</div>
                                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                            </div>`;

            this.parent.append(newEl);
        }
    }

    new Menu(229, 'Меню "Фитнес"', "img/tabs/vegy.jpg", 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей', "vegy", ".menu .container", "menu__item", "big").render();

    //////////////////14-02
    const forms = document.querySelectorAll("form");
    const mess = {
        loading: "Загрузка",
        succes: "Ваша заявка будет в скором времени обработана.Спасибо!",
        failure: "Произошла ошибка..."
    };

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {

        form.addEventListener("submit", (e) => {

            e.preventDefault();
            const statusMess = document.createElement('div');
            statusMess.classList.add('status');
            statusMess.textContent = mess.loading;
            form.append(statusMess);

            const req = new XMLHttpRequest();
            req.open('POST', "server.php");
            req.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form);
            req.send(formData);

            req.addEventListener('load', () => {

                if (req.status === 200) {
                    statusMess.textContent = mess.succes;
                    console.log(req.response);
                } else {
                    statusMess.textContent = mess.failure;

                }

            });
        })
    }

    fetch('db.json')
        .then(data => data.json())
        .then(res => console(res));


     ////slider           
     const sumSlider = document.querySelectorAll(".offer__slide"),
        slider_next = document.querySelector(".offer__slider-next"),
        slider_prev =  document.querySelector(".offer__slider-prev"),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    let slideIndex = 1 ;
    showSlider(slideIndex) ;   
    slider_next.addEventListener("click", () => {
        lassSlides(1) ;
    });

    slider_prev.addEventListener('click', ()=>{
        lassSlides(-1) ;
    });

    if(sumSlider.length< 10 ){
        total.textContent = `0${sumSlider.length}`; 
    } else{
        total.textContent = sumSlider.length; 
    }

    function showSlider(e) {
                
        if (e > sumSlider.length){
           slideIndex = 1 ;   
        }

        if(e < 1){
            slideIndex = sumSlider.length ;  
        } 

        sumSlider.forEach(item => item.style.display = 'none') ;
        sumSlider[slideIndex -1].style.display = 'block'; 
        
        if(sumSlider.length < 10){ 
            current.textContent = `0${slideIndex}`; 
        }else{
            current.textContent = sumSlider.length ;
        }
    }

    function lassSlides(n){
        showSlider(slideIndex +=n) ;
    }

});



