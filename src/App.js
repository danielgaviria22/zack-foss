import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { changeResourceAmount } from './redux/resources'
import { loadState } from './redux/load';
import { prop } from 'ramda';

function App() {
  const resources = useSelector(prop("resources"))
  const dispatch = useDispatch()
  const handleClick = () => dispatch(changeResourceAmount("wood",100))
  useEffect(() => {
    dispatch(loadState())
  },[dispatch])
  return (
    <div>
      <div>
      Zack Foss In Production...
      </div>
      <button onClick={handleClick}>Click for wood</button>
      <div>
        wood: {resources.wood}
      </div>
    </div>
  );
}

export default App;
