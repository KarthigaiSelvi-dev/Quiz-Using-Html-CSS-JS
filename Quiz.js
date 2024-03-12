const quizData = [
    {
      question: '1. Which type of Javascript Language?',
      options: ['OOPS', 'Assembly Language', 'Object Based', 'High Level'],
      answer: 'OOPS',
    },
    {
      question: '2. Which of the following is not a JavaScript Data Types?',
      options: ['Boolean', 'UnDefined', 'Number', 'Float'],
      answer: 'Float',
    },
    {
      question: '3. Which of the following type of a variable is volatile?',
      options: ['Mutable Variable', 'Dynamic Variable', 'Volatile Variable', 'Immutable Variable'],
      answer: 'Mutable Variable',
    },
    {
      question: '4. Which of the following number object function returns the value of the number?',
      options: ['tostring()', 'valueOf()', 'toLocalString()', 'toPrecision()'],
      answer: 'ValueOf()',
    },
    {
      question: '5. Which one of the following operator returns false if both values are equal?',
      options: [
        '!',
        '!=',
        '!==',
        '==',
      ],
      answer: '!=',
    },
    {
      question: '6. A set of unordered properties that, has a name and value is called______',
      options: ['String', 'Array', 'Object', 'Serialized Object'],
      answer: 'object',
    },
    {
      question: '7. If a function which does not return a value is known as _____?',
      options: [
        'Static function',
        'Procedures',
        'Method',
        'Dynamic function',
      ],
      answer: 'Procedures',
    },
    {
      question: '8. A collection of elements of the same data type which may either in order or not, is called _____.?',
      options: ['String', 'Array', 'Object', 'Serialized Object'],
      answer: 'Array',
    },
    {
      question: '9. Which one of the following keywords is used for defining the function in the JavaScript?',
      options: [
        'Void',
        'init',
        'main',
        'function',
      ],
      answer: 'Function',
    },
    {
      question: '10. Which one of the following is not a example of closures?',
      options: ['Graphics', 'Variables', 'Functions', 'Objects'],
      answer: 'Graphics',
    },
  ];
  
  const quizContainer = document.getElementById('quiz'); //gets an element from the HTML document with the ID quiz & stores in variable quizcontainer
  const resultContainer = document.getElementById('result');//gets an element from the HTML document with the ID result & stores in a variable resultcontainer
  const submitButton = document.getElementById('submit');//retrieves the element with the ID submit and stores in the variable
  const retryButton = document.getElementById('retry');// retrieves the element with the ID submit and stores in the variable
  
  
  //Initializes a variable currentQuestion to keep track of the current question index. It starts at 0.
  //Initializes a variable score to keep track of the user's score. It starts at 0.
  //Initializes an empty array incorrectAnswers to store information about incorrectly answered questions.
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];

  function shuffleArray(array) { //takes array as an input and shuffles randomly
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');//creates a div element to hold a question
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div'); //creates a div element to hold a option
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options]; //copy of the options array for the current question & shuffles it using the shufflearray
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) { //for loop iterates through the shuffled options
      const option = document.createElement('label'); //creates a label element
      option.className = 'option';
  
      const radio = document.createElement('input');//creates a input element as a radio type
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);//this used to add HTML elements or text as the last child of a specified element.useful when you dynamically add content
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked'); //This retrieves the selected answer.
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) { //Compares the selected answer with the correct answer stored in the quizData
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();//show the final score
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none'; //hides quiz container to indicate end of the quiz
    submitButton.style.display = 'none'; //Hides the submit button as the quiz ended
    retryButton.style.display = 'inline-block';//display the retry button
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0; //reset the current question to the initial state
    score = 0; //reset the score to 0
    incorrectAnswers = []; //cleares the incorrect answers array to start again
    quizContainer.style.display = 'block'; //display the quiz container again to show question
    submitButton.style.display = 'inline-block';//again display the submit button to allow user
    retryButton.style.display = 'none';//hides the retry button as the quiz is again started
    resultContainer.innerHTML = ''; //clears the result to remove previous score
    displayQuestion(); //to show first question and start the quiz again
  }
  
  submitButton.addEventListener('click', checkAnswer); //the handler will triggered when specified event occurs on that element
  retryButton.addEventListener('click', retryQuiz);

  displayQuestion();