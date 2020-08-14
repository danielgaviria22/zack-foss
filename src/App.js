import React, { useEffect } from 'react';
import { getClassName } from "./core/utils/css-class"

import CharacterView from 'containers/CharacterView';
import SidebarView from 'containers/SidebarView';
import ActionLogView from 'containers/ActionLogView';
import { useDispatch } from 'react-redux';
import { loadState } from 'redux/load';
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
