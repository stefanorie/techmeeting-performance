import React, { useState } from 'react';
import { makeStyles, Card, CardContent, Typography, CardMedia, Button, Divider, Box, Toolbar, CircularProgress, Grid, Input, FormControl, InputLabel, InputAdornment, Switch } from '@material-ui/core';
import { flatMap } from 'lodash';
import { IFloraXchangeItem } from '../../../Definitions/fxItem';

const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
    },
    content: {
        flex: '1',
    },
    cover: {
        width: 110,
    },
}));

let startTime = 0;

export default function ExampleChromeTabs() {
    const classes = useStyles(undefined);
    const [products, setProducts] = useState<IFloraXchangeItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hideItems, setHideItems] = useState(false);

    function reset() {
        setProducts([]);
        setIsLoading(false);
    }

    function startTimer(type: string) {
        startTime = performance.now();
        console.group('Fetching data - ' + type);
        console.log('start:', startTime);
    }

    function finishTimer(type: string) {
        const endTime = performance.now();
        const duration = Math.floor(endTime - startTime).toString();
        const backgroundColor = type === 'serial' ? '#3f51b5' : '#f50057';

        console.log('end:', endTime);
        console.log('%c ' + duration + ' milliseconds ', 'color: #fff; background: ' + backgroundColor + '; font-weight: bold; font-size: 16px;');
        console.groupEnd();
    }

    async function fetchSerial() {
        try {
            setIsLoading(true);

            startTimer('serial');

            const kwekerijDePlaats = await (await fetch('https://api.floraxchange.nl/artikel?relatieid=215')).json();
            const kwekerijLuiten = await (await fetch('https://api.floraxchange.nl/artikel?relatieid=310')).json();
            const kwekerijJungleStar = await (await fetch('https://api.floraxchange.nl/artikel?relatieid=361')).json();
            const kwekerijStolze = await (await fetch('https://api.floraxchange.nl/artikel?relatieid=362')).json();
            const kwekerijAtlantis = await (await fetch('https://api.floraxchange.nl/artikel?relatieid=363')).json();
            const kwekerijGroenhof = await (await fetch('https://api.floraxchange.nl/artikel?relatieid=364')).json();

            finishTimer('serial');

            const products = flatMap(
                [kwekerijDePlaats, kwekerijLuiten, kwekerijJungleStar, kwekerijStolze, kwekerijAtlantis, kwekerijGroenhof]
            );

            setProducts(products);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchParallel() {
        try {
            setIsLoading(true);

            startTimer('parallel');

            const promises = await Promise.all([
                fetch('https://api.floraxchange.nl/artikel?relatieid=215'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=310'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=361'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=362'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=363'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=365'),
            ]);

            const products = flatMap(
                await Promise.all(promises.map(p => p.json()))
            );

            finishTimer('parallel');

            setProducts(products);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    function renderCard(product: IFloraXchangeItem) {
        return (
            <Card className={classes.card}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component='h5' variant='h5'>
                            {product.Naam}
                        </Typography>
                        <Typography variant='subtitle1' color='textSecondary'>
                            {product.Code}
                        </Typography>

                        <FormControl style={{ marginTop: 8 }}>
                            <InputLabel htmlFor='standard-adornment-amount'>Prijs</InputLabel>
                            <Input
                                id='standard-adornment-amount'
                                startAdornment={<InputAdornment position='start'>€</InputAdornment>}
                            />
                        </FormControl>
                    </CardContent>
                </div>

                {product.Fotos.length > 0 &&
                    <CardMedia
                        className={classes.cover}
                        image={product.Fotos[0].UrlThumb220}
                        title={product.Fotos[0].ID.toString()}
                    />
                }
            </Card>
        );
    }

    return (
        <>
            <Toolbar disableGutters>
                <Button variant='contained' color='primary' style={{ marginRight: 16 }} onClick={fetchSerial}>
                    Laad data serieel
                </Button>

                <Button variant='contained' color='secondary' style={{ marginRight: 16 }} onClick={fetchParallel}>
                    Laad data parallel
                </Button>

                Verberg items: <Switch checked={hideItems} onChange={(_e, checked) => setHideItems(checked)} style={{ marginRight: 16 }} />

                <Button variant='contained' color='default' style={{ marginLeft: 'auto' }} onClick={reset}>
                    Reset
                </Button>
            </Toolbar>

            <Box my={2}>
                <Divider />
            </Box>

            {products.length === 0 &&
                <Typography variant='h6'>
                    Klik op één van de knoppen om data te laden
                </Typography>
            }

            {isLoading
                ? (
                    <Box display='flex' alignItems='center' justifyContent='center' py={3}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Typography variant='h6'>
                            Aantal producten: {products.length}
                        </Typography>

                        {!hideItems &&
                            <Grid container spacing={2}>
                                {products.map(product =>
                                    <Grid key={product.ID} item xs={12} sm={4}>
                                        {renderCard(product)}
                                    </Grid>
                                )}
                            </Grid>
                        }
                    </>

                )
            }
        </>
    );
}
