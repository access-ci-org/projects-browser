import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import ProjectsBrowser from "./components/ProjectsBrowser";

const renderBrowser = ({
    api_url,
    disable_bootstrap
  }) => {
  const container = document.getElementById("projects_browser_app");
  const root = ReactDOM.createRoot(container);

  root.render(
    <Provider store={store}>
      <ProjectsBrowser
        api_url={api_url}
      />
    </Provider>
  );
}

export {
  renderBrowser
}