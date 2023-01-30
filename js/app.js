let backgroundImages = document.querySelectorAll(`.background-images img`);
backgroundImages = Array.from(backgroundImages);
backgroundImages.reverse();

function* generateImage() {
  yield* [1, 2, 3, 4];
  while (true) {
    for (let i = 0; i < backgroundImages.length; i++) {
      yield i;
    }
  }
}

const imageGenerator = generateImage();

function ranodomImages() {
  let random = Math.floor(Math.random() * 5);
  return random;
}

function generateCounter() {
  let counter;
  if (randomImage) {
    counter = ranodomImages();
  } else {
    counter = imageGenerator.next().value;
  }
  return counter;
}

function changeBackground(counter) {
  backgroundImages.forEach(img => {
    img.style.opacity = '0';
  });
  backgroundImages[counter].style.opacity = '1';
  removeLiActive();
  imageControl[counter].classList.add('active');
}

setInterval(() => {
  changeBackground(generateCounter());
}, 10000);

const imageControl = document.querySelectorAll(`.images-control li`);

function removeLiActive() {
  imageControl.forEach(li => li.classList.remove('active'));
}

imageControl.forEach((li, index) => {
  li.addEventListener(`click`, () => {
    removeLiActive();
    li.classList.add('active');
    changeBackground(index);
  });
});

let burgerMenuButton = document.querySelector('header .links + .icon');
let links = document.querySelector('header .links');

burgerMenuButton.addEventListener(`click`, () => {
  links.classList.toggle(`hidden`);
});

let backgroundColors = document.querySelectorAll(`.settings .colors ul li`);

function changeSettingsColors(counter) {
  document.body.style.cssText = `
  --main-color: ${getComputedStyle(backgroundColors[counter]).backgroundColor};
  `;
  backgroundColors.forEach(el => el.classList.remove(`active`));
  backgroundColors[counter].classList.add(`active`);
  localStorage.setItem(`backgroundColorIndex`, counter);
}

backgroundColors.forEach((el, index) => {
  el.addEventListener(`click`, () => {
    changeSettingsColors(index);
  });
});

let randomBackgrounds = document.querySelectorAll(
  `.settings .random-backgrounds   .btns button`
);

let randomImage;

function changeRandomBackground(index) {
  randomBackgrounds.forEach(el => {
    el.classList.remove(`active`);
    el.value = false;
  });

  randomBackgrounds[index].classList.add(`active`);
  localStorage.setItem(`randomImages`, index);
  randomBackgrounds[index].value = 'true';

  if (randomBackgrounds[0].value === `true`) {
    randomImage = true;
  } else {
    randomImage = false;
  }
}

randomBackgrounds.forEach((el, index) => {
  el.addEventListener(`click`, () => {
    changeRandomBackground(index);
  });
});

let showBullets = document.querySelectorAll(`.settings .show-bullets button`);

let showBullet;

function changeBullets(index) {
  showBullets.forEach(el => {
    el.classList.remove(`active`);
    el.value = false;
  });

  showBullets[index].classList.add(`active`);
  localStorage.setItem(`showBullet`, index);
  showBullets[index].value = 'true';

  if (showBullets[0].value === `true`) {
    showBullet = true;
  } else {
    showBullet = false;
  }

  if (!showBullet) {
    document.querySelector(`.images-control`).style.cssText = `
      opacity: 0;
      pointer-events: none;
      `;
    document.querySelector(`.sections-bullets`).style.cssText = `
      opacity: 0;
      pointer-events: none;
      `;
  } else {
    document.querySelector(`.images-control`).style.cssText = `
      opacity: 1;
      pointer-events: intail;
      `;
    document.querySelector(`.sections-bullets`).style.cssText = `
      opacity: 1;
      pointer-events: intail;
      `;
  }
}

showBullets.forEach((el, index) => {
  el.addEventListener(`click`, () => {
    changeBullets(index);
  });
});

let showArrowButtons = document.querySelectorAll(
  `.settings .show-arrow button`
);

let showArrow;
const landingPage = document.querySelector(`.landing-page`);
const arrowTop = document.querySelector(`.arrow-top`);

function changeArrows(index) {
  showArrowButtons.forEach(el => {
    el.classList.remove(`active`);
    el.value = false;
  });

  showArrowButtons[index].classList.add(`active`);
  localStorage.setItem(`showArrow`, index);
  showArrowButtons[index].value = 'true';

  if (showArrowButtons[0].value === `true`) {
    showArrow = true;
  } else {
    showArrow = false;
  }

  showArrowFunction(showArrow);
}

showArrowButtons.forEach((el, index) => {
  el.addEventListener(`click`, () => {
    changeArrows(index);
  });
});

let rest = document.querySelector(`.rest`);

rest.addEventListener(`click`, () => {
  changeSettingsColors(0);
  changeRandomBackground(0);
  changeBullets(0);
  changeArrows(0);
});

let settingsButton = document.querySelector(`.settings-button`);
let settings = document.querySelector(`.settings`);
let settingsOverlay = document.querySelector(`.settings-overlay`);

settingsButton.addEventListener(`click`, () => {
  settingsButton.firstElementChild.classList.toggle(`fa-spin`);
  settings.classList.toggle(`hidden`);
  settingsOverlay.classList.toggle(`overlay-hidden`);
});

settingsOverlay.addEventListener(`click`, () => {
  settingsButton.firstElementChild.classList.toggle(`fa-spin`);
  settingsOverlay.classList.toggle(`overlay-hidden`);
  settings.classList.add(`hidden`);
});

const skills = document.querySelector('.skill-statistics');
const skill = document.querySelectorAll('.statistic .progress span');
let progressText = 0;

window.addEventListener('scroll', () => {
  let skillsOffest = skills.offsetTop;
  let skillsHeight = skills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowPageY = this.scrollY;

  if (
    windowPageY > skillsOffest + skillsHeight - windowHeight &&
    windowPageY < skillsOffest - skillsHeight + windowHeight
  ) {
    skill.forEach(el => {
      el.style.width = el.dataset.progress;
      progressText = el.dataset.progress;
      el.style.setProperty(`--progress-text`, `'${progressText}'`);
    });
  } else {
    skill.forEach(el => {
      el.style.width = 0;
      progressText = 0;
      el.style.setProperty(`--progress-text`, `'${progressText}%'`);
    });
  }
});

function defaultValues() {
  localStorage.getItem(`backgroundColorIndex`) &&
    changeSettingsColors(localStorage.getItem(`backgroundColorIndex`));
  localStorage.getItem(`randomImages`) &&
    changeRandomBackground(localStorage.getItem(`randomImages`));
  localStorage.getItem(`showBullet`) &&
    changeBullets(localStorage.getItem(`showBullet`));
  localStorage.getItem(`showArrow`) &&
    changeArrows(localStorage.getItem(`showArrow`));
}

defaultValues();

function showArrowFunction(option) {
  if (
    this.scrollY >= landingPage.offsetTop + landingPage.offsetHeight &&
    option
  ) {
    arrowTop.classList.add(`show`);
    document.querySelector(`.arrow-top`).style.pointerEvents = `unset`;
  } else {
    arrowTop.classList.remove(`show`);
    document.querySelector(`.arrow-top`).style.pointerEvents = `none`;
  }
}
window.addEventListener(`scroll`, () => {
  showArrowFunction(showArrow);
});

arrowTop.addEventListener(`click`, () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

// Image Display

const galleryImages = document.querySelectorAll(`.our-gallery .images .image`);

console.log(galleryImages);

const imageDisplay = document.querySelector(`.image-display`);
const imageDisplayOverlay = document.querySelector(`.image-display-overlay`);

galleryImages.forEach((el, index) => {
  el.addEventListener(`click`, () => {
    imageDisplayFunction(el, index);
  });
});

function imageDisplayFunction(img, index) {
  imageDisplay.classList.toggle(`hidden`);
  imageDisplayOverlay.classList.toggle(`hidden`);
  const numbersToWords = [
    `One`,
    `Two`,
    `Three`,
    `Four`,
    `Five`,
    `Six`,
    `Seven`,
    `Eight`,
    `Nine`,
    `Ten`,
  ];
  imageDisplay.insertAdjacentHTML(
    `beforeend`,
    `<p>Image ${numbersToWords[index]}</p>`
  );
  imageDisplay.append(img.cloneNode(true));
}

const imageDisplayClose = document.querySelector(`.image-display .close`);

function hideImageDisplay() {
  imageDisplay.classList.toggle(`hidden`);
  imageDisplayOverlay.classList.toggle(`hidden`);
  imageDisplay.lastElementChild.remove();
  imageDisplay.lastElementChild.remove();
}
imageDisplayClose.addEventListener(`click`, hideImageDisplay);
imageDisplayOverlay.addEventListener(`click`, hideImageDisplay);
