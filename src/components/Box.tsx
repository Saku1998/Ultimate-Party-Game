import React from 'react'
import { useState, useEffect } from 'react';
import './Box.css'
import { text } from 'stream/consumers';

type BoxPropsType ={
    points: number;
    question: string;
    a: string;
    b: string;
    c: string;
    d: string;
    answer: string;
    nextPlayer: () => void;
    teamNow: string;
    addPoints: (value: number) => void;
    colorNow: string;
    boxnr: number;
    addExtra: (index: number) => void;
}

export default function Box({points, question, nextPlayer, teamNow, addPoints, a, b, c, d, answer, colorNow, boxnr, addExtra}: BoxPropsType){

    const [show, setShow] = useState(false)
    const [showHint, setShowHint] = useState(false)
    const [textInside, setTextInside] = useState<string | number>(points)
    const [pointsToWin, setPointsToWin] = useState<number>(points)
    const [color, setColor] = useState('')
    const [goodanswer, setGoodAnswer] = useState<boolean>(false)
    const [looked, setLooked] = useState<boolean>(false)

    const styles = {
        display : `${show ? 'flex' : 'none'}`
    }

    const styles2 = {
        background: `${goodanswer ? `${color}` : 'black'}`,
        color: 'white',
        textShadow: '0px 0px 3px black'
        
    }

    useEffect(() => {
        addPoints(addExtra(boxnr) as unknown as number)
    }, [textInside])

    function goodAnswer(){
        setShow(false)
        setGoodAnswer(true)
        setTextInside(teamNow)
        setColor(colorNow)
        addPoints(pointsToWin)
        nextPlayer()
    }

    function badAnswer(){
        setShow(false)
        setTextInside("X")
        nextPlayer()
    }

    function randomizePoints(){
        setPointsToWin(prev => Math.floor(Math.random() * points/2) + 1)
    }

    function hint(){
        setShowHint(true)
        randomizePoints()
    }

    function checkAnswer(option: string){
        if(option == answer){
            goodAnswer()
        }else{
            badAnswer()
        }
    }

    function changeState(){
        if(looked == false)
        setShow(true)
        setLooked(true)
    }
    
    return (
        <>
        <div className='box-question' onClick={changeState} style={styles2} id={boxnr.toString()}>
            {textInside}
        </div>
        <div className='box-big' style = {styles}>
            <div className='box-big-points-hint'>
                {!showHint && <button className='answer-btn' onClick={hint}>Show ABCD</button>}
                <p style={{fontSize: '40px'}}>{pointsToWin}</p>
            </div>
            <p>{question}?</p>
            <div className='btn-container'>
                {
                    showHint 
                    ?
                    <>
                    <button onClick={() => checkAnswer(a)} className='answer-btn'>A. {a}</button>
                    <button onClick={() => checkAnswer(b)} className='answer-btn'>B. {b}</button>
                    <button onClick={() => checkAnswer(c)} className='answer-btn'>C. {c}</button>
                    <button onClick={() => checkAnswer(d)} className='answer-btn'>D. {d}</button>
                    </>
                    :
                    <>
                    <button className='answer-btn' onClick={goodAnswer}>Dobrze</button>
                    <button className='answer-btn' onClick={badAnswer}>Źle</button>
                    </>
                }
            </div>
        </div>
        </>
    )
}