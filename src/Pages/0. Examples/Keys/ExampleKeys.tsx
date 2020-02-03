import React, { useEffect, useState } from 'react';
import { IFloraXchangeItem } from '../../../Definitions/fxItem';
import { CircularProgress, Grid, Button, Box, Divider, Toolbar } from '@material-ui/core';
import KeysCard from './Components/KeysCard';

export default function ExampleKeys() {
    const [products, setProducts] = useState<IFloraXchangeItem[]>([]);
    const [shownProducts, setShownProducts] = useState<IFloraXchangeItem[]>([]);

    useEffect(() => {
        initialize();
    }, []);

    async function initialize() {
        const products = await (await fetch('https://api.floraxchange.nl/artikel?relatieid=215')).json();
        setProducts(products);
    }

    function reset() {
        setShownProducts([]);
    }

    function addProduct() {
        const productToAdd = products[shownProducts.length];

        if (productToAdd) {
            setShownProducts(prevProducts => [productToAdd, ...prevProducts]);
        }
    }

    function setupDuplicateKeyExample() {
        setShownProducts([products[10], products[10]]);
    }


    if (products.length === 0) {
        return <CircularProgress />;
    }

    return (
        <>
            <Toolbar disableGutters>
                <Button variant='contained' color='primary' onClick={addProduct}>
                    Voeg een artikel toe!
                </Button>

                <Box ml={3} p={1} bgcolor='#f50057' color='#fff' fontWeight='bold' borderRadius={4}>
                    Aantal artikelen: {shownProducts.length}
                </Box>

                <Box ml='auto'>
                    <Button variant='contained' color='primary' style={{ marginRight: 24 }} onClick={setupDuplicateKeyExample}>
                        Duplicate key
                    </Button>

                    <Button variant='contained' color='default' onClick={reset}>
                        Reset
                    </Button>
                </Box>

            </Toolbar>

            <Box my={2}>
                <Divider />
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <h2>Index als key</h2>

                    {shownProducts.map((p, i) =>
                        <Box key={i} mb={2}>
                            <KeysCard product={p} />
                        </Box>
                    )}

                </Grid>

                <Grid item xs={12} sm={6}>
                    <h2>ID als key</h2>

                    {shownProducts.map(p =>
                        <Box key={p.ID} mb={2}>
                            <KeysCard product={p} />
                        </Box>
                    )}
                </Grid>
            </Grid>
        </>
    );
}
