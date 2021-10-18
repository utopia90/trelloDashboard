import React from 'react';

export const convertFahrenheitToCelsius = (grade:number) => {
        return ((grade-32)/1.8).toFixed(2)
}