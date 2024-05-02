import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store';
import ProjectsBrowser from "./components/ProjectsBrowser";
import bs from './styles/bs.scss?inline';

const renderBrowser = ({
    api_url,
    disable_bootstrap
  }) => {
  const container = document.getElementById("projects_browser_app");
  const root = ReactDOM.createRoot(container);
  const bootstrapDisabled = disable_bootstrap ? disable_bootstrap : false;

  root.render(
    <Provider store={store}>
      <div>
        <div className='container'>
          <ProjectsBrowser
            api_url={api_url}
          />
        </div>
      </div>
      <style>{bs}</style>
    </Provider>
  );
}

export {
  renderBrowser
}