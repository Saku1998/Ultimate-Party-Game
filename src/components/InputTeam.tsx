import React from 'react'
import {useState} from 'react'
import {RiDeleteBin2Fill} from 'react-icons/ri'
import './InputTeam.css'

type InputTeamPropsType = {
    startGame : (teams: string[], colors: string[]) => void;
}

export default function InputTeam({startGame}: InputTeamPropsType){

    const [teamName, setTeamName] = useState<string>('')
    const [teams, setTeams] = useState<string[]>([])
    const [teamColor, setTeamColor] = useState<string>('')
    const [colors, setColors] = useState<string[]>([])
    

    function setName(e : React.ChangeEvent<HTMLInputElement>){
        setTeamName(e.target.value)
    }

    function addTeam(){
        if(teamName.length > 0){
            setTeams(prev => [...prev, teamName])
            setTeamName('')
        }
        if(teamColor.length > 0){
            setColors(prev => [...prev, teamColor])
        }
    }

    function deleteTeam(index : number){
        setTeams(prev => [...prev.slice(0,index), ...prev.slice(index + 1, prev.length)])
        setColors(prev => [...prev.slice(0,index), ...prev.slice(index + 1, prev.length)])
    }

    function setColor(e: React.ChangeEvent<HTMLSelectElement>){
        setTeamColor(e.target.value)
    }

    return (
        <div className='game-input'>
            <h1>Ultimate Party Game</h1>
            <div className='input-field'>
                <div className='input'>
                    <input placeholder='Enter team name' value={teamName} onChange={e => setName(e)}></input>
                    <div className='confirm' onClick={addTeam}>ADD</div>
                </div>
                <select id="color-select" onChange={e => setColor(e)}>
                    <option value="">--Please your color--</option>
                    <option value="orange">Orange</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                </select>
                <div className='input-field-players'>
                    <h3>TEAMS:</h3>
                    {teams.map((team,index) => {
                        return  <div className='input-field-players-player' key={index} style={{color: `${colors[index]}`}}>
                                    <h3 className='team-name'>{team}</h3>
                                    <RiDeleteBin2Fill className='bin' name={team} onClick={() => deleteTeam(index)}/>
                                </div>
                    })}
                </div>
                <button className='input-field-startbtn' onClick={() => startGame(teams, colors)}>Start</button>
            </div>
        </div>
    )
}