import React from 'react'
import Box from './Box';
import './GameBoard.css'

type GameBoardPropsType = {
    questions: {
        question_index: number;
        question: string;
        points: number;
        category: string;
        a: string;
        b: string;
        c: string;
        d: string;
        answer: string;
      }[] | undefined;
    nextPlayer: () => void;
    teamNow: string;
    colorNow: string;
    addPoints: (value: number) => void;
    addExtra: (index: number) => void;
}

export default function GameBoard({questions, nextPlayer, teamNow, addPoints, colorNow, addExtra}: GameBoardPropsType){
    return (
        <div className='game-board'>
            {questions?.map((question, index) => {
                return (
                    <Box key={index} points={question.points} question={question.question} nextPlayer ={nextPlayer} teamNow={teamNow} addPoints={addPoints}
                     a={question.a} b={question.b} c={question.c} d={question.d} answer={question.answer} colorNow={colorNow} boxnr={index} addExtra={addExtra}/>
                )
            })}
        </div>
    )
}