import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { BackgroundContext } from "./contexts/backgroundContext";
import { ThemeContext } from "./contexts/themeContext";
import Routes from "./routes/routes";
import { StyledBody } from "./shared/body";
import { FiSun,FiCloud,FiCloudDrizzle } from "react-icons/fi";
import { WiDayCloudy,WiHail } from "react-icons/wi";
import { FaTemperatureHigh,FaTemperatureLow
} from "react-icons/fa";



import {
  BackgroundSelect,
  ButtonsDiv,
  OptionStyled,
  SwitchThemeBtn,
} from "./shared/button";

import { TopAppDiv, WeatherDiv } from "./shared/form";
import { convertFahrenheitToCelsius } from "./App.mapper";
import { WeatherP, WeatherSpan } from "./shared/titles";
import { weatherRespository } from "./repositories/weatherRespository";
import { weatherDTO } from "./dto/weatherDTO";
import { optionObject, SwitchBackground } from "./appUtils";

const App: React.FC = () => {
  const { dark, toggleDark } = React.useContext(ThemeContext);
  const { backgroundChoice, changeBackground } =
    React.useContext(BackgroundContext);
  const [weatherData, setWeatherData] = useState<weatherDTO>();

  useEffect(() => {
    weatherRespository.getWeatherData().then((res) => {
      setWeatherData(res);
    });
  }, [{}]);

  return (
    <div>
      <StyledBody
        color={dark ? "black" : "lightgray"}
        theme={SwitchBackground()}
      >
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
              {optionObject.map((option, idx) => {
                return (
                  <OptionStyled key={idx} value={option.value}>
                    {option.text}
                  </OptionStyled>
                );
              })}
            </BackgroundSelect>
          </ButtonsDiv>

          <WeatherDiv>
           <p> <FiSun/>  Good Morning!</p>
            <p>Málaga is today:</p>  
                {weatherData?.DailyForecasts[0].Day.IconPhrase.includes("Partly") || weatherData?.DailyForecasts[0].Day.IconPhrase.includes("clouds") ? <WeatherP><WeatherSpan> {weatherData?.DailyForecasts[0].Day.IconPhrase} </WeatherSpan> <WiDayCloudy/> </WeatherP>: <WeatherP> <WeatherSpan>  {weatherData?.DailyForecasts[0].Day.IconPhrase}</WeatherSpan><FiSun/></WeatherP>  }
             <p>We
              <WeatherSpan>
                {weatherData?.DailyForecasts[0].Day.HasPrecipitation ===
                  false && " dont "}
              </WeatherSpan>
              expect precipitations  <WiHail style={{fontSize:"21px"}}/> </p> 
            <p>
              Maximum temperature is:  
              <WeatherSpan>
                {convertFahrenheitToCelsius(
                  weatherData?.DailyForecasts[0].Temperature.Maximum.Value
                )}
                ºC  <FaTemperatureHigh/>
              </WeatherSpan>
              </p>
            <p>
              Minumum temperature is:
              <WeatherSpan>
                {convertFahrenheitToCelsius(
                  weatherData?.DailyForecasts[0].Temperature.Minimum.Value
                )}
                ºC  <FaTemperatureLow/>
              </WeatherSpan>
            </p>
          </WeatherDiv>
        </TopAppDiv>
        <Routes />
       </StyledBody>
    </div>
  );
};

export default App;
