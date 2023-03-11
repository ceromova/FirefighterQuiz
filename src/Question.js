import React, { useState, useRef } from 'react';

const questions = [
  {
    question: ".-Según el manual de IVASPE, penetrar y progresar en ambientes con algún tipo de riesgo químico, se le conoce como:",
    choices: ["Buceo en humos", "Buceo químico", "Buceo tóxico", "Buceo en atmosfera de riesgo"],
    correctAnswerIndex: 1
  },
  {
    question: "- Según el manual del IVASPE, en caso de que suene la alarma acústica de reserva de aire del ERA:",
    choices: ["- El binomio deberá plantearse la salida de la zona caliente", "El bombero deberá plantearse la salida de la zona caliente y su binomio deberá esperar sin \
    avanzar la llegada de otro compañero para formar un nuevo binomio", "- El binomio deberá plantearse la salida de la zona caliente y su binomio continuará realizando el \
    trabajo", "El binomio esperará hasta apurar toda la botella"],
    correctAnswerIndex: 0
  },
  {
    question: " Según el manual del IVASPE, entre las consecuencias de una baja visibilidad no tendremos:",
    choices: ["Desorientación", "Caídas", "Agotamiento del ERA", "Todas las respuestas pueden ser consecuencias de una baja visibilidad"],
    correctAnswerIndex: 2
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
      <h2 className='Prueba'>{currentQuestion.question}</h2>
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
