import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';
import { StyleSheetManager } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './state/store';
import ProjectsBrowser from "./components/ProjectsBrowser";
import './styles/app.scss';
import './styles/bootstrap.scss';

const renderBrowser = ({
    api_url,
    disable_bootstrap
  }) => {
  // const container = document.getElementById("projects_browser_app");
  // const root = ReactDOM.createRoot(container);
  // const bootstrapDisabled = disable_bootstrap ? disable_bootstrap : false;

  // root.render(
  //   <Provider store={store}>
  //     <div className='container'>
  //       <ProjectsBrowser
  //         api_url={api_url}
  //       />
  //     </div>
  //     {bootstrapDisabled ? '' : <style>{bootstrapStyles}</style>}
  //     <style>{appStyles}</style>
  //   </Provider>
  // );
  const host = document.querySelector('#projects_browser_app');
  // create a shadow root inside it
  const shadow = host.attachShadow({ mode: 'open' });
  // create a slot where we will attach the StyleSheetManager
  const styleSlot = document.createElement('section');
  // append the styleSlot inside the shadow
  shadow.appendChild(styleSlot);
  // create the element where we would render our app
  const renderIn = document.createElement('div');
  // append the renderIn element inside the styleSlot
  styleSlot.appendChild(renderIn);

  render(
    <StyleSheetManager target={styleSlot}>
      <Provider store={store}>
        <div className='container'>
          <ProjectsBrowser
            api_url={api_url}
          />
        </div>
      </Provider>
    </StyleSheetManager>,
    renderIn
  );
}

export {
  renderBrowser
}