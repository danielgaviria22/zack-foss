import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { loadState } from 'redux/load';
import { triggerFlag } from 'redux/flags';
import { resetState } from 'redux/reset';
import { changeResourceAmount } from 'redux/resources'
import { useResource, useFlag, useStatusEffect, useCharacterStat } from 'core/hooks/state';
import ActionLog from 'components/ActionLog';
import Button from 'components/Button';
import StatusBar, { Oxygen, Water } from 'components/StatusBar';
import { changeStat, triggerEffect } from 'redux/status';

const fun = (n) => {
  const msgs = {
    0: "Hey you added a line",
    1: "Hey another line",
    2: "Yet another line",
    3: "Cool! another line...",
    4: "More lines...",
    5: "Enough lines"
  } 
  return msgs[n] ||  `This is line number ${n + 1} you have added`;
}

const testLines = [
  "This is line 0",
  "This is yet another line",
  "I copy pasted this to see how long lines look",
  "I copy pasted this to see how long lines look",
  "I copy pasted this to see how long lines look",
  "I copy pasted this to see how long lines look",
  "I copy pasted this to see how long lines look"
]

function App() {
  const wood = useResource("wood");
  const isSuper = useFlag("super");
  const isSick = useStatusEffect("sick");
  const strength = useCharacterStat("str");
  const dispatch = useDispatch()
  const handleClick = () => dispatch(changeResourceAmount("wood",100))
  const handleFlag = () => dispatch(triggerFlag("super"))
  const handleReset = () => dispatch(resetState())
  const handleSick = () => dispatch(triggerEffect("sick"))
  const handleStrength = (amount) => () => dispatch(changeStat("str",amount))
  useEffect(() => {
    dispatch(loadState())
  },[dispatch])

  const [ lines , setLines ] = useState(testLines)

  const handleAddLine = () => setLines([ ...lines, fun(lines.length - testLines.length)]);

  return (
    <div>
      <div>
      Zack Foss In Production...
      </div>
      <Button loadingTime={2} onClick={handleClick}>Click for wood</Button>
      <button onClick={handleFlag}>Click to be {isSuper ? "normal" : "super"}</button>
      <button onClick={handleSick}>Click to be {isSick ? "healthy" : "sick"}</button>
      <div>
        <div>Strength: {strength}</div>
        <div>
          <button onClick={handleStrength(-1)}>-</button>
          <button onClick={handleStrength(+1)}>+</button>
        </div>
      </div>
      <div>
        <StatusBar statusName="Default"/>
        <StatusBar statusLevel={50} statusName="Default"/>
        <StatusBar statusLevel={10} statusName="Default"/>
        <StatusBar statusLevel={10} statusName="Partial" colors={{ low: "white" }}/>
        <StatusBar maxLevel={200} statusLevel={150} statusName="Oxygen" colors={Oxygen}/>
        <StatusBar maxLevel={200} statusLevel={75} statusName="Oxygen"/>
        <StatusBar maxLevel={200} statusLevel={20} statusName="Oxygen"/>
        <StatusBar maxLevel={200} statusLevel={150} statusName="Water" colors={Water}/>
        <StatusBar maxLevel={200} statusLevel={75} statusName="Water"/>
        <StatusBar maxLevel={200} statusLevel={20} statusName="Water"/>
      </div>
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        wood: {wood}
      </div>
      <ActionLog
        lines={lines}
      />
      <button onClick={handleAddLine}>Add line</button>
    </div>
  );
}

export default App;
