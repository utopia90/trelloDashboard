import { weatherDTO } from "./../dto/weatherDTO";
import axios from "axios";

export const weatherRespository = {
  getWeatherData: async (): Promise<weatherDTO> => {
    const baseURL = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/3352966?apikey=KaKGCvrADsAhbyPeQQNx3oJXflSGHUYe&language=en`;

    const response = await axios.get<weatherDTO>(baseURL);
    return response.data;
  },
};
