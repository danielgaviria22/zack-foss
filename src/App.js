import React, { useEffect } from 'react';
import { compose } from 'ramda';
import CharacterView from 'containers/CharacterView';
import SidebarView from 'containers/SidebarView';
import ActionLogView from 'containers/ActionLogView';
import { getClassName } from "core/utils/css-class"
import { useDispatch } from 'react-redux';
import { loadState } from 'redux/load';
import { addFixedLine, addTemporalLine, addLine, resetLog } from 'redux/actionLog';
import { startTimer, stopTimer } from 'redux/timer';
import { changeStat } from 'redux/status';
import { resetState } from 'redux/reset';
import "App.scss"

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadState())
  },[dispatch])

  const base = getClassName({
    base: "app-container"
  })

  const mainContainer = base.extend("&__window-container");
  const sidebarContainer = base.extend("&__sidebar-container");
  const logContainer = base.extend("&__log-container");
    
  window["addLine"] = compose( dispatch, addLine )
  window["addFixedLine"] = compose( dispatch, addFixedLine )
  window["addTemporalLine"] = compose( dispatch, addTemporalLine )
  window["resetLog"] = compose( dispatch, resetLog )
  window["startTimer"] = compose( dispatch, startTimer );
  window["stopTimer"] = compose( dispatch, stopTimer );
  window["changeHP"] = compose( dispatch, (amount=-10) => changeStat("HP",amount) );
  window["reset"] = compose( dispatch, resetState )

  return (
    <div className={base}>
      <main className={mainContainer}>
        <CharacterView />
      </main>
      <div className={sidebarContainer}>
        <SidebarView />
      </div>
      <div className={logContainer}>
        <ActionLogView />
      </div>
    </div>
  );
}

export default App;
