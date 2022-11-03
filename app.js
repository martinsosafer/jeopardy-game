const game =document.getElementById("game")
const scoreDisplay= document.getElementById("score")

const jeopardyCategories=[
  {
    genre:'WHO',
    questions:[
      {
        question: "Who wrote the lord of the rings?",
        answers:["JK Rowling" , "J.R.R. Tolkien"],
        correct:"J.R.R. Tolkien",
        level:"easy",
      },
      {
        question:"Who invented the Penicilin?",
        answers:["Alexander Fleming","Marie Curie"],
        correct:"Alexander Fleming",
        level:"medium"
      },
      {
        question:"Who described gravity ?",
        answers:["Isaac Newton", "Daniel Bernoulli"],
        correct:"Isaac Newton",
        level:"medium"
      },
    ]
  },
  {
    genre:'WHEN',
    questions:[
      {
        question:"When the second world war ended?",
        answers:["September 2, 1945","October 14 ,1943"],
        correct:"September 2, 1945",
        level:"medium"
    },
      {
        question:"When was the first Football world cup?",
        answers:["1930","1946"],
        correct:"1930",
        level:"hard"
      },
      {
        question:"When was the movie titanic released?",
        answers:["1997","1999"],
        correct:"1997",
        level:"medium"
      },
  ]
  },
  {
    genre:'WHERE',
    questions:[
      {
        question:"Where is the Taj Mahal?",
        answers:["India" ,"Tailand"],
        correct:"India",
        level:"easy",
      },
      {
        question:"Where was  Christopher Columbus born?",
        answers:["Italy","France"],
        correct:"Italy",
        level:"medium",
      },
      {
        question:"Where do all the dogs go ?",
        answers:["To heaven", "To the park"],
        correct:"To heaven",
        level:"medium"
      },
    ]
  },
  {
    genre:"WHAT",
    questions:[
     {
      question:"What do Koalas eat?",
      answers:["Eucalyptus","Bamboo"],
      correct:"Eucalyptus",
      level:"medium"
     },
     {
      question:"What do bees make ?",
      answers:["Honey","Polem"],
      correct:"Honey",
      level:"easy",
     },
     {
      question:"What is speed ?",
      answers:["Time/Distance","Distance/Time"],
      correct:"Distance/Time",
      level:"medium"
     }
    ]
  },
  {
    genre:"HOW_MANY",
    questions:[
      {
        question:"How many people are in China ?",
        answers:["1,4bill" , "1,2bill"],
        correct:"1,4bill",
        level:"hard",

      },
      {
        question:"How many knowed artworks does L. da Vinci has ?",
        answers:["around 20","around 50"],
        correct:"around 20",
        level:"hard"
      },
      {
        question:"How many liters of blood does the human body has ?",
        answers:["aprox 5,5lts", "aprox 4lts"],
        correct:"aprox 5,5lts",
        level:"hard"
      }
    ]
  }

]
let score =0

function addCategory(category){
  const column=document.createElement("div")
  column.classList.add("genre-column")
  
  const genreTitle = document.createElement("div")
  genreTitle.classList.add("genre-title")
  genreTitle.innerText =category.genre
  
  //first 5 columns appended here 
  column.appendChild(genreTitle)
  game.append(column)
  
  category.questions.forEach(question=>{
    const card=document.createElement("div")
    card.classList.add("card")
    column.appendChild(card) //we can use append child if we just want to append one thing

    //we will put some text on the empty div , by the level , looping the array with each question level
    if(question.level==="easy"){
      card.innerText=100
    }
    if(question.level==="medium"){
      card.innerText=200
    }
    if(question.level==="hard"){
      card.innerText=300
    }
    card.setAttribute("data-question",question.question)
    card.setAttribute("data-answer-1",question.answers[0])
    card.setAttribute("data-answer-2",question.answers[1])
    card.setAttribute("data-correct",question.correct)
    card.setAttribute("data-value",card.getInnerHTML())//inner html so when i flipped the card i can see wich question is inside of it

    card.addEventListener("click", flipCard)
  })
}
jeopardyCategories.forEach(category=>addCategory(category))

function flipCard(){
  this.InnerHTML= ""
  this.style.fontSize ="15px"
  this.style.lineHeight="25px"
  const textDisplay=document.createElement("div")
  textDisplay.classList.add("card-text")
  textDisplay.innerHTML =this.getAttribute("data-question")
  const firstButton=document.createElement("button")
  const secondButton=document.createElement("button")
  firstButton.classList.add("first-button")
  secondButton.classList.add("second-button")
  firstButton.innerHTML=this.getAttribute("data-answer-1")//this is whatever is inside when we flipped
  secondButton.innerHTML=this.getAttribute("data-answer-2")
  firstButton.addEventListener("click",getResult)
  secondButton.addEventListener("click",getResult)
  this.append(textDisplay, firstButton, secondButton)
  //if i flipped the card i want to get everysingle one and remove the event listener

  const allCards=Array.from(document.querySelectorAll(".card"))
  allCards.forEach(card=> card.removeEventListener("click",flipCard))
}//now if i clicked on one question , i cant move on to another one , i have to answer it !

function getResult(){
//lets remember the botton leaves inside his parent(theCard) so we should try to get it first
const allCards=Array.from(document.querySelectorAll(".card"))
allCards.forEach(card=>card.addEventListener("click",flipCard))
const cardOfButton=this.parentElement
console.log("cardOfbutton",cardOfButton)
if(cardOfButton.getAttribute("data-correct")==this.innerHTML){
  score =score +parseInt(cardOfButton.getAttribute("data-value"))
  scoreDisplay.innerHTML =score
  cardOfButton.classList.add("correct-answer")
  
  setTimeout(() => {
    while(cardOfButton.firstChild){
      cardOfButton.removeChild(cardOfButton.lastChild)//what are we doing here is looping and looping until we remove all the childs from his parents until there is no first child
    }
    cardOfButton.innerHTML=cardOfButton.getAttribute("data-value")
  }, 100);
}else{
      cardOfButton.classList.add("wrong-answer")
      setTimeout(() => {
        while(cardOfButton.firstChild){
          cardOfButton.removeChild(cardOfButton.lastChild)
        }
        cardOfButton.innerHTML=0
      }, 100);
}
cardOfButton.removeEventListener("click",flipCard)
}
