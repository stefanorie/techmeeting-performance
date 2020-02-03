import React from 'react';
import { makeStyles, Container, Box } from '@material-ui/core';
import Sidebar from '../Sidebar/Sidebar';
import NotFound from '../../Pages/NotFound/NotFound';
import ExampleChromeTabs from '../../Pages/0. Examples/Chrome tabs/ExampleChromeTabs';
import { Route, Switch, Redirect } from 'react-router-dom';
import ExampleKeys from '../../Pages/0. Examples/Keys/ExampleKeys';
import ExampleWDYR from '../../Pages/0. Examples/Why did you render/ExampleWDYR';
import ExampleVirtualized from '../../Pages/0. Examples/Virtualized/ExampleVirtualized';
import ExampleChaining from '../../Pages/0. Examples/Function chaining/ExampleChaining';

const useStyles = makeStyles(theme => ({
    content: {
        padding: theme.spacing(3)
    },
}));


export default function Frame() {
    const classes = useStyles();

    return (
        <Box display='flex'>
            <Sidebar />

            <Container maxWidth='lg' classes={{ root: classes.content }}>
                <Switch>
                    <Route exact path='/' component={undefined}>
                        <Redirect to='/examples/chrome-tabs' />
                    </Route>

                    <Route path='/examples/chrome-tabs' component={ExampleChromeTabs} />
                    <Route path='/examples/why-did-you-render' component={ExampleWDYR} />
                    <Route path='/examples/keys' component={ExampleKeys} />
                    <Route path='/examples/virtualized' component={ExampleVirtualized} />
                    <Route path='/examples/chaining' component={ExampleChaining} />

                    <Route path='/slow/dashboard' component={undefined} />
                    <Route path='/slow/products' component={undefined} />
                    <Route path='/slow/shop' component={undefined} />
                    <Route path='/slow/sales' component={undefined} />

                    <Route path='/fast/dashboard' component={undefined} />
                    <Route path='/fast/products' component={undefined} />
                    <Route path='/fast/shop' component={undefined} />
                    <Route path='/fast/sales' component={undefined} />

                    <Route path='*' render={() => <NotFound />} />
                </Switch>
            </Container>
        </Box>
    );
}
