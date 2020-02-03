import React, { useEffect, useState } from 'react';
import { IFloraXchangeItem } from '../../../Definitions/fxItem';
import { CircularProgress, Grid, Button, Box, Divider, Toolbar } from '@material-ui/core';
import DefaultProductCardWDYR from './Components/DefaultProductCardWDYR';
import PrimitiveProductCardWDYR from './Components/PrimitiveProductCardWDYR';
import MemoizedProductCardWDYR from './Components/MemoizedProductCardWDYR';
import StyledMemoizedProductCardWDYR from './Components/StyledMemoizedProductCardWDYR';
import SmartProductCardWDYR from './Components/SmartProductCardWDYR';

function ExampleWDYR() {
    const [products, setProducts] = useState<IFloraXchangeItem[]>([]);
    const [count, setCount] = useState(0);

    const [defaultPrice, setDefaultPrice] = useState(0);
    const [primitivePrice, setPrimitivePrice] = useState(0);
    const [memoizedPrice, setMemoizedPrice] = useState(0);
    const [styledMemoizedPrice, setStyledMemoizedPrice] = useState(0);

    useEffect(() => {
        initialize();
    }, []);

    async function initialize() {
        const products = await (await fetch('https://api.floraxchange.nl/artikel?relatieid=215')).json();
        setProducts(products);
    }

    if (products.length === 0) {
        return <CircularProgress />;
    }

    return (
        <>
            <Toolbar disableGutters>
                <Button variant='contained' color='primary' onClick={() => setCount(prevCount => prevCount + 1)}>
                    Een knop die +1 doet
                </Button>

                <Box ml={3} p={1} bgcolor='#f50057' color='#fff' fontWeight='bold' borderRadius={4}>
                    Huidige count: {count}
                </Box>
            </Toolbar>

            <Box my={2}>
                <Divider />
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <DefaultProductCardWDYR
                        product={products[1]}
                        value={defaultPrice}
                        onChange={setDefaultPrice}
                    />
                </Grid>

                <Grid item xs={6}>
                    <PrimitiveProductCardWDYR
                        name={products[1].Naam}
                        photoUrl={products[1].Fotos[0].UrlThumb220}
                        value={primitivePrice}
                        onChange={setPrimitivePrice}
                    />
                </Grid>

                <Grid item xs={6}>
                    <MemoizedProductCardWDYR
                        product={products[1]}
                        value={memoizedPrice}
                        onChange={setMemoizedPrice}
                    />
                </Grid>

                <Grid item xs={6}>
                    <StyledMemoizedProductCardWDYR
                        product={products[1]}
                        style={{ backgroundColor: '#90caf9', fontStyle: 'italic' }}
                        value={styledMemoizedPrice}
                        onChange={setStyledMemoizedPrice}
                    />
                </Grid>

                <Grid item xs={6}>
                    <SmartProductCardWDYR />
                </Grid>
            </Grid>
        </>
    );
}

ExampleWDYR.whyDidYouRender = true;

export default ExampleWDYR;
