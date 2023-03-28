import React from 'react'

export default function PlayersTable(props) {
    let colorsArr = ['red', 'green', 'lime', 'gray', 'pink', 'aqua', 'crimson', 'fuchsia', 'darkred']
    let rand = Math.floor(Math.random() * colorsArr.length)
    let color = colorsArr[rand]
    const showTable = () => {
        if (props.allPlayers.length == 0) {
            return <h2>There are no players to show yet</h2>
        }
        else {
            return <table id='Tabel' style={{ backgroundColor:color,borderCollapse: 'collapse', marginLeft: '20%' }}>
                <tbody>
                    {props.allPlayers.map((val) => {
                        return (
                            <tr style={{ border: '6px black solid' }}>
                                <td style={{ border: '5px black solid' }}>name:{val.name}</td>
                                <td style={{ border: '5px black solid' }}>wins:  {val.wins}</td>
                                <td style={{ border: '5px black solid' }}>games:  {val.games}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        }
    }


    return (
        <div>
            {showTable()}
        </div>
    )
}
