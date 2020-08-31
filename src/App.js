import React, { Suspense , useEffect } from 'react';
import { compose } from 'ramda';
import CharacterView from 'containers/CharacterView';
import SidebarView from 'containers/SidebarView';
import ActionLogView from 'containers/ActionLogView';
import { getClassName } from "core/utils/css-class"
import { useDispatch } from 'react-redux';
import { loadState } from 'redux/load';
import { startTimer, stopTimer } from 'redux/timer';
import { resetState } from 'redux/reset';
import Spinner from 'components/Spinner';
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
  
  console.groupCollapsed("TO DO: Remove window functions")
  console.error("App.js")
  console.groupEnd()
  window["startTimer"] = compose( dispatch, startTimer );
  window["stopTimer"] = compose( dispatch, stopTimer );
  window["reset"] = compose( dispatch, resetState )

  return (
    <div className={base}>
      <Suspense fallback={<Spinner />}>
        <main className={mainContainer}>
          <CharacterView />
        </main>
        <div className={sidebarContainer}>
          <SidebarView />
        </div>
        <div className={logContainer}>
          <ActionLogView />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
