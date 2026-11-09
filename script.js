<script>
  // PERSONALISE THESE TWO VALUES before sharing.
  const SECRET_PASSWORD = "18122002";
  const PASSWORD_HINT = "The day the world got a little more beautiful... ♡";

  document.getElementById("hintText").textContent = PASSWORD_HINT;

  const passwordInput = document.getElementById("password");
  const message = document.getElementById("message");


  function unlock() {
    const entered = passwordInput.value.trim();

    if (entered.toLowerCase() === SECRET_PASSWORD.toLowerCase()) {

      document.getElementById("lockScreen").classList.add("hidden");

      const giftScreen = document.getElementById("giftScreen");
      giftScreen.classList.remove("hidden");
      giftScreen.classList.add("unlocked");

    } else {
      message.textContent = "Not quite, love. Try again ♡";
      passwordInput.value = "";
      passwordInput.focus();
    }
  }

  // Gift reveal content
  const giftContents = {
    love: {
      title: "A little love, just for you ♡",
      text: "If I could give you one thing in this world, it would be the ability to see yourself through my eyes. Then you'd know just how special you are to me. You deserve all the love, happiness and beautiful things in this world."
    },

    memory: {
      title: "Our little world ♡",
      text: "Every little moment with you becomes a memory I want to keep forever. From our silly conversations to our favourite adventures, I wouldn't trade our little world for anything."
    },

    surprise: {
      title: "Something special awaits! 🎂",
      text: "Your birthday deserves more than just a wish. I've got something special planned for you. But that's a surprise you'll have to discover..."
    }
  };

  document.querySelectorAll(".gift-option").forEach(button => {
    button.addEventListener("click", () => {

      const gift = button.dataset.gift;
      const content = giftContents[gift];

      document.querySelectorAll(".gift-option").forEach(item => {
        item.classList.add("hidden");
      });

      document.getElementById("revealTitle").textContent = content.title;
      document.getElementById("revealText").textContent = content.text;

      document.getElementById("giftReveal").classList.remove("hidden");
    });
  });

  document.getElementById("backToGifts").addEventListener("click", () => {

    document.getElementById("giftReveal").classList.add("hidden");

    document.querySelectorAll(".gift-option").forEach(item => {
      item.classList.remove("hidden");
    });

  });

  document.getElementById("unlockButton").addEventListener("click", unlock);

  passwordInput.addEventListener("keydown", event => {
    if (event.key === "Enter") unlock();
  });
// Random floating heart bursts across the entire screen

function createHeartBurst() {
  const colors = ["#e77b9c", "#c94f78", "#f2a5bb", "#e9a9bc"];
  const symbols = ["♡", "♥"];

  const heartCount = Math.floor(Math.random() * 5) + 4;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("span");

    heart.className = "burst-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    // Random position across the entire screen
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `${Math.random() * 100}vh`;

    heart.style.setProperty("--move-x", `${(Math.random() - 0.5) * 160}px`);
    heart.style.setProperty("--move-y", `${(Math.random() - 0.5) * 160}px`);
    heart.style.setProperty("--rotation", `${Math.random() * 180 - 90}deg`);

    heart.style.fontSize = `${12 + Math.random() * 16}px`;

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
  }
}

// New burst every 0.8–2 seconds
function scheduleHeartBurst() {
  createHeartBurst();

  setTimeout(scheduleHeartBurst, 800 + Math.random() * 1200);
}

scheduleHeartBurst();