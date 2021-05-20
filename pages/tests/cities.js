/*eslint-disable*/
import React from "react";
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Footer from "components/Footer/Footer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Chip from '@material-ui/core/Chip';

import citiesPageStyle from "assets/jss/nextjs-material-kit-pro/pages/citiesPageStyle.js";

import Search from "@material-ui/icons/Search";

import { getAllCitiesTestData } from 'lib/cities'

const useStyles = makeStyles(citiesPageStyle);


function getRandomQuestionsFromData(testData, amountOfQuestions, areas) {
  const dataWithCertainAreas = testData.filter(airport => areas.includes(airport.area.icao.eng))
  const data = dataWithCertainAreas.sort(() => 0.5 - Math.random()).slice(0, amountOfQuestions)
  let questions = [];
  data.forEach(city => {
    questions.push({
      "question": city.name,
      "answer": [city.icao.rus, city.icao.eng]
    })
  })

  return questions;
}


function getPhraseForTestResults (goal, result) {
  const mark = parseInt(result) / parseInt(goal);
  let message = '';
  if (mark == 0) message = '🙈'
  if (mark > 0.3) message = 'Не то, чтобы прям плохо, но есть куда стремиться 🌚'
  if (mark >= 0.6) message = 'В целом неплохо, но ты точно можешь лучше! 💪'
  if (mark >= 0.8) message = 'Так держать, горжусь тобой! 🥰'
  if (mark == 1) message = 'Вау, ты верно назвал абсолютно всё. Чемпион! 🥇'

  return message;
}

export default function docsPage({ testData }) {

  const [quiz, setQuiz] = React.useState([]);
  const [pts, setPts] = React.useState(0);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const [hint, setHint] = React.useState('Подсказка');
  const [hintColor, setHintColor] = React.useState('info');

  const [textFieldValidationSuccess, setTextFieldValidationSuccess] = React.useState(false);
  const [textFieldValidationError, setTextFieldValidationError] = React.useState(false);


  const [amountOfQuestions, setAmountOfQuestions] = React.useState(5);
  const [simpleSelect, setSimpleSelect] = React.useState("5");
  const handleAmountOfQuestionsSelector = event => {
    setAmountOfQuestions(parseInt(event.target.value));
    setCurrentQuestion(0);
    setPts(0);
    setQuiz(getRandomQuestionsFromData(testData, parseInt(event.target.value), areas));
    setHint('Подсказка');
    setHintColor('info');
    document.getElementById('hint-button') && document.getElementById('hint-button').classList.remove('btn-disabled')
    document.getElementById('check-button') && document.getElementById('check-button').classList.remove('btn-disabled')
    if (document.getElementById('answer-field')) {
      document.getElementById('answer-field').value = '';
      document.getElementById('answer-field').disabled = false;
    }
    setTextFieldValidationError(false);
    setTextFieldValidationSuccess(false);
  };

  const [areas, setAreas] = React.useState(["UH", "UE", "UI", "UN", "UO", "UW", "US", "UU"]);
  const handleAreasSelector = event => {
    setAreas(event.target.value);
    setCurrentQuestion(0);
    setPts(0);
    setQuiz(getRandomQuestionsFromData(testData, amountOfQuestions, event.target.value));
    setHint('Подсказка');
    setHintColor('info');
    document.getElementById('hint-button') && document.getElementById('hint-button').classList.remove('btn-disabled')
    document.getElementById('check-button') && document.getElementById('check-button').classList.remove('btn-disabled')
    if (document.getElementById('answer-field')) {
      document.getElementById('answer-field').value = '';
      document.getElementById('answer-field').disabled = false;
    }
    setTextFieldValidationError(false);
    setTextFieldValidationSuccess(false);
  };

  React.useEffect(() => {
    if (quiz.length == 0) setQuiz(getRandomQuestionsFromData(testData, amountOfQuestions, areas));
  })

  const checkAnswer = (e) => {
    let userAnswer = document.getElementById('answer-field').value.toUpperCase();

    if (userAnswer.length === 4) {

      document.getElementById('hint-button').classList.add('btn-disabled');
      document.getElementById('answer-field').disabled = true;
      document.getElementById('next-button').classList.remove('btn-disabled');

      quiz[currentQuestion].answer.includes(userAnswer) ? setTextFieldValidationSuccess(true) : setTextFieldValidationError(true)

    }
  }

  const nextQuestion = (e) => {
    let userAnswer = document.getElementById('answer-field').value.toUpperCase();

    if (quiz[currentQuestion].answer.includes(userAnswer)) {
      switch (hint) {
        case 'Подсказка':
          setPts(pts + 1);
          break;
        case 'Ещё плз':
          setPts(pts + 0.5);
          break;
        case 'Весь ответ 🙏':
          setPts(pts + 0.25);
          break;
      }
    }

    setHint('Подсказка');
    setHintColor('info');
    document.getElementById('hint-button').classList.remove('btn-disabled')
    document.getElementById('next-button').classList.add('btn-disabled')
    document.getElementById('answer-field').value = '';
    setTextFieldValidationError(false);
    setTextFieldValidationSuccess(false);
    document.getElementById('answer-field').disabled = false;
    setCurrentQuestion(currentQuestion + 1);
  }

  const enterHint = (e) => {
    switch (hint) {
      case 'Подсказка':
        document.getElementById('answer-field').value = quiz[currentQuestion].answer[0].substring(0, 2);
        setHint('Ещё плз');
        setHintColor('warning');
        break;
      case 'Ещё плз':
        document.getElementById('answer-field').value = quiz[currentQuestion].answer[0].substring(0, 3);
        setHint('Весь ответ 🙏');
        setHintColor('danger');
        break;
      case 'Весь ответ 🙏':
        document.getElementById('answer-field').value = quiz[currentQuestion].answer[0];
        document.getElementById('answer-field').disabled = true;
        setHint('Всё!');
        document.getElementById('hint-button').classList.add('btn-disabled');
        document.getElementById('next-button').classList.remove('btn-disabled');
        break;
    }
  }

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
              <h2 className={classes.title}>Тестирование. Аэропорты России</h2>
              <h5 className={classes.description}>
                Тестирование на знание 4-буквенных обозначений ICAO аэропортов в разных городах России. По-умолчанию запущено тестирование из 5 вопросов. За каждый верный ответ без использования подсказок даётся 1 балл. Первая подсказка открывает первые 2 буквы (так как первая - всегда У, как ни парадоксально), вторая - третью, третья подсказка показывает всё обозначение целиком. При использовании подсказок за верный ответ даётся меньше баллов: 0.5, 0.25 и 0 соответственно.
              </h5>
              <h5 className={classes.description}>
                Обозначения можно вводить как на кириллице, так и на латинице любым регистром (строчным/заглавным). После ввода 4 символов проверка проводится автоматически, для перехода к следующему вопросу используй кнопку "Дальше".
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
              md={6}
              className={classes.mlAuto + " " + classes.mrAuto + ' margin-bottom-fix'}
              key='test-cities-settings-areas'
            >
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="multiple-select"
                  className={classes.selectLabel}
                >
                  Зоны
                    </InputLabel>
                <Select
                  multiple
                  value={areas}
                  onChange={handleAreasSelector}
                  MenuProps={{
                    className: classes.selectMenu,
                    classes: { paper: classes.selectPaper }
                  }}
                  classes={{ select: classes.select }}
                  inputProps={{
                    name: "areasSelector",
                    id: "areas-selector"
                  }}
                  /*renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}*/
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                  >
                    Зоны
                      </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelectedMultiple
                    }}
                    value="UH"
                  >
                    Хабаровский РЦ
                      </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelectedMultiple
                    }}
                    value="UE"
                  >
                    Якутский РЦ
                      </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelectedMultiple
                    }}
                    value="UI"
                  >
                    Иркутский РЦ
                      </MenuItem>
                      <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelectedMultiple
                    }}
                    value="UN"
                  >
                    Новосибирский  РЦ
                      </MenuItem>
                      <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelectedMultiple
                    }}
                    value="UO"
                  >
                    Норильский  РЦ
                      </MenuItem>
                      <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelectedMultiple
                    }}
                    value="UW"
                  >
                    Самарский  РЦ
                      </MenuItem>
                      <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelectedMultiple
                    }}
                    value="US"
                  >
                    Екатеринбургский  РЦ
                      </MenuItem>
                      <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelectedMultiple
                    }}
                    value="UU"
                  >
                    Московский РЦ
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
                  </GridItem>

                  <GridItem
                    md={12}
                    className={classes.mlAuto + " " + classes.mrAuto}
                    key='13'
                  >
                    <CustomInput
                      id="answer-field"
                      inputProps={{
                        placeholder: "Ответ"
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                      success={textFieldValidationSuccess}
                      error={textFieldValidationError}
                      onChange={checkAnswer}
                    />
                  </GridItem>
                  <GridItem
                    md={6}
                    className={classes.mlAuto + " " + classes.mrAuto}
                    key='16'
                  >
                    <Button color={hintColor} size="sm" fullWidth onClick={enterHint} id='hint-button'>
                      {hint}
                    </Button>
                  </GridItem>
                  <GridItem
                    md={6}
                    className={classes.mlAuto + " " + classes.mrAuto}
                    key='17'
                  >
                    <Button color="primary" size="sm" fullWidth onClick={nextQuestion} id='next-button' className='btn-disabled'>
                      Дальше
                    </Button>
                  </GridItem>

                </GridContainer>
              }
              {currentQuestion == quiz.length &&
                <>
                  <p className='test-results' dangerouslySetInnerHTML={{ __html: `Из ${quiz.length} возможных баллов ты получил ${pts}.` }}></p>
                  <p className='test-results-substring' dangerouslySetInnerHTML={{ __html: `${getPhraseForTestResults(quiz.length, pts)}` }}></p>
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
  const testData = getAllCitiesTestData()
  return {
    props: {
      testData
    }
  }
}