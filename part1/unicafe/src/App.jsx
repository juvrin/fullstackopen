import { useState } from 'react'





const Button = ({onClick,text}) =>{
    return(
      <button onClick={onClick}>{text}</button>
    )
}

const StatisticLine = (props) => {
  return(
    <p>{props.text} {props.value}</p>
  )
}
const Statistics = (props) => {

  if(props.total === 0){
    return(<p>No feedback given</p>)
  }


  return (  
  <div>
    <h1>statistics</h1>
    <table>
      <tbody>
      <tr>
        <td><StatisticLine text="good"/></td>
        <td><StatisticLine value={props.good}/></td>
      </tr>
      <tr>
        <td><StatisticLine text="neutral"/></td>
        <td><StatisticLine value={props.neutral}/></td>
      </tr>
      <tr>
        <td><StatisticLine text="bad"/></td>
        <td><StatisticLine value={props.bad}/></td>
      </tr>
      <tr>
        <td><StatisticLine text="total"/></td>
        <td><StatisticLine value={props.total}/></td>
      </tr>
      <tr>
        <td><StatisticLine text="average"/></td>
        <td><StatisticLine value={props.avg}/></td>
      </tr>
      <tr>
        <td><StatisticLine text="positive"/></td>
        <td><StatisticLine value={props.positive}/></td>
      </tr>
      </tbody>
    </table>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)



  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedTotal = total + 1
    setGood(updatedGood)
    setTotal(updatedTotal)
    const updatedAvg = (updatedGood * 1 + bad * (-1)) / updatedTotal
    setAvg(updatedAvg)
    const updatedPos = (updatedGood / updatedTotal) * 100
    setPositive(updatedPos)
  }

   const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = total + 1
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    const updatedAvg = (good*1 + bad*-1)/total
    setAvg(updatedAvg)
     const updatedPos = (positive/updatedTotal)
    setPositive(updatedPos)
  }

  const handleBadClick = () => {
   const updatedBad = bad + 1
   const updatedTotal = total + 1
    setBad(updatedBad)
    setTotal(updatedTotal)
    const updatedAvg = (good * 1 + updatedBad * (-1)) / updatedTotal
    setAvg(updatedAvg)
    const updatedPos = (good / updatedTotal) * 100
    setPositive(updatedPos)
  }

  return (
    <div>
     <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} />
    </div>
  )
}

export default App


 // 