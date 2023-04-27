import React from 'react';
import { useState, useEffect } from 'react';
import InputTeam from './components/InputTeam';
import GameBoard from './components/GameBoard';
import Table from './components/Table';
import Categories from './components/Categories';
import './App.css';

type QuestionType = {
  question_index: number;
  question: string;
  points: number;
  category: string;
  a: string;
  b: string;
  c: string;
  d: string;
  answer: string;
}[]

function App() {

  const [questions, setQuestions] = useState<QuestionType | undefined>(undefined)
  const [start, setStart] = useState<boolean>(false)
  const [teams, setTeams] = useState<string[]>([])
  const [points, setPoints] = useState<number[]>([])
  const [turn, setTurn] = useState(0)  
  const [colors, setColors] = useState<string[]>([])
  

  useEffect(() => {
    fetch('http://localhost:8800/questions')
    .then(response => response.json())
    .then(data => {
      setQuestions(data)
    })
  }, [])


  function nextPlayer(){
    if(turn == teams.length -1){
      setTurn(0)
    }else{
      setTurn(prev => prev + 1)
    }
  }

  function startGame(teams: string[], colors: string[]){
    setStart(true)
    setTeams(teams)
    setColors(colors)
    setPoints(() => {
      let newArray = []
      for(let i = 0; i < teams.length; i ++){
        newArray.push(0)
      }
      return newArray
    })
  }

  function addPoints(value: number){
    let newPoints = []
    for(let i = 0; i < points.length; i++){
      if(teams[turn] == teams[i]){
        newPoints.push(points[i] += value)
      }else{
        newPoints.push(points[i])
      }
    }
    setPoints(newPoints)
  } 

  function addExtraPoints(index: number){
    let sum = 0;
    let myElement = document.getElementById(index.toString()) as HTMLElement
    if(teams.includes(myElement.innerText)){
      if([1,2,3,4,7,8,9,10,13,14,15,16,19,20,21,22,25,26,27,28].includes(index)){
        if(document.getElementById(index.toString())?.innerText == document.getElementById((index-1).toString())?.innerText &&
        document.getElementById(index.toString())?.innerText == document.getElementById((index+1).toString())?.innerText ){
          sum += 100
        }
      }
      if([0,1,2,3,6,7,8,9,12,13,14,15,18,19,20,21,24,25,26,27].includes(index)){
        if(document.getElementById(index.toString())?.innerText == document.getElementById((index+1).toString())?.innerText &&
        document.getElementById(index.toString())?.innerText == document.getElementById((index+2).toString())?.innerText ){
          sum += 100
        }
      }
      if([2,3,4,5,8,9,10,11,14,15,16,17,20,21,22,23,26,27,28,29].includes(index)){
        if(document.getElementById(index.toString())?.innerText == document.getElementById((index-1).toString())?.innerText &&
        document.getElementById(index.toString())?.innerText == document.getElementById((index-2).toString())?.innerText ){
          sum += 100
        }
      }
      if([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].includes(index)){
        if(document.getElementById(index.toString())?.innerText == document.getElementById((index+6).toString())?.innerText &&
        document.getElementById(index.toString())?.innerText == document.getElementById((index+12).toString())?.innerText ){
          sum += 100
        }
      }
      if([6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].includes(index)){
        if(document.getElementById(index.toString())?.innerText == document.getElementById((index+6).toString())?.innerText &&
        document.getElementById(index.toString())?.innerText == document.getElementById((index-6).toString())?.innerText ){
          sum += 100
        }
      }
      if([12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29].includes(index)){
        if(document.getElementById(index.toString())?.innerText == document.getElementById((index-6).toString())?.innerText &&
        document.getElementById(index.toString())?.innerText == document.getElementById((index-12).toString())?.innerText ){
          sum += 100
        }
      }
    }
    return sum
  }

  return (
    <div className='App'>
      {start ?
        <div className='game'>
          <div className='game-questions'>
            <Categories />
            <GameBoard questions={questions} nextPlayer={nextPlayer} teamNow={teams[turn]} colorNow={colors[turn]} addPoints={addPoints} addExtra={addExtraPoints}/>
          </div>
          <Table teams={teams}  points={points} turn={turn} colors={colors}/>
        </div>

        :
        <InputTeam startGame={startGame}/>
      }
    </div>
  );
}

export default App;
