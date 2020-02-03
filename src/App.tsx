import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Frame from './Components/Frame/Frame';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
    return (
        <CssBaseline>
            <BrowserRouter>
                <Frame />
            </BrowserRouter>
        </CssBaseline>
    );
}
