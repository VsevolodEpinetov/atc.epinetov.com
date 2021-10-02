/*eslint-disable*/
import React from "react";
import { useContext } from "react";
import Link from 'next/link'
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Footer from "components/Footer/Footer.js";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Table from "components/Table/Table.js";
import PropTypes from 'prop-types';

import Slider from '@material-ui/core/Slider';

import testsAircraftPageStyle from "assets/jss/nextjs-material-kit-pro/pages/testsAircraftPageStyle.js";

import Done from "@material-ui/icons/Done";
import DoneAll from "@material-ui/icons/DoneAll";
import Close from "@material-ui/icons/Close";

import { getAllAircraftTestData } from 'lib/testAircraft'


// auth
import { auth, firestore } from '../../lib/firebase';
import { UserContext } from '../../lib/context';

const useStyles = makeStyles(testsAircraftPageStyle);

function valueLabelFormat(value) {
  return `FL${value}`;
}

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

function getRandomQuestionsFromData(testData, amountOfQuestions) {
  /*const data = testData.sort(() => 0.5 - Math.random()).slice(0, amountOfQuestions)
  let questions = [];
  data.forEach(aircraft => {
    questions.push({
      question: aircraft.name.plain,
      answers: {
        engines: {
          number: aircraft.specs.engines.quantity,
          type: aircraft.specs.engines.type,
        },
        ceiling: aircraft.specs.ceiling.fl,
        speed: aircraft.specs.speed.cruising.kmh,
        category: category
      }
    })
  })*/
  let questions = [{
    "question": "Пример вопроса №1",
    "choose": "one",
    "answers": [
        {
          "answer": "Это неверный ответ",
          "correct": false
        },
        {
          "answer": "Это тоже неверный ответ",
          "correct": false
        },
        {
          "answer": "Это правильный ответ!",
          "correct": true
        }
      ]
    },
    {
      "question": "Пример вопроса №2",
      "choose": "one",
      "answers": [
        {
          "answer": "Это неверный ответ",
          "correct": false
        },
        {
          "answer": "Это правильный ответ :)",
          "correct": true
        },
        {
          "answer": "Это тоже неверный ответ, но пониже",
          "correct": false
        }
      ]
    }
  ]

  return questions;
}

const getTextForAnswer = (answers) => {
  let correct = [];
  answers.forEach(answer => {
    if (answer.correct) correct.push(answer);
  })
  return correct;
}

function getPhraseForTestResults(goal, result) {
  const mark = parseInt(result) / parseInt(goal);
  let message = '🙈';
  if (mark > 0.3) message = 'Не то, чтобы прям плохо, но есть куда стремиться 🌚'
  if (mark >= 0.6) message = 'В целом неплохо, но ты точно можешь лучше! 💪'
  if (mark >= 0.8) message = 'Так держать, горжусь тобой! 🥰'
  if (mark >= 1) message = 'Вау, ты верно назвал абсолютно всё. Чемпион! 🥇'

  return message;
}

function getTableWithResults(results) {
  let data = [];
  let questionNumber = 1;
  results.forEach(result => {
    let classForText = 'textOrange';
    let ResultIcon = Done;
    if (result.pointsGot === 1) {
      classForText = 'textGreen'
      ResultIcon = DoneAll;
    }
    if (result.pointsGot === 0) {
      classForText = 'textRed'
      ResultIcon = Close;
    }
    let correctAnswer = `L${result.correctAnswer.engines.number}${result.correctAnswer.engines.type}, ${result.correctAnswer.category}, ${result.correctAnswer.speed} км/ч, FL${result.correctAnswer.ceiling}`
    let userAnswer = `L${result.userAnswer.engines.number}${result.userAnswer.engines.type}, ${result.userAnswer.category}, ${result.userAnswer.speed} км/ч, FL${result.userAnswer.ceiling}`
    data.push([<span className={classForText}>{questionNumber}</span>, <span className={classForText}>{result.question}</span>, <span className={classForText}>{correctAnswer}</span>, <span className={classForText}>{userAnswer}</span>, <span className={classForText}><ResultIcon /></span>, `${result.pointsGot}`])
    questionNumber++;
  })
  return data;
}

export default function docsPage({ testData, userData }) {

  const { user } = useContext(UserContext);



  // ---------------------------------
  // Start of Quiz Variables and Handlers
  const [quiz, setQuiz] = React.useState([]);
  const [quizResults, setQuizResults] = React.useState([]);
  const [pts, setPts] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  // Resets current state of the quiz
  const resetQuiz = (amOfQuestions) => {
    setQuiz(getRandomQuestionsFromData(testData, amOfQuestions));
    setCurrentQuestion(0);
    setPts(0);
    setQuizResults([]);

    document.getElementById('check-button') && document.getElementById('check-button').classList.remove('btn-disabled')

    let testAnswer = document.getElementById('test-answer');
    if (testAnswer)
      if (!testAnswer.classList.contains('is-hidden'))
        testAnswer.classList.add('is-hidden')

    let nextButton = document.getElementById('next-button');
    if (nextButton)
      if (!nextButton.classList.contains('btn-disabled'))
        nextButton.classList.add('btn-disabled')
  }

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      alert("the answer is correct!");
    }
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
  };

  const [amountOfQuestions, setAmountOfQuestions] = React.useState(5);
  const handleAmountOfQuestionsSelector = event => {
    setAmountOfQuestions(parseInt(event.target.value));
    resetQuiz(parseInt(event.target.value));
  };


  const startAgain = (e) => {
    e.preventDefault();
    resetQuiz(amountOfQuestions);
  };

  // Initiate a quiz
  React.useEffect(() => {
    if (quiz.length == 0) setQuiz(getRandomQuestionsFromData(testData, amountOfQuestions));
  })
  // End of Quiz Variables and Handlers
  // ---------------------------------


  // ---------------------------------
  // Start of Quiz Functions
  const checkAnswer = (e) => {
    let userAnswer = {
      engines: {
        number: numberOfEngines,
        type: typeOfEngines
      },
      category: typeOfAircraft,
      ceiling: ceiling,
      speed: speed
    }

    let pointsGot = 0;

    setNumberOfEnginesSelectorIsDisabled(true);
    if (userAnswer.engines.number === quiz[currentQuestion].answers.engines.number) {
      pointsGot += 0.2
    } else {
      setNumberOfEnginesSelectorError(true);
    }

    setTypeOfEnginesSelectorIsDisabled(true);
    if (userAnswer.engines.type === quiz[currentQuestion].answers.engines.type) {
      pointsGot += 0.2
    } else {
      setTypeOfEnginesSelectorError(true);
    }

    setTypeOfAircraftSelectorIsDisabled(true);
    if (userAnswer.category === quiz[currentQuestion].answers.category) {
      pointsGot += 0.2
    } else {
      setTypeOfAircraftSelectorError(true);
    }

    setSpeedIsDisabled(true);
    if (quiz[currentQuestion].answers.speed + 50 > userAnswer.speed && userAnswer.speed > quiz[currentQuestion].answers.speed - 50) {
      pointsGot += 0.2
      setSpeedSliderColor(colorsForSliders.correctAnswer);
      document.getElementById('speed-label').classList.add('textGreen');
    } else {
      setSpeedSliderColor(colorsForSliders.wrongAnswer);
      document.getElementById('speed-label').classList.add('textRed');
    }

    setCeilingIsDisabled(true);
    if (quiz[currentQuestion].answers.ceiling + 30 > userAnswer.ceiling && userAnswer.ceiling > quiz[currentQuestion].answers.ceiling - 30) {
      pointsGot += 0.2
      setCeilingSliderColor(colorsForSliders.correctAnswer);
      document.getElementById('ceiling-label').classList.add('textGreen');
    } else {
      setCeilingSliderColor(colorsForSliders.wrongAnswer);
      document.getElementById('ceiling-label').classList.add('textRed');
    }

    pointsGot = parseFloat(pointsGot.toFixed(1))

    let newResults = quizResults;
    newResults.push({
      "question": quiz[currentQuestion].question,
      "correctAnswer": quiz[currentQuestion].answers,
      "userAnswer": userAnswer,
      "pointsGot": pointsGot
    })
    setQuizResults(newResults)

    let newPoints = pts + pointsGot;
    setPts(newPoints);

    document.getElementById('next-button').classList.remove('btn-disabled')
    document.getElementById('check-answer-button').classList.add('btn-disabled')

    document.getElementById('test-answer').classList.remove('is-hidden')

  }

  const nextQuestion = async (e) => {
    document.getElementById('test-answer').classList.add('is-hidden')

    setCurrentQuestion(currentQuestion + 1);

    if (currentQuestion + 1 === amountOfQuestions) {
      if (user) {
        const userRef = firestore.collection('users').doc(auth.currentUser.uid);
        let obj = {
          results: quizResults,
          timestamp: Date.now(),
          totalPointsGot: pts,
          totalPoints: quizResults.length
        }
        await userRef.collection('testsAircraft').add(obj);
      }
    }
  }

  // ---------------------------------
  // End of Quiz Functions

  const classes = useStyles();
  return (
    <div>
      <Header
        links={<HeaderLinks dropdownHoverColor="dark" />}
        color="transparent"
      />
      <div className={classes.projects}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={12}
              className={classes.mlAuto + " " + classes.mrAuto}
              key='test-cities-header'
            >
              <h2 className={classes.title}>Тестирование. ТРД</h2>
              <h5 className={classes.description}>
                Текстик бы написать
              </h5>
            </GridItem>
            <GridItem
              md={6}
              className={classes.mlAuto + " " + classes.mrAuto + ' margin-bottom-fix'}
              style={{ marginBottom: '3em !important' }}
              key='test-cities-settings-number'
            >
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel}
                >
                  Количество вопросов
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={amountOfQuestions}
                  onChange={handleAmountOfQuestionsSelector}
                  inputProps={{
                    name: "handleAmountOfQuestionsSelector",
                    id: "amount-of-questions-selector"
                  }}
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                  >
                    Количество вопросов
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="5"
                  >
                    5
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="10"
                  >
                    10
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="20"
                  >
                    20
                  </MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem
              md={12}
              className={classes.mlAuto + " " + classes.mrAuto}
              style={{ marginBottom: '3em !important' }}
              key='test-cities-body'
            >
              {quiz[currentQuestion] &&

                <GridContainer>
                  <GridItem
                    md={12}
                    className={classes.mlAuto + " " + classes.mrAuto}
                    key='12'
                  >
                    <p className='test-step' dangerouslySetInnerHTML={{ __html: `${currentQuestion + 1}/${quiz.length}` }}></p>
                    <p className='test-question' dangerouslySetInnerHTML={{ __html: `${quiz[currentQuestion].question}` }}></p>
                    <p className='test-answer is-hidden' id='test-answer' dangerouslySetInnerHTML={{ __html: `${getTextForAnswer(quiz[currentQuestion].answers)}` }}></p>
                  </GridItem>

                  <GridItem
                    md={12}
                    sm={12}
                    className={classes.mlAuto + " " + classes.mrAuto + " " + classes.mb3em}
                    key='answer-field'
                  >
                    {quiz[currentQuestion].answers.map((answerOption, index) => (
                      <button onClick={() => handleAnswerButtonClick(answerOption.correct)}>{answerOption.answer}</button>
                    ))}
                  </GridItem>

                  <GridItem
                    md={6}
                    className={classes.mlAuto + " " + classes.mrAuto}
                    key='check-answer-button'
                  >
                    <Button color='info' size="sm" fullWidth onClick={checkAnswer} id='check-answer-button'>
                      Проверить
                    </Button>
                  </GridItem>
                  <GridItem
                    md={6}
                    className={classes.mlAuto + " " + classes.mrAuto}
                    key='next-button'
                  >
                    <Button color="primary" size="sm" fullWidth onClick={nextQuestion} id='next-button' className='btn-disabled'>
                      Дальше
                    </Button>
                  </GridItem>

                </GridContainer>
              }
              {currentQuestion == quiz.length &&
                <>
                  <p className='test-results'>Из {quiz.length} возможных баллов ты получил {pts}.</p>
                  <p className='test-results-substring'>{getPhraseForTestResults(quiz.length, pts)}</p>
                  <Table
                    striped
                    tableHead={["#", "ВС", "Верный ответ", "Твой ответ", "Результат", "Баллы"]}
                    tableData={getTableWithResults(quizResults)}
                  />
                  <Button color="primary" size="sm" fullWidth onClick={startAgain} id='start-again'>
                    Давай по новой
                  </Button>
                </>
              }
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const testData = getAllAircraftTestData()
  return {
    props: {
      testData
    }
  }
}