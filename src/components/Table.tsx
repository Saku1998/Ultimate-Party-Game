import React from 'react'
import './Table.css'

type TableProps = {
    teams : string[];
    points: number[];
    turn: number;
    colors: string[];
}

export default function Table({teams, points,turn, colors}: TableProps){


    return (
        <div className='table'>
            <h2>Punktacja:</h2>
            {teams.map((team, index) => {
                return (
                    <div key={index}>
                        <h2 className='team-name' style={{color: `${colors[index]}`}}>{`${team}: ${points[index]}`}</h2>
                    </div>
                )           
            })}
            <h1>Gracz: <span className='team-name' style={{color: colors[turn]}}>{teams[turn]}</span></h1>
        </div>
    )
}