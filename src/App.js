import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { loadState } from './redux/load';
import { triggerFlag } from './redux/flags';
import { resetState } from './redux/reset';
import { changeResourceAmount } from './redux/resources'
import { useResource, useFlag } from './utils/hooks';

function App() {
  const wood = useResource("wood");
  const isSuper = useFlag("super");
  const dispatch = useDispatch()
  const handleClick = () => dispatch(changeResourceAmount("wood",100))
  const handleFlag = () => dispatch(triggerFlag("super"))
  const handleReset = () => dispatch(resetState())
  useEffect(() => {
    dispatch(loadState())
  },[dispatch])
  return (
    <div>
      <div>
      Zack Foss In Production...
      </div>
      <button onClick={handleClick}>Click for wood</button>
      <button onClick={handleFlag}>Click to be {isSuper ? "normal" : "super"}</button>
      <div>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        wood: {wood}
      </div>
    </div>
  );
}

export default App;
