import React, { useState, useRef, useMemo } from 'react';
import Motivation from "./Motivation.json"

const randomIndex = (q) => Math.floor(Math.random()*q.length)

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Quiz = ({questions, numQuestions = 10}) => {
  const [questionIndex, setQuestionIndex] = useState(0); /* Initial question */
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [score, setScore] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState();

  const randomQuestions = useMemo(() => shuffle([...questions]).slice(0, numQuestions), [questions, numQuestions]);

  const randomQuestion = useRef([...randomQuestions]); /* ... hace una copia del nuevo array con todos los elementos del anterior array */

  const handleAnswerSelection = (index) => {
    setSelectedAnswer(index);
  };

  const loadNextQuestion = (isCorrect) => {
    setScore(isCorrect ? score + 1 : score)
    randomQuestion.current.splice(questionIndex, 1)
    setSelectedAnswer(-1);
    setQuestionIndex(randomIndex(randomQuestion.current));
  }

  const handleNextQuestion = () => {
    if (correctAnswer) {
      setCorrectAnswer()
      loadNextQuestion(false)
      return
    }

    const questionPool = randomQuestion.current[questionIndex]
    const isCorrect = selectedAnswer === questionPool.correctAnswerIndex

    if (!isCorrect) {
      setCorrectAnswer(questionPool.choices[questionPool.correctAnswerIndex])
    } else {
      loadNextQuestion(true)
    }
  };

  const currentQuestion = randomQuestion.current[questionIndex];

  const answers = useMemo(() => {
    return currentQuestion?.choices.reduce((cc, answer, realindex) => {
      const index = Math.floor(Math.random()*cc.indexes.length)

      cc.array[cc.indexes[index]] = {answer, index:realindex}
      cc.indexes.splice(index, 1)

      return cc

    }, { indexes:Array.from([...Object.keys(currentQuestion.choices)]), array: new Array(currentQuestion.choices.length)})
  }, [currentQuestion]) 

  if (!currentQuestion) {
    return (
      <>
        Tu puntuación es de: {score}
        <div>
          {Motivation[randomIndex(Motivation)]}
        </div>
      </>
    );
  }

  return (
    <div style={{alignSelf:"start"}}>
      <h2 className='Header'>{currentQuestion.question}</h2>
      {answers.array.map(({index, answer}) => (
        <div key={index} onClick={() => handleAnswerSelection(index)}>
          <input type="radio" name="answer" checked={index === selectedAnswer} />
          <label>{answer}</label>
        </div>
      ))}
      <button disabled={selectedAnswer === -1} onClick={handleNextQuestion}>
        {correctAnswer ? "Siguiente pregunta" : "Validar"}
      </button>
      {correctAnswer && (
        <div className='Answer'>
          La respuesta correcta es: {correctAnswer}
        </div>
      )}
    </div>
  );
};

export default Quiz;
