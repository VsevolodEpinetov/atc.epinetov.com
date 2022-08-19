/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Footer from "components/Footer/Footer.js";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import CustomInput from "components/CustomInput/CustomInput.js";

import { getAllAircraftData } from 'lib/aircraft'


import style from "assets/jss/nextjs-material-kit-pro/pages/aircraftPageStyle.js";
import PageHeader from "../components/PageHeader/PageHeader";
import AircraftCard from "../components/AircraftCard/AircraftCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(style);

export default function AircraftPage({ allAircraftData }) {
  //const [modals, setModalsState] = React.useState({});
  const [aircraftThumbnailIsShown, setAircraftThumbnailIsShown] = React.useState(() => {
    var object = {};
    allAircraftData.forEach(({ aircraftName }) => {
      object[aircraftName] = 'block';
    })
    return object;
  });
  const [filterByWeightState, setFilterByWeightState] = React.useState("");
  const [filterByNameState, setFilterByNameState] = React.useState("");

  function showAircraftThumbnail(aircraft) {
    setAircraftThumbnailIsShown((prevState) => ({ ...prevState, [aircraft]: '' }));
  }
  function hideAircraftThumbnail(aircraft) {
    setAircraftThumbnailIsShown((prevState) => ({ ...prevState, [aircraft]: 'filtered' }));
  }

  const filterAircraftByWeight = event => {
    setFilterByWeightState(event.target.value);
    handleAircraftFilters(event.target.value, filterByNameState);
  };

  const filterAircraftByName = event => {
    setFilterByNameState(event.target.value.toLowerCase());
    handleAircraftFilters(filterByWeightState, event.target.value.toLowerCase());
  };


  function handleAircraftFilters(weightType, searchString) {
    allAircraftData.forEach(aircraft => {
      let needToHide = false;
      if (searchString.length >= 2) {
        if (aircraft.aircraftInfo.name.plain.toLowerCase().includes(searchString)) {
          switch (weightType) {
            case 'heavy':
              if (aircraft.aircraftInfo.specs.maxTakeOffWeight.kg < 136000) needToHide = true;
              break;
            case 'medium':
              if (aircraft.aircraftInfo.specs.maxTakeOffWeight.kg > 136000) needToHide = true;
              break;
          }
        } else {
          needToHide = true;
        }
      } else {
        switch (weightType) {
          case 'heavy':
            if (aircraft.aircraftInfo.specs.maxTakeOffWeight.kg < 136000) needToHide = true;
            break;
          case 'medium':
            if (aircraft.aircraftInfo.specs.maxTakeOffWeight.kg > 136000) needToHide = true;
            break;
        }
      }

      if (needToHide) hideAircraftThumbnail(aircraft.aircraftName)
      else showAircraftThumbnail(aircraft.aircraftName)
    })

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
            <PageHeader 
              title='Воздушные суда'
              description={[
                'Список наиболее часто встречающихся при ОВД воздушных судов. На страничке каждого ВС имеются ранги некоторых характеристик. Очень важно понимать, что значения характеристик (а значит, и баллов) - это частные случаи, которые можно ожидать от ВС в большинстве случаев. На практике все значения зависят от состояния ВС, экипажа, погоды, времени года и прочих факторов. Список будет полезен в основном тем, кто очень плохо разбирается в ВС и с чем их едят :)',
                <>Информация взята с различных источников: от <a href="https://ru.wikipedia.org/wiki/%D0%92%D0%BE%D0%B7%D0%B4%D1%83%D1%88%D0%BD%D0%BE%D0%B5_%D1%81%D1%83%D0%B4%D0%BD%D0%BE">Википедии</a> до знаний опытных диспетчеров</>
              ]}
            />
            <GridItem
              md={6}
              className={classes.mlAuto + " " + classes.mrAuto}
              style={{ marginBottom: '3em !important' }}
            >
              <FormControl fullWidth className={classes.selectFormControl}>
                <InputLabel
                  htmlFor="filter-by-weight"
                  className={classes.selectLabel}
                >
                  По весу
                </InputLabel>
                <Select
                  MenuProps={{
                    className: classes.selectMenu
                  }}
                  classes={{
                    select: classes.select
                  }}
                  value={filterByWeightState}
                  onChange={filterAircraftByWeight}
                  inputProps={{
                    name: "filterByWeightState",
                    id: "filter-by-wight"
                  }}
                >
                  <MenuItem
                    disabled
                    classes={{
                      root: classes.selectMenuItem
                    }}
                  >
                    По весу
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="all"
                  >
                    Все
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="medium"
                  >
                    Средние
                  </MenuItem>
                  <MenuItem
                    classes={{
                      root: classes.selectMenuItem,
                      selected: classes.selectMenuItemSelected
                    }}
                    value="heavy"
                  >
                    Тяжёлые
                  </MenuItem>
                </Select>
              </FormControl>
            </GridItem>
            <GridItem
              md={6}
              className={classes.mlAuto + " " + classes.mrAuto}
              style={{ marginBottom: '3em !important' }}
            >
              <CustomInput
                inputRootCustomClasses={classes.inputRootCustomClasses}
                formControlProps={{
                  className: classes.formControl
                }}
                inputProps={{
                  placeholder: "Фильтр по названию",
                  inputProps: {
                    "aria-label": "Поиск",
                    className: classes.searchInput
                  }
                }}
                value={filterByWeightState}
                onChange={filterAircraftByName}
                fullWidth
              />
            </GridItem>
            { 
              allAircraftData.map(({ aircraftName, aircraftInfo }) => (
                <AircraftCard 
                  aircraftName={aircraftName}
                  aircraftInfo={aircraftInfo}
                  aircraftThumbnailIsShown={aircraftThumbnailIsShown[aircraftName]}
                />
              ))
            }
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const allAircraftData = getAllAircraftData()
  return {
    props: {
      allAircraftData
    }
  }
}