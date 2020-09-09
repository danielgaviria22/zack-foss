import React, { Suspense , useEffect } from 'react';
import { compose, prop } from 'ramda';
import CharacterView from 'containers/CharacterView';
import SidebarView from 'containers/SidebarView';
import ActionLogView from 'containers/ActionLogView';
import { getClassName } from "core/utils/css-class"
import { useDispatch, useSelector } from 'react-redux';
import { loadState } from 'redux/load';
import { startTimer, stopTimer, tick } from 'redux/timer';
import { resetState } from 'redux/reset';
import Spinner from 'components/Spinner';
import Monitor from 'containers/Monitor';
import Storage from 'core/middleware/storage';
import Session from 'core/middleware/session';
import SessionMonitor from 'containers/SessionMonitor';
import "App.scss"

function App() {
  const isMain = useSelector(prop("main"));
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
  window["tick"] = compose( dispatch, tick)
  window["reset"] = compose( dispatch, resetState );
  window["hardReset"] = () => {
    Storage.delete();
    Session().clean();
  }

  return (
    <div className={base}>
      <SessionMonitor main={isMain}>
        <Suspense fallback={<Spinner />}>
          <Monitor />
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
      </SessionMonitor>
    </div>
  );
}

export default App;
