const symbolClick = document.querySelector('.symbol');
const closeClick = document.querySelector('.close');
const maskingClass = document.querySelector('.masking');

symbolClick.addEventListener('click', function () {
    maskingClass.style.display = "block"
});

closeClick.addEventListener('click', function () {
    maskingClass.style.display = "none"
});

function debounce(task, delay, fixedFunction) {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            task(fixedFunction)
        }, delay)
    }
}

function VisualAreaHeight(fixedFunction) {
        
        if(window.innerWidth <= 720){
            fixedFunction(window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || window.scrollY)
        }else{
            fixedFunction(0)
        }
}

function HandleScroll(fixedFunction) {
    window.addEventListener('scroll', debounce(VisualAreaHeight, 12, fixedFunction))
}

function loadingCompleted() {
    HandleScroll(function (scrollTop) {
        let navigationBarBgColor = document.querySelector('.navigationBar');




        if (scrollTop == 0) {
            navigationBarBgColor.classList.remove("navigationBarWhite");
            navigationBarBgColor.classList.remove('navigationBarTranslucent');
        } else {
            if (scrollTop >= 512) {
                navigationBarBgColor.classList.remove('navigationBarTranslucent');
                navigationBarBgColor.classList.add("navigationBarWhite");
            } else {
                navigationBarBgColor.classList.remove("navigationBarWhite");
                navigationBarBgColor.classList.add('navigationBarTranslucent');

            }
        }
    });

    let images = document.querySelectorAll('img');

    images.forEach(image => {
        image.addEventListener('dragstart', function (event) {
            event.preventDefault();
        });
    });
}

document.addEventListener('DOMContentLoaded', loadingCompleted);