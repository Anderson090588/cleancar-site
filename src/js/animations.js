console.log("ANIMATIONS CARREGADO");

/* ======================================
   CLEAN CAR - ANIMAÇÕES
====================================== */


const observer = new IntersectionObserver(
    
    (entries)=>{


        entries.forEach(entry=>{


            if(entry.isIntersecting){


                entry.target.classList.add("show");


            }


        });


    },


    {

        threshold:0.15

    }


);



const elements = document.querySelectorAll(
    
    ".service-card, .about-item, .schedule-box"

);

console.log(elements);


elements.forEach(element=>{


    element.classList.add("hidden");


    observer.observe(element);


});