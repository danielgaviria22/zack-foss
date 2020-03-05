import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { changeResourceAmount } from './redux/resources'
import { loadState } from './redux/load';
import { pathOr as _pathOr } from 'ramda';

const pathOr = (or,p) => _pathOr(or,p.split("."));

function App() {
  const wood = useSelector(pathOr(0,"resources.wood"))
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
        wood: {wood}
      </div>
    </div>
  );
}

export default App;
