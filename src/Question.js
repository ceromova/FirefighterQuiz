import React, { useState, useRef } from 'react';

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Madrid", "Berlin"],
    correctAnswerIndex: 0
  },
  {
    question: "What is the largest ocean?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswerIndex: 3
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Kilimanjaro", "Everest", "Fuji", "Matterhorn"],
    correctAnswerIndex: 1
  }
];

const randomIndex = (q) => Math.floor(Math.random()*q.length)

const Quiz = () => {
  const [questionIndex, setQuestionIndex] = useState(randomIndex(questions)); /* Initial question */
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [score, setScore] = useState(0);
  const randomQuestion = useRef([...questions]); /* ... hace una copia del nuevo array con todos los elementos del anterior array */

  const handleAnswerSelection = (index) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    setScore(selectedAnswer === randomQuestion.current[questionIndex].correctAnswerIndex ? score+1 : score)
    randomQuestion.current.splice(questionIndex,1)
    // console.log(randomQuestion.current)
    setSelectedAnswer(-1);
    setQuestionIndex(randomIndex(randomQuestion.current));
  };

  const currentQuestion = randomQuestion.current[questionIndex];

  if (!currentQuestion){
    return <>Tu puntuacion es de: {score}</>
  }


  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.choices.map((choice, index) => (
        <div key={index} onClick={() => handleAnswerSelection(index)}>
          <input type="radio" name="answer" checked={index === selectedAnswer} />
          <label>{choice}</label>
        </div>
      ))}
      <button disabled={selectedAnswer === -1} onClick={handleNextQuestion}>
        Next Question
      </button>
    </div>
  );
};

export default Quiz;
