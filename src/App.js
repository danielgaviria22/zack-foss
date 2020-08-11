import React from 'react';
import { getClassName } from "./core/utils/css-class"

import "App.scss"
import CharacterView from 'containers/CharacterView';
import SidebarView from 'containers/SidebarView';
import ActionLogView from 'containers/ActionLogView';

function App() {
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
