import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './state/store';
import ProjectsBrowser from "./components/ProjectsBrowser";
import appStyles from './styles/app.scss?inline';
import bootstrapStyles from './styles/bootstrap.scss?inline';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const renderBrowser = ({
    api_url,
    disable_bootstrap
  }) => {
  const container = document.getElementById("projects_browser_app");
  let root;
  if (disable_bootstrap) {
    root = ReactDOM.createRoot(container);
  } else {
    const shadow = container.attachShadow({ mode: "open" });
    root = ReactDOM.createRoot(shadow);
  }

  const bootstrapDisabled = disable_bootstrap ? disable_bootstrap : false;

  root.render(
    <Provider store={store}>
      <div className='container'>
        <ProjectsBrowser
          api_url={api_url}
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