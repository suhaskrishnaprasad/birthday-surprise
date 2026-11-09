
// ========================================
// 1. PERSONALISATION
// ========================================

const SECRET_PASSWORD = "18122002";

const PASSWORD_HINT =
  "The day the world got a little more beautiful... ♡";

const hintText = document.getElementById("hintText");

if (hintText) {
  hintText.textContent = PASSWORD_HINT;
}


// ========================================
// 2. SCREEN ELEMENTS
// ========================================

const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

const lockScreen = document.getElementById("lockScreen");
const giftScreen = document.getElementById("giftScreen");
const unlockButton = document.getElementById("unlockButton");


// ========================================
// 3. RESTORE UNLOCKED SESSION
// ========================================

if (sessionStorage.getItem("birthdayUnlocked") === "true") {
  lockScreen.classList.add("hidden");
  giftScreen.classList.remove("hidden");
  giftScreen.classList.add("unlocked");
}


// ========================================
// 4. PASSWORD UNLOCK
// ========================================

function unlock() {

  const entered = passwordInput.value.trim();

  if (entered === SECRET_PASSWORD) {

    sessionStorage.setItem("birthdayUnlocked", "true");

    lockScreen.classList.add("hidden");
    giftScreen.classList.remove("hidden");
    giftScreen.classList.add("unlocked");

    message.textContent = "";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  } else {

    message.textContent = "Not quite, love. Try again ♡";

    passwordInput.value = "";
    passwordInput.focus();

  }

}

unlockButton.addEventListener("click", unlock);

passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    unlock();
  }
});


// ========================================
// 5. GIFT PAGE DESTINATIONS
// ========================================

const giftPages = {
  love: "letter/letter.html",
  memory: "music/song.html",
  surprise: "invitation/invite.html"
};

const giftOrder = ["love", "memory", "surprise"];


// ========================================
// 6. GIFT COMPLETION AND SEQUENCE
// ========================================

let unlockedGifts = JSON.parse(
  sessionStorage.getItem("unlockedGifts") || '["love"]'
);

const completedGift = sessionStorage.getItem("completedGift");

if (completedGift) {

  const completedIndex = giftOrder.indexOf(completedGift);
  const nextGift = giftOrder[completedIndex + 1];

  if (nextGift && !unlockedGifts.includes(nextGift)) {
    unlockedGifts.push(nextGift);
  }

  sessionStorage.setItem(
    "unlockedGifts",
    JSON.stringify(unlockedGifts)
  );

  sessionStorage.removeItem("completedGift");
}


// ========================================
// 7. GIFT BUTTONS AND NAVIGATION
// ========================================

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

    button.classList.add("opening");

    createHeartBurst();

    setTimeout(() => {
      window.location.href = destination;
    }, 750);

  });

});


// ========================================
// 8. RANDOM HEART BURSTS
// ========================================

function createHeartBurst() {

  const colors = [
    "#e77b9c",
    "#c94f78",
    "#f2a5bb",
    "#e9a9bc"
  ];

  const symbols = ["♡", "♥"];

  const heartCount = Math.floor(Math.random() * 5) + 4;

  for (let i = 0; i < heartCount; i++) {

    const heart = document.createElement("span");

    heart.className = "burst-heart";

    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.color =
      colors[Math.floor(Math.random() * colors.length)];

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
// 9. AUTOMATIC FLOATING HEART BURSTS
// ========================================

function scheduleHeartBurst() {

  createHeartBurst();

  const nextBurst = 1800 + Math.random() * 2200;

  setTimeout(scheduleHeartBurst, nextBurst);

}

scheduleHeartBurst();
