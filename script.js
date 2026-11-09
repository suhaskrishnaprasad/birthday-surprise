
// ========================================
// 1. PERSONALISATION
// ========================================

const SECRET_PASSWORD = "18122002";

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
// 3. GIFT PAGE DESTINATIONS
// ========================================

const giftPages = {

  love: "letter.html",

  memory: "song.html",

  surprise: "invite.html"

};


// ========================================
// 4. GIFT BOX ANIMATION AND NAVIGATION
// ========================================

const giftPages = {
  love: "letter.html",
  memory: "song.html",
  surprise: "invite.html"
};

const giftOrder = ["love", "memory", "surprise"];

let unlockedGifts = JSON.parse(
  sessionStorage.getItem("unlockedGifts") || '["love"]'
);

document.querySelectorAll(".gift-option").forEach((button) => {
  const gift = button.dataset.gift;

  if (!unlockedGifts.includes(gift)) {
    button.disabled = true;
    button.classList.add("locked");
  }

  button.addEventListener("click", () => {
    if (!unlockedGifts.includes(gift)) return;

    const destination = giftPages[gift];

    if (!destination) return;

    const currentIndex = giftOrder.indexOf(gift);
    const nextGift = giftOrder[currentIndex + 1];

    if (nextGift && !unlockedGifts.includes(nextGift)) {
      unlockedGifts.push(nextGift);
      sessionStorage.setItem(
        "unlockedGifts",
        JSON.stringify(unlockedGifts)
      );
    }

    button.classList.add("opening");

    createHeartBurst();

    setTimeout(() => {
      window.location.href = destination;
    }, 750);
  });
});


// ========================================
// 5. RANDOM FLOATING HEARTS
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
// 6. AUTOMATIC HEART BURSTS
// ========================================

function scheduleHeartBurst() {

  createHeartBurst();

  const nextBurst =
    1000 + Math.random() * 1500;

  setTimeout(scheduleHeartBurst, nextBurst);

}

scheduleHeartBurst();
