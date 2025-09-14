// --- Capstone Challenge: Dragon Rune Adventure ---
document.getElementById('startBtn').addEventListener('click', startGame);

function startGame() {
  //prompt for name, species
  let name = prompt("Enter your name:");
  if (!name) {
    alert("You are required to enter a name!");
    return;
  }
  let species = prompt("Choose 'dragon' or 'human' for your species");
  if (!species) {
    alert("You must select a species");
    return;
  }
  species = species.trim().toLowerCase();
  if (species !== "dragon" && species !== "human") {
    alert("Species must be either 'dragon' or 'human'.");
    return;
  }

  // Utility function: returns a random integer from 0 up to (but not including) max
  const randInt = (max) => Math.floor(Math.random() * max);

  // Constructor for Player
  class Player {
    constructor(name, species) {
      this.name = name;
      this.species = species;
      this.runes = [];
      this.xp = 0;
    }
    // Method to add a rune to the player's collection
    addRune(rune) {
      this.runes.push(rune);
    }
    // Method to get a summary of the player's stats
    getStats() {
      const runeNames = this.runes.map(rune => rune.name);
      return `${this.name} (${this.species}) | XP: ${this.xp} | Runes: ${runeNames.join(", ") || "None"}`;
    }

    // Method to lose 1 XP (never goes below 0)
    loseXP() {
      this.xp -= 1;
    }
    // Method to gain 1 XP
    gainXP() {
      this.xp += 1;
    }
  }

  // Array of possible rune choices (each is an object)
  const runeChoices = [
    { name: "Rune of Fire", power: "Flame" },
    { name: "Rune of Ice", power: "Freeze" },
    { name: "Rune of Wisdom", power: "Knowledge" },
    { name: "Rune of Shadows", power: "Stealth" }
  ];

  const player = new Player(name, species);

  //player creation check
  console.log("Player created:",
    {
      name: player.name,
      species: player.species,
      runes: player.runeNames,
      xp: player.xp

    });



  function randomRune() {
    let randomIndex = randInt(4);
    let selectedRune = runeChoices[randomIndex];
    return selectedRune;
  }

  function randomXp() {
    return randInt(2) + 1;
  }

  // Utility function: displays the player's stats in the HTML page
  const showStats = player => {
    document.getElementById('stats').textContent = player.getStats();
  };

  //rune loop
  let addMore = true;
  while (addMore) {
    let randomRune1 = randomRune();
    let randomRune2 = randomRune();
    while (randomRune1.name === randomRune2.name) {
      randomRune2 = randomRune();
    }
    let rune = prompt(`Enter a rune to add to your collection 1:  ${randomRune1.name} or 2 : ${randomRune2.name}`);

    if (!rune) {
      break;
    }
    if (rune === "1") {
      player.addRune(randomRune1);
      alert(`${player.name} has collected the ${randomRune1.name}`);
      //xp code
      let randomXpNumber = randomXp();
      if (rune === randomXpNumber.toString()) {
        player.loseXP();
        alert("You have lost xp for this selection.")
      }
      else {
        player.gainXP();
        alert("You have gained xp!")
      }
      showStats(player);
      console.log(`${player.name} selected the ${randomRune1.name} and gained xp!`);
      console.log(`${player.name} currently has ${player.xp} xp.`)
    }
    else if (rune === "2") {
      player.addRune(randomRune2);
      alert(`${player.name} has collected the ${randomRune2.name}`);
      //xp code
      let randomXpNumber = randomXp();
      if (rune === randomXpNumber.toString()) {
        player.loseXP();
        alert("You have lost xp for this selection.")
      }
      else {
        player.gainXP();
        alert("You have gained xp!")
      }
      showStats(player);
      console.log(`${player.name} selected the ${randomRune1.name} and lost xp!`);
      console.log(`${player.name} currently has ${player.xp} xp.`)
    }
    else {
      alert("Invalid Selection, Enter 1 or 2 to select a rune. Or Click 'cancel' to end the game.")
    }
  }






}







