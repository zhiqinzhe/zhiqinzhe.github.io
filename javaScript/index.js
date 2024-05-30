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
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        task(fixedFunction)
    }, delay)
}

function VisualAreaHeight(fixedFunction) {
    if (window.innerWidth <= 720) {
        fixedFunction(document.body.scrollTop || document.documentElement.scrollTop || window.scrollY)
    } else {
        fixedFunction(0)
    }
}

function HandleScroll(fixedFunction) {
    VisualAreaHeight(fixedFunction);
    window.addEventListener('scroll', function () {
        debounce(VisualAreaHeight, 12, fixedFunction)
    })
}

function changeNavigationBar(scrollTop) {
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
}

window.addEventListener('resize', function () {
    if (window.innerWidth >= 720) {
        maskingClass.style.display = "none"
    }
    debounce(VisualAreaHeight, 12, changeNavigationBar)
});

function loadingCompleted() {
    HandleScroll(changeNavigationBar);

    let images = document.querySelectorAll('img');

    images.forEach(image => {
        image.addEventListener('dragstart', function (event) {
            event.preventDefault();
        });
    });
}

document.addEventListener('DOMContentLoaded', loadingCompleted);
