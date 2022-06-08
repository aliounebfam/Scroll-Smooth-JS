const navLinks = [...document.querySelectorAll("nav span")];
const sections = [...document.querySelectorAll("section")];

navLinks.forEach(link => link.addEventListener("click", addScrollSmooth));

function addScrollSmooth(e) {
    const linkIndex = navLinks.indexOf(e.target);
    visibilityBtn(sections[linkIndex].offsetTop);
    window.scrollTo({
        top: sections[linkIndex].offsetTop,
        behavior: "smooth"
    })
};

const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.previous');
const offsetTops = sections.map(section => section.offsetTop);

nextBtn.onclick = () => {
    customOnClickButton(offsetTops, function (element) {
        return element > Math.round(window.scrollY);
    })
};

previousBtn.onclick = function () {
    let offsetTopsReverse = offsetTops.slice().reverse();
    customOnClickButton(offsetTopsReverse, element => {
        return element < ~~window.scrollY;
    });
};

customOnClickButton = (offsetTops, condition) => {
    let customPositionSection = offsetTops.find(condition);
    customScrollSmoth(customPositionSection);
};

function customScrollSmoth(position) {
    console.log(window.scrollY);
    console.log(position);
    visibilityBtn(position);
    window.scrollTo({
        top: position,
        behavior: "smooth"
    });
};

function visibilityBtn(position) {
    if (position >= offsetTops[offsetTops.length - 1]) {
        nextBtn.style.visibility = 'hidden';
    }
    if (position < offsetTops[offsetTops.length - 1]) {
        nextBtn.style.visibility = 'visible';
    }
    if (position <= offsetTops[0]) {
        previousBtn.style.visibility = 'hidden';
    }
    if (position > offsetTops[0]) {
        previousBtn.style.visibility = 'visible';
    }
};

