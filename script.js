
// ========================================
// 1. PERSONALISATION
// ========================================

// Change these before sharing your website.
const SECRET_PASSWORD = "YOUR_PASSWORD";

const PASSWORD_HINT =
  "The day the world got a little more beautiful... ♡";

document.getElementById("hintText").textContent = PASSWORD_HINT;


// ========================================
// 2. PASSWORD UNLOCK
// ========================================

const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

const lockScreen = document.getElementById("lockScreen");
const giftScreen = document.getElementById("giftScreen");

function unlock() {

  const entered = passwordInput.value.trim();

  if (
    entered.toLowerCase() ===
    SECRET_PASSWORD.toLowerCase()
  ) {

    lockScreen.classList.add("hidden");

    giftScreen.classList.remove("hidden");

    giftScreen.classList.add("unlocked");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  } else {

    message.textContent =
      "Not quite, love. Try again ♡";

    passwordInput.value = "";
    passwordInput.focus();

  }

}

document
  .getElementById("unlockButton")
  .addEventListener("click", unlock);

passwordInput.addEventListener("keydown", event => {

  if (event.key === "Enter") {
    unlock();
  }

});


// ========================================
// 3. GIFT CONTENT
// ========================================

const giftContents = {

  love: {

    title: "A little love, just for you ♡",

    text:
      "If I could give you one thing in this world, it would be the ability to see yourself through my eyes. Then you'd know just how special you are to me. You deserve all the love, happiness and beautiful things in this world."

  },


  memory: {

    title: "Our little world ♡",

    text:
      "Every little moment with you becomes a memory I want to keep forever. From our silly conversations to our favourite adventures, I wouldn't trade our little world for anything."

  },


  surprise: {

    title: "Something special awaits! 🎂",

    text:
      "Your birthday deserves more than just a wish. I've got something special planned for you. But that's a surprise you'll have to discover..."

  }

};


// ========================================
// 4. GIFT BOX ANIMATION AND REVEAL
// ========================================

const giftButtons =
  document.querySelectorAll(".gift-option");

const giftContainer =
  document.getElementById("giftContainer");

const giftReveal =
  document.getElementById("giftReveal");

const revealTitle =
  document.getElementById("revealTitle");

const revealText =
  document.getElementById("revealText");

let isOpeningGift = false;


giftButtons.forEach(button => {

  button.addEventListener("click", () => {

    // Prevent multiple clicks during animation.
    if (isOpeningGift) return;

    isOpeningGift = true;

    const selectedGift = button.dataset.gift;

    const content = giftContents[selectedGift];

    if (!content) {
      isOpeningGift = false;
      return;
    }

    // Start box-opening animation.
    button.classList.add("opening");

    // Little burst of hearts.
    createHeartBurst();

    // Wait for animation before showing message.
    setTimeout(() => {

      giftContainer.classList.add("hidden");

      revealTitle.textContent = content.title;
      revealText.textContent = content.text;

      giftReveal.classList.remove("hidden");

      isOpeningGift = false;

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 750);

  });

});


// ========================================
// 5. BACK TO GIFT SELECTION
// ========================================

document
  .getElementById("backToGifts")
  .addEventListener("click", () => {

    giftReveal.classList.add("hidden");

    giftContainer.classList.remove("hidden");

    // Reset all gift boxes.
    giftButtons.forEach(button => {

      button.classList.remove("opening");

    });

    isOpeningGift = false;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


// ========================================
// 6. RANDOM FLOATING HEARTS
// ========================================

function createHeartBurst() {

  const colors = [
    "#e77b9c",
    "#c94f78",
    "#f2a5bb",
    "#e9a9bc"
  ];

  const symbols = ["♡", "♥"];

  const heartCount =
    Math.floor(Math.random() * 5) + 4;


  for (let i = 0; i < heartCount; i++) {

    const heart = document.createElement("span");

    heart.className = "burst-heart";

    heart.textContent =
      symbols[
        Math.floor(Math.random() * symbols.length)
      ];

    heart.style.color =
      colors[
        Math.floor(Math.random() * colors.length)
      ];

    // Random position anywhere on the screen.
    heart.style.left = `${Math.random() * 100}vw`;

    heart.style.top = `${Math.random() * 100}vh`;

    heart.style.setProperty(
      "--move-x",
      `${(Math.random() - 0.5) * 160}px`
    );

    heart.style.setProperty(
      "--move-y",
      `${(Math.random() - 0.5) * 160}px`
    );

    heart.style.setProperty(
      "--rotation",
      `${Math.random() * 180 - 90}deg`
    );

    heart.style.fontSize =
      `${12 + Math.random() * 16}px`;

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2000);

  }

}


// ========================================
// 7. AUTOMATIC HEART BURSTS
// ========================================

function scheduleHeartBurst() {

  createHeartBurst();

  const nextBurst =
    1000 + Math.random() * 1500;

  setTimeout(scheduleHeartBurst, nextBurst);

}

scheduleHeartBurst();

