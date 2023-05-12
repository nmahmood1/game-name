// Declaring section variable where memory cards will be displayed
const section = document.querySelector('section');

//defining getData function, returns array of objects, each object represents a card with it's source and name
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

//randomize function is defined to get shuffled cardData     
const randomize = () => {
  const cardData = getData();     //getting cardData by calling getData
  cardData.sort(() => Math.random() - 0.5);   //randomize/shuffle 
  return cardData;
};

//defining cardGenerator function to generate cards based on randomized cardData; 
const cardGenerator = () => {
  const cardData = randomize(); //calling randomize() to get randomly sorted cardData


//for each item in randomized cardData
cardData.forEach((item, index) => {             
  const card = document.createElement('div');   
  const face = document.createElement('img');   //generate the html elements
  const back = document.createElement('div');   
  card.classList = 'card';                      
  face.classList = 'face';                      //assign class to those elements
  back.classList = 'back';                      
    
//Set the src attribute of the img element to the imgSrc of item 
  face.src = item.imgSrc;
  card.setAttribute('name', item.name); // set name attribute of card 

//append card to the section; append face and back to card
section.appendChild(card);
card.appendChild(face);
card.appendChild(back);
    
  card.addEventListener('click', (e) => {    // add event listener to card, function executed on click
    card.classList.toggle("toggleCard");    //toggles the toggleCard and flipped class when clicked
    card.classList.toggle("flipped"); 
    checkCards(e.currentTarget);           //passing card that was clicked as an argument and calling checkCards function
    })  
  });                                     //end of forEach loop
};

//check if two flipped cards match; 
const checkCards = (e) => {
  console.log(e);
  const flippedCards = document.querySelectorAll('.flipped');   //selects all elements with flipped class
  const toggleCard = document.querySelectorAll('.toggleCard');  //selects all elements with toggleCard class
  console.log(flippedCards);

  //Logic; 
  if (flippedCards.length === 2) {
    if (                                          
      flippedCards[0].getAttribute('name') ===        //if two flipped cards have the same attribute, console log match
      flippedCards[1].getAttribute('name')
    ) {
      console.log('match');                           
      flippedCards.forEach((card) => {                //for each flipped card, 
        card.classList.remove('flipped');             //remove class flipped from card element, 
        card.style.pointerEvents = 'none';            //set pointerEvents to none so those matched cards can't be interacted with
      });
    } else {
      console.log('wrong');                         //else, console log the message wrong and for each flipped card, remove the class (flipped) from card element
      flippedCards.forEach((card) => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('toggleCard'), 1000);      //remove toggleCard after 1000ms so the cards will flip back over
      });  
    }

    //Run a check to see if we won the game, after 1000ms 
    setTimeout(() => {
      const toggleCard = document.querySelectorAll(".toggleCard");    //the function selects all elements with toggleCard class
      if (toggleCard.length === 12) {                       //if there are 12 elements with toggleCard class
        openModal("Victory!");
      }
    }, 1000);
  }
};

// Open the modal and display the message
const openModal = (text) => {
  const modal = document.getElementById("myModal");     // Get the modal element
  const span = document.getElementsByClassName("close")[0];       // Get the <span> element that closes the modal
  const modalContent = document.querySelector(".modal-content p");    //get the p element 
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

//Restart function
const restart = () => {
  let cardData = randomize();
  let faces = document.querySelectorAll('.face');
  let cards = document.querySelectorAll('.card');
  section.style.pointerEvents = 'none';       //disables pointerEvents
  cardData.forEach((item, index) => {         // removes toggleCard for each card
    cards[index].classList.remove('toggleCard');
    setTimeout(() => {                          //after 20ms for each card enables pointerEvents, updates the source for images, sets name attribute for the card, enables pointerEvents on section again
      cards[index].style.pointerEvents = 'all';
      faces[index].src = item.imgSrc;
      cards[index].setAttribute('name', item.name);
      section.style.pointerEvents = 'all';
    }, 20)
  });
};

// Select the restart button
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {    // Add a click event listener to the restart button
  restart();
  openModal('Game Restarted!');
});


cardGenerator();


