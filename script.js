
// Declaring variable
const section = document.querySelector('section');

//defining the cards and their sources
const getData = () => [
  { imgSrc: './images/babyface.webp', name: 'babyface' },
  { imgSrc: './images/crying face.jpeg', name: 'cryface' },
  { imgSrc: './images/disaster-girl.jpeg', name: 'disastergirl' },
  { imgSrc: './images/kevin.jpeg', name: 'kevin' },
  { imgSrc: './images/sideye.webp', name: 'sideye' },
  { imgSrc: './images/what.jpeg', name: 'what' },
  { imgSrc: './images/babyface.webp', name: 'babyface'},
  { imgSrc: './images/crying face.jpeg', name: 'cryface' },
  { imgSrc: './images/disaster-girl.jpeg', name: 'disastergirl' },
  { imgSrc: './images/kevin.jpeg', name: 'kevin' },
  { imgSrc: './images/sideye.webp', name: 'sideye' },
  { imgSrc: './images/what.jpeg', name: 'what' }
];

//randomizing the order of the cards by setting 
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//card generator function
const cardGenerator = () => {
  const cardData = randomize();

  //generate the html
  const cards = document.querySelectorAll('.card');
  cardData.forEach((item, index) => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';
    
  //attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);

  //attach card to the section
    
  section.appendChild(card);
  card.appendChild(face);
  card.appendChild(back);
    card.addEventListener('click', (e) => {
      card.classList.toggle("toggleCard");
      card.classList.toggle("flipped"); 
      checkCards(e.currentTarget);
    })  
  });
};


//check cards
const checkCards = (e) => {
  console.log(e);
  const clickedCard = e.target;
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCard = document.querySelectorAll('.toggleCard');
  console.log(flippedCards);
  //Logic
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute('name') ===
      flippedCards[1].getAttribute('name')
    ) {
      console.log('match');
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none';
      });
    } else {
      console.log('wrong');
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('toggleCard'), 1000);
      });  
    }
          //Run a check to see if we won the game

          setTimeout(() => {
            const toggleCard = document.querySelectorAll(".toggleCard");
            if (toggleCard.length === 12) {
              restart("Victory");
            }
          }, 1000);
  }
};

//Restart
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll('.face');
  let cards = document.querySelectorAll('.card');
  section.style.pointerEvents = 'none';
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard');

    //Randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all';
      faces[index].src = item.imgSrc;
      cards[index].setAttribute('name', item.name);
      section.style.pointerEvents = 'all';
    }, 20)
  });
  // Display the game status
  const gameStatus = document.getElementById('game-status');
  gameStatus.textContent = text;

  // Display the game status in a pop-up
  alert(text);
};


// Select the restart button
const restartButton = document.getElementById('restart-button');

// Add a click event listener to the restart button
restartButton.addEventListener('click', () => {
  restart('Game Restarted!');
});

cardGenerator();


