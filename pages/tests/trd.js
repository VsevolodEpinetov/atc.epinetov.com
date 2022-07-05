/*eslint-disable*/
import React, { useState } from "react";
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
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Table from "components/Table/Table.js";
import Typography from '@material-ui/core/Typography';

import testsTrdPageStyle from "assets/jss/nextjs-material-kit-pro/pages/testsTrdPageStyle.js";

import Done from "@material-ui/icons/Done";
import DoneAll from "@material-ui/icons/DoneAll";
import Close from "@material-ui/icons/Close";

import { getAllTrdTestData } from 'lib/testTrd'


// auth
import { auth, firestore } from '../../lib/firebase';
import { UserContext } from '../../lib/context';

const useStyles = makeStyles(testsTrdPageStyle);

function shuffleArray(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function getRandomQuestionsFromData(testData, amountOfQuestions, chosenAreas) {
  let data = [
    [],
    [],
    [],
    [],
    [],
    []
  ]

  testData.forEach(q => {
    if (q.areas.join(',').indexOf(chosenAreas) > -1) data[q.chapter - 1].push(q)
  })

  for (let i = 0; i < data.length; i++) {
    data[i] = data[i].sort(() => 0.5 - Math.random()).slice(0, amountOfQuestions)
  }

  let questions = data[0].concat(data[1]).concat(data[2]).concat(data[3]).concat(data[4]).concat(data[5]);

  // Shuffle answer options
  questions.forEach(q => {
    q.answers = shuffleArray(q.answers)
  })

  return questions;
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

const generateRandomID = () => {
  const firstWord = [
    'Великолепный',
    'Умный',
    'Красивый',
    'Восхитительный',
    'Потрясающий',
    'Божественный',
    'Интересный',
    'Приятный',
    'Неподражаемый',
    'Артистичный',
    'Внимательный',
    'Активный',
    'Благородный',
    'Бесценный',
    'Бесподобный',
    'Блестящий',
    'Веселый',
    'Воспитанный',
    'Волшебный',
    'Гениальный',
    'Грандиозный',
    'Грамотный',
    'Достойный',
    'Дивный',
    'Душевный',
    'Доблестный',
    'Завидный',
    'Задорный',
    'Знаменитый',
    'Идеальный',
    'Искусный',
    'Компетентный',
    'Лучший',
    'Мудрый',
    'Настоящий',
    'Неотразимый',
    'Одаренный',
    'Обаятельный',
    'Ослепительный',
    'Окрыляющий',
    'Очаровательный',
    'Оптимистичный',
    'Отважный',
    'Первоклассный',
    'Позитивный',
    'Поразительный',
    'Рациональный',
    'Радушный',
    'Серъёзный',
    'Славный',
    'Талантливый',
    'Толковый',
    'Удачливый',
    'Уверенный',
    'Умный',
    'Успешный',
    'Усердный',
    'Ценный',
    'Честный',
    'Чуткий',
    'Шикарный',
    'Шедевральный',
    'Эффектный'
  ]
  const secondWord = [
    'Самолёт',
    'Диспетчер',
    'Старший',
    'Руководитель',
    'Экипаж',
    'Борт',
    'Фюзеляж',
    'Эшелон',
    'Вектор',
    'Азимут',
    'Документ',
    'Пульт',
    'Инструктор',
    'Взлёт',
    'План',
    'Рубеж',
    'Реверс',
    'Аэродром',
    'Аэропорт'
  ]

  const phrase = `${firstWord[Math.floor(Math.random()*firstWord.length)]}${secondWord[Math.floor(Math.random()*secondWord.length)]}${Math.floor(Math.random() * 1000)}`;
  return phrase;
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
    let correctAnswer = result.correctAnswer;
    if (result.correctAnswer.length > 1) {
      correctAnswer = '';
      result.correctAnswer.forEach((ca, id) => {
        correctAnswer += `${id + 1}. ${ca}<br/>`
      })
    }
    let userAnswer = result.userAnswer;
    if (result.userAnswer.length > 1) {
      userAnswer = '';
      result.userAnswer.forEach((ua, id) => {
        userAnswer += `${id + 1}. ${ua}<br/>`
      })
    }
    data.push([<span className={classForText}>{questionNumber}</span>, <span className={classForText}>{`${result.chapter}, ${result.paragraph}`}</span>, <span className={classForText}>{result.question}</span>, <span className={classForText} dangerouslySetInnerHTML={{ __html: `${correctAnswer}` }}></span>, <span className={classForText} dangerouslySetInnerHTML={{ __html: `${userAnswer}` }}></span>, <span className={classForText}><ResultIcon /></span>, `${result.pointsGot}`])
    questionNumber++;
  })
  return data;
}

export default function docsPage({ testData, userData }) {

  const { user } = useContext(UserContext);

  // ---------------------------------
  // Start of Quiz Variables and Handlers
  const [quiz, setQuiz] = React.useState([]);
  const [testId, setTestId] = React.useState([]);
  const [quizResults, setQuizResults] = React.useState([]);
  const [pts, setPts] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  // Resets current state of the quiz
  const resetQuiz = (amOfQuestions) => {
    setTestId(generateRandomID())
    setQuiz(getRandomQuestionsFromData(testData, amOfQuestions, chosenAreas));
    setCurrentQuestion(0);
    setPts(0);
    setQuizResults([]);
    setUserAnswers({
      "0": false,
      "1": false,
      "2": false,
      "3": false,
      "4": false,
      "5": false,
      "6": false,
      "7": false,
      "8": false,
      "9": false,
      "10": false,
      "11": false,
      "12": false,
      "13": false,
      "14": false,
      "15": false
    });
    setDisableAnswers(false);
    setTextColor({
      "0": '#3c4858',
      "1": '#3c4858',
      "2": '#3c4858',
      "3": '#3c4858',
      "4": '#3c4858',
      "5": '#3c4858',
      "6": '#3c4858',
      "7": '#3c4858',
      "8": '#3c4858',
      "9": '#3c4858',
      "10": '#3c4858',
      "11": '#3c4858',
      "12": '#3c4858',
      "13": '#3c4858',
      "14": '#3c4858',
      "15": '#3c4858'
    })



    document.getElementById('check-button') && document.getElementById('check-button').classList.remove('btn-disabled')

    let nextButton = document.getElementById('next-button');
    if (nextButton)
      if (!nextButton.classList.contains('btn-disabled'))
        nextButton.classList.add('btn-disabled')
  }

  const [disableAnswers, setDisableAnswers] = useState(false)

  const [userAnswers, setUserAnswers] = useState({
    "0": false,
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
    "8": false,
    "9": false,
    "10": false,
    "11": false,
    "12": false,
    "13": false,
    "14": false,
    "15": false
  });
  const handleChangeAnswers = index => {
    if (quiz[currentQuestion].choose == 'multiple') {
      setUserAnswers((prevState) => ({ ...prevState, [index]: !userAnswers[index] }));
    } else {
      let newAnswers = {
        "0": false,
        "1": false,
        "2": false,
        "3": false,
        "4": false,
        "5": false,
        "6": false,
        "7": false,
        "8": false,
        "9": false,
        "10": false,
        "11": false,
        "12": false,
        "13": false,
        "14": false,
        "15": false
      };
      newAnswers[event.target.value] = true;
      setUserAnswers(newAnswers);
    }
  }

  const [textColor, setTextColor] = useState({
    "0": '#3c4858',
    "1": '#3c4858',
    "2": '#3c4858',
    "3": '#3c4858',
    "4": '#3c4858',
    "5": '#3c4858',
    "6": '#3c4858',
    "7": '#3c4858',
    "8": '#3c4858',
    "9": '#3c4858',
    "10": '#3c4858',
    "11": '#3c4858',
    "12": '#3c4858',
    "13": '#3c4858',
    "14": '#3c4858',
    "15": '#3c4858'
  })


  const [amountOfQuestions, setAmountOfQuestions] = React.useState(5);
  const handleAmountOfQuestionsSelector = event => {
    setAmountOfQuestions(parseInt(event.target.value));
    resetQuiz(parseInt(event.target.value));
  };

  const [chosenAreas, setChosenAreas] = React.useState('approach,radar');
  const handleChosenAreas = event => {
    setChosenAreas(event.target.value);
    resetQuiz(parseInt(event.target.value));
  };

  const startAgain = (e) => {
    e.preventDefault();
    resetQuiz(amountOfQuestions);
  };

  // Initiate a quiz
  React.useEffect(() => {
    if (quiz.length == 0) {
      let randomQuiz = getRandomQuestionsFromData(testData, amountOfQuestions, chosenAreas);
      setQuiz(randomQuiz);
      setTestId(generateRandomID())
    }
  })
  // End of Quiz Variables and Handlers
  // ---------------------------------


  // ---------------------------------
  // Start of Quiz Functions
  const getRadioValue = (ua) => {
    let value;
    Object.values(ua).forEach(v => {
      if (v) value = v;
    })
    return value;
  }

  const checkAnswer = (e) => {
    let correctAnswer = quiz[currentQuestion].answers.map(answer => {
      return answer.correct;
    })

    setDisableAnswers(true);

    let userAnswer = Object.values(userAnswers).splice(0, quiz[currentQuestion].answers.length)
    let userAnswerInWords = [];
    userAnswer.forEach((a, id) => {
      if (a)  userAnswerInWords.push(quiz[currentQuestion].answers[id].answer)
    })

    setTextColor({
      "0": '#8c8f95',
      "1": '#8c8f95',
      "2": '#8c8f95',
      "3": '#8c8f95',
      "4": '#8c8f95',
      "5": '#8c8f95',
      "6": '#8c8f95',
      "7": '#8c8f95',
      "8": '#8c8f95',
      "9": '#8c8f95',
      "10": '#8c8f95',
      "11": '#8c8f95',
      "12": '#8c8f95',
      "13": '#8c8f95',
      "14": '#8c8f95',
      "15": '#8c8f95'
    })

    correctAnswer.forEach((ca, id) => {
      if (ca) {
        setTextColor((prevState) => ({ ...prevState, [id]: 'green' }))
      } else {
        if (userAnswer[id]) {
          setTextColor((prevState) => ({ ...prevState, [id]: 'red' }))
        }
      }
    })

    let pointsGot = 0;
    let correct = 0;
    let incorrect = 0;

    userAnswer.forEach((ua, id) => {
      if (ua) {
        if (correctAnswer[id])
          correct++;
        else
          incorrect++;
      }
    })

    let questionAmountOfTrues = 0;
    correctAnswer.forEach(ua => {
      if (ua) questionAmountOfTrues++;
    })

    pointsGot = correct / questionAmountOfTrues - incorrect / (quiz[currentQuestion].answers.length - questionAmountOfTrues);
    if (pointsGot < 0) pointsGot = 0;

    pointsGot = parseFloat(pointsGot.toFixed(1))

    let trues = [];
    quiz[currentQuestion].answers.forEach((answer, id) => {
      if (answer.correct) trues.push(answer.answer)
    })

    let newResults = quizResults;
    newResults.push({
      "question": quiz[currentQuestion].question,
      "chapter": quiz[currentQuestion].chapter,
      "paragraph": quiz[currentQuestion].paragraph,
      "correctAnswer": trues,
      "userAnswer": userAnswerInWords,
      "pointsGot": pointsGot
    })
    setQuizResults(newResults)

    let newPoints = pts + pointsGot;
    setPts(newPoints);

    document.getElementById('next-button').classList.remove('btn-disabled')
    document.getElementById('check-answer-button').classList.add('btn-disabled')
  }

  const nextQuestion = async (e) => {
    document.getElementById('next-button').classList.add('btn-disabled')
    document.getElementById('check-answer-button').classList.remove('btn-disabled')

    setUserAnswers({
      "0": false,
      "1": false,
      "2": false,
      "3": false,
      "4": false,
      "5": false,
      "6": false,
      "7": false,
      "8": false,
      "9": false,
      "10": false,
      "11": false,
      "12": false,
      "13": false,
      "14": false,
      "15": false
    });
    setCurrentQuestion(currentQuestion + 1);
    setDisableAnswers(false);
    setTextColor({
      "0": '#3c4858',
      "1": '#3c4858',
      "2": '#3c4858',
      "3": '#3c4858',
      "4": '#3c4858',
      "5": '#3c4858',
      "6": '#3c4858',
      "7": '#3c4858',
      "8": '#3c4858',
      "9": '#3c4858',
      "10": '#3c4858',
      "11": '#3c4858',
      "12": '#3c4858',
      "13": '#3c4858',
      "14": '#3c4858',
      "15": '#3c4858'
    })

    console.log(`currentQuestion: ${currentQuestion}`)
    console.log(`amountOfQuestions: ${amountOfQuestions}`)

    if (currentQuestion + 1 === amountOfQuestions * 6) {
      if (user) {
        const userRef = firestore.collection('users').doc(auth.currentUser.uid);
        const obj = {
          results: quizResults,
          timestamp: Date.now(),
          totalPointsGot: pts,
          totalPoints: quizResults.length
        }
        console.log(obj)
        await userRef.collection('testsTrd').add(obj);
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
                Тестирование по ТРД АузДЦ. При проверке <span style={{color: 'green'}}>зелёным</span> цветом отмечены правильные варианты ответа, а <span style={{color: 'red'}}>красным</span> - неверно выбранные варианты. В зависимости от степени верности ответов начисляются баллы. В самом конце будет показана сводная таблица с результатами. 
              </h5>
              <h5 className={classes.description}>Большое спасибо за помощь в составлении вопросов в алфавитном порядке: Колосов Илья, Лозовик Валентин, Пожитнов Максим, Поляков Даня, Поляков Лёша, Потапов Саша.</h5>
              <h6 className={classes.description}>
                id: {testId}
              </h6>
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
                  Количество вопросов из каждого раздела
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
                    Количество вопросов из каждого раздела
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="1"
                  >
                    1
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
              md={6}
              className={classes.mlAuto + " " + classes.mrAuto + ' margin-bottom-fix'}
              style={{ marginBottom: '3em !important' }}
              key='test-trd-settings-areas'
            >
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="simple-select"
                  className={classes.selectLabel}
                >
                  Сектор
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={chosenAreas}
                  onChange={handleChosenAreas}
                  inputProps={{
                    name: "handleChosenAreasSelector",
                    id: "areas-selector"
                  }}
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                  >
                    Сектор
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="approach"
                  >
                    ДПП
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="radar"
                  >
                    ДПК
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="approach,radar"
                  >
                    ДПП+ДПК
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
                    <p className='test-question-trd' dangerouslySetInnerHTML={{ __html: `${quiz[currentQuestion].question}` }}></p>
                    <p className='test-answer' id='test-answer' dangerouslySetInnerHTML={{ __html: `Раздел: ${quiz[currentQuestion].chapter}` }}></p>
                  </GridItem>

                  <GridItem
                    md={12}
                    sm={12}
                    className={classes.mlAuto + " " + classes.mrAuto + " " + classes.mb3em + " " + classes.textCenter}
                    key='answer-field'
                  >
                    {
                      quiz[currentQuestion].choose == 'multiple' &&
                      <FormControl component="fieldset" className={classes.formControl + " " + classes.textLeft}>
                        <FormGroup>
                          {quiz[currentQuestion].answers.map((answerOption, index) => (
                            <div className={classes.root}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={userAnswers[index]}
                                    disabled={disableAnswers}
                                    onChange={() => handleChangeAnswers(index)}
                                    name={`answer-field-${index}`}
                                    style={{
                                      marginBottom: '3px'
                                    }}
                                  />
                                }
                                label={<Typography style={{ color: textColor[index], fontSize: '1.2rem' }}>{answerOption.answer}</Typography>}
                                className={'answer-option-for-trd'}
                              />
                            </div>
                          ))}
                        </FormGroup>
                      </FormControl>
                    }
                    {
                      quiz[currentQuestion].choose == 'one' &&
                      <GridItem
                        md={6}
                        sm={12}
                        className={classes.mlAuto + " " + classes.mrAuto + " " + classes.textCenter}
                        key={`answer-${currentQuestion}`}
                      >
                        <FormControl component="fieldset" className={classes.formControl + " " + classes.textLeft}>
                          <RadioGroup aria-label="answers-options" name="answers-options" value={getRadioValue(userAnswers)} onChange={handleChangeAnswers}>
                            {quiz[currentQuestion].answers.map((answerOption, index) => (
                              <FormControlLabel
                                control={<Radio />}
                                disabled={disableAnswers}
                                value={`${index}`}
                                label={<Typography style={{ color: textColor[index], fontSize: '1.2rem' }}>{answerOption.answer}</Typography>}
                                className={'answer-option-for-trd'}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </GridItem>
                    }
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
                    tableHead={["#", "Раздел", "Вопрос", "Верный ответ", "Твой ответ", "Результат", "Баллы"]}
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
  const testData = getAllTrdTestData()
  return {
    props: {
      testData
    }
  }
}