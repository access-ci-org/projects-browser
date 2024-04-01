import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store';
import ProjectsBrowser from "./components/ProjectsBrowser";
import appStyles from './styles/app.scss?inline';
import bootstrapStyles from './styles/bootstrap.scss?inline';

const renderBrowser = ({
    projects,
    filters,
    disable_bootstrap
  }) => {
  const container = document.getElementById("projects_browser_app");
  const root = ReactDOM.createRoot(container);
  const bootstrapDisabled = disable_bootstrap ? disable_bootstrap : false;

  root.render(
    <Provider store={store}>
      <div className='container'>
        <ProjectsBrowser
          projects={projects}
          filters={filters}
        />
      </div>
      {bootstrapDisabled ? '' : <style>{bootstrapStyles}</style>}
      <style>{appStyles}</style>
    </Provider>
  );
}

export {
  renderBrowser
}