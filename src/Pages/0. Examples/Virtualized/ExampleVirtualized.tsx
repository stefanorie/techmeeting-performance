import React, { useState } from 'react';
import { IFloraXchangeItem } from '../../../Definitions/fxItem';
import { flatMap } from 'lodash';
import { Toolbar, Button, Switch, Divider, Box, CircularProgress, List, Typography, Paper } from '@material-ui/core';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import ProductRow from './Components/ProductRow';

const listHeight = 600;
const itemHeight = 64;

export default function ExampleVirtualized() {
    const [products, setProducts] = useState<IFloraXchangeItem[]>([]);
    const [isVirtualized, setIsVirtualized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        try {
            setIsLoading(true);

            const promises = await Promise.all([
                fetch('https://api.floraxchange.nl/artikel?relatieid=215'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=310'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=361'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=362'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=363'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=364'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=365'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=366'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=367'),
                fetch('https://api.floraxchange.nl/artikel?relatieid=368'),
                // fetch('https://api.floraxchange.nl/artikel?relatieid=785'), // PT-Creations breaks the app :)
            ]);

            const products = flatMap(
                await Promise.all(promises.map(p => p.json()))
            );

            setProducts(products);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    function reset() {
        setProducts([]);
        setIsVirtualized(false);
    }

    async function loadDataTable() {
        await fetchData();
    }

    async function loadVirtualizedDataTable() {
        setIsVirtualized(true);
        await fetchData();
    }

    function renderContent() {
        if (isLoading) {
            return (
                <Box display='flex' alignItems='center' justifyContent='center' py={3}>
                    <CircularProgress />
                </Box>
            );
        }

        if (products.length > 0) {
            if (isVirtualized) {
                return renderVirtualizedList();
            } else {
                return renderDefaultList();
            }
        }
    }

    function renderDefaultList() {
        return (
            <Paper style={{ height: listHeight, overflowY: 'auto' }}>
                <List>
                    {products.map(product =>
                        <ProductRow key={product.ID} product={product} />
                    )}
                </List>
            </Paper>
        );
    }

    function renderVirtualizedList() {
        return (
            <FixedSizeList
                height={listHeight}
                itemCount={products.length}
                itemSize={itemHeight}
                width='100%'
            >
                {renderVirtualizedRow}
            </FixedSizeList>
        );
    }

    function renderVirtualizedRow(listProps: ListChildComponentProps) {
        const { style, index } = listProps;
        const product = products[index];

        return (
            <div style={style} key={product.ID}>
                <ProductRow product={product} />
            </div>
        );
    }

    return (
        <>
            <Toolbar disableGutters>
                <Button variant='contained' color='primary' style={{ marginRight: 16 }} onClick={loadDataTable}>
                    Laad data tabel
                </Button>

                <Button variant='contained' color='secondary' style={{ marginRight: 16 }} onClick={loadVirtualizedDataTable}>
                    Laad gevirtualiseerde data tabel
                </Button>

                Virtualized: <Switch checked={isVirtualized} />

                <Button variant='contained' color='default' style={{ marginLeft: 'auto' }} onClick={reset}>
                    Reset
                </Button>
            </Toolbar>

            <Box my={2}>
                <Divider />
            </Box>

            {products.length === 0
                ? (
                    <Typography variant='h6'>
                        Klik op één van de knoppen om data te laden
                    </Typography>
                ) : (
                    <Typography variant='h6'>
                        Aantal producten: {products.length}
                    </Typography>
                )
            }

            {renderContent()}
        </>
    );
}