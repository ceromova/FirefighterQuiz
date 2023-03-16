import React, { useState, useRef } from 'react';
import Question from "./Question"
import Questions from "./Questions.json"

const themes = Object.keys(Questions)


export default function Selector() {

    const [selected, setSelected] = useState()
    if (!selected) {
    return <select onChange={event => setSelected(event.target.value)}> <option> Selecciona tema </option>  {
        themes.map(theme => <option key={theme} value={theme}> {theme} </option>)} </select>
    }

    return <Question questions={Questions[selected]} />

};