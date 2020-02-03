import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React);

ReactDOM.render(<App />, document.getElementById('root'));
