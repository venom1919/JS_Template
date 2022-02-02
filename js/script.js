window.addEventListener("DOMContentLoaded", ()=>{

    ////Tabs
   const tabs = document.querySelectorAll(".tabheader__item"), 
         tabsContent = document.querySelectorAll(".tabcontent"),
         tabsParent = document.querySelector(".tabheader__items") ;


         function hideTabContent(){
            tabsContent.forEach(item =>{
                 item.style.display = 'none' ;   
            });
         
            tabs.forEach(item =>{
                item.classList.remove("tabheader__item_active");
            })
        }

         function showTabContent(i = 0){
            tabsContent[i].style.display = 'block' ; 
            tabs[i].classList.add("tabheader__item_active");
         
        }

        hideTabContent(); 
        showTabContent(); 

        tabsParent.addEventListener("click", (event) =>{
                
            const target = event.target;
            if(target&&target.classList.contains("tabheader__item")){
                   tabs.forEach((item, i)=> {
                        if(target == item){
                            hideTabContent() ;
                            showTabContent(i);
                        }
                   }); 
            }

        });
   
        
        const dedline = '2022-02-03'; 

        function getDateRemain(endTime){

            const diff = Date.parse(endTime) - Date.parse(new Date()),
                  days = Math.floor(diff / (1000*60*60*24)) ,
                  hours = Math.floor((diff / (1000*60*60) % 24)), 
                  minutes = Math.floor((diff / 1000/60 % 60) % 60), 
                  seconds = Math.floor((diff / 1000) % 60) ;
                  
                  
            return{
                'total':diff,
                'days':days,
                'hours':hours,
                'minutes':minutes,
                'seconds':seconds
            };
        }

        function checkNumber(number){

            if(number >=0 && number <10){
                return `0${number}` ; 
            }else{
                return number ;
            }

           
        }

        function setClock(selector, endTime){

            const timer = document.querySelector(selector),
                  days = document.querySelector('#days') ,
                  hours = document.querySelector('#hours') ,
                  minutes = document.querySelector('#minutes') ,
                  seconds = document.querySelector('#seconds') ,
                  timeInterval = setInterval(upDateClock, 1000) ;
        
            upDateClock() ;

        function upDateClock(){
            const t = getDateRemain(endTime) ;
            days.innerHTML = checkNumber(t.days); 
            hours.innerHTML = checkNumber(t.hours); 
            minutes.innerHTML = checkNumber(t.minutes);
            seconds.innerHTML = checkNumber(t.seconds);   
            
            if(t.total <=0){
                clearInterval(timeInterval) ;
            }

        }
    }

    setClock('.time', dedline);
    
    const modalOp = document.querySelector('[data-modal]') ,
          modal = document.querySelector('.modal'); 
          modalClose = document.querySelector('[data-close]'),
          mForm = document.forms.tsd ;  

     modalOp.addEventListener('click', ()=>{
        // modal.classList.add('show'),
        modal.show() ;    
     }); 

     modalClose.addEventListener('click', ()=>{
        modal.classList.add('hide'),
        modal.classList.remove('show') ;    
     }); 


});