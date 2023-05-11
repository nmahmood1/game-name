// Declaring variables
const section = document.querySelector('section');

//defining getData function, return array of objects
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

//defining cardData with getData, randomizing, sorting and returning the order of the cardData, and setting that to randomize function.
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//generate cards based on randomized cardData; define it with cardGenerator function
const cardGenerator = () => {
  const cardData = randomize(); //calling randomize() to get random sorted cardData

  // const cards = document.querySelectorAll('.card');
  cardData.forEach((item, index) => {             //for each item in randomized card data
    const card = document.createElement('div');   //generating the html element
    const face = document.createElement('img');   //generating the html element
    const back = document.createElement('div');   //generating the html element
    card.classList = 'card';                      //assigning class to element
    face.classList = 'face';                      //assigning class to element
    back.classList = 'back';                      //assigning class to element
    
  //Setting the source of the face (img) element and setting attributes of card 
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);

  //append card to the section, face and back to card
  section.appendChild(card);
  card.appendChild(face);
  card.appendChild(back);
    
    card.addEventListener('click', (e) => {       // adding event listener to card on click and checks if flipped
      card.classList.toggle("toggleCard");
      card.classList.toggle("flipped"); 
      checkCards(e.currentTarget);      
    })  
  });
};

//check if two flipped cards match; 
const checkCards = (e) => {
  console.log(e);
  const clickedCard = e.target;
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCard = document.querySelectorAll('.toggleCard');
  console.log(flippedCards);

  //Logic; 
  if (flippedCards.length === 2) {
    if (                                          
      flippedCards[0].getAttribute('name') ===        //if two flipped cards have the same attribute 
      flippedCards[1].getAttribute('name')
    ) {
      console.log('match');                           //console log match, and for each flipped card, remove class flipped from card element, set pointerEvents to none so those cards can't be interacted with
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none';
      });
    } else {
      console.log('wrong');                         //else, console log the message wrong and for each flipped card, remove the class (flipped) from card element
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('toggleCard'), 1000);      //and remove toggleCard after 1000ms so the cards can go back to it's original state
      });  
    }
          //Run a check to see if we won the game, in 1000ms 

          setTimeout(() => {
            const toggleCard = document.querySelectorAll(".toggleCard");
            if (toggleCard.length === 12) {
              openModal("Victory!");
            }
          }, 1000);
  }
};

// Open the modal and display the message
const openModal = (text) => {
  // Get the modal
  const modal = document.getElementById("myModal");
  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];
  
  const modalContent = document.querySelector(".modal-content p");
  modalContent.textContent = text;
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
  modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

//Restart
const restart = () => {
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
  gameStatus.textContent = 'Game Restarted!';

};

// Select the restart button
const restartButton = document.getElementById('restart-button');

// Add a click event listener to the restart button
restartButton.addEventListener('click', () => {
  restart();
  openModal('Game Restarted!');
});


cardGenerator();


