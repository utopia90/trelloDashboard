import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { BackgroundContext } from "./contexts/backgroundContext";
import { ThemeContext } from "./contexts/themeContext";
import Routes from "./routes/routes";
import { StyledBody } from "./shared/body";
import {
  BackgroundSelect,
  ButtonsDiv,
  OptionStyled,
  SwitchThemeBtn,
} from "./shared/button";
import sea from "./assets/imgs/sea.jpg";
import mountains from "./assets/imgs/mountains.jpg";
import sky from "./assets/imgs/sky.jpg";
import sand from "./assets/imgs/sand.jpg";
import { TopAppDiv, WeatherDiv } from "./shared/form";
import axios from "axios";
import { convertFahrenheitToCelsius } from "./App.mapper";

const App: React.FC = () => {
  const { dark, toggleDark } = React.useContext(ThemeContext);
  const [weatherData, setWeatherData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const { backgroundChoice, changeBackground } =
    React.useContext(BackgroundContext);
  const baseURL = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/3352966?apikey=KaKGCvrADsAhbyPeQQNx3oJXflSGHUYe&language=en`;

  const switchBackground = () => {
    switch (backgroundChoice) {
      case "sea":
        return sea;

      case "sky":
        return sky;

      case "mountains":
        return mountains;

      case "sand":
        return sand;

      default:
        return "";
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL);
        setWeatherData(response?.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <StyledBody color={dark ? "black" : "white"} theme={switchBackground()}>
        <TopAppDiv>
          <ButtonsDiv>
            {backgroundChoice === "any" && (
              <SwitchThemeBtn onClick={toggleDark}>Toogle Theme</SwitchThemeBtn>
            )}
            <BackgroundSelect
              onChange={(e) => changeBackground(e.target.value)}
              id="background"
              name="backgroundList"
            >
              <OptionStyled value="sea">Background Sea</OptionStyled>
              <OptionStyled value="mountains">
                Background Mountains
              </OptionStyled>
              <OptionStyled value="sky">Background Sky</OptionStyled>
              <OptionStyled value="sand">Background Sand</OptionStyled>
              <OptionStyled value="any">
                No Background / Toggle Theme
              </OptionStyled>
            </BackgroundSelect>
          </ButtonsDiv>
          <WeatherDiv>
            <h3>Good Morning!</h3>
            <h4>
              Málaga is today: {!isLoading  && weatherData.DailyForecasts[0].Day.IconPhrase}
            </h4>
            <h4>
              We
              {!isLoading && weatherData.DailyForecasts[0].Day.HasPrecipitation === false &&
                " dont "}
              expect precipitations
            </h4>
            <h4>Maximum temperature is: {!isLoading && convertFahrenheitToCelsius(weatherData.DailyForecasts[0].Temperature.Maximum.Value)} ºC</h4>
            <h4>Minumum temperature is: {!isLoading && convertFahrenheitToCelsius(weatherData.DailyForecasts[0].Temperature.Minimum.Value)} ºC</h4>

          </WeatherDiv>
        </TopAppDiv>
        <Routes />
      </StyledBody>
    </div>
  );
};

export default App;
