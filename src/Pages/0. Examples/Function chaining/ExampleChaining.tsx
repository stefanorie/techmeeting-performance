import React, { useState, useEffect } from 'react';
import { IFloraXchangeItem } from '../../../Definitions/fxItem';
import { CircularProgress, Toolbar, Button, Box, Divider, Grid } from '@material-ui/core';
import { flatMap } from 'lodash';
import ProductRow from '../Virtualized/Components/ProductRow';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

let startTime = 0;

export default function ExampleChaining() {
    const [products, setProducts] = useState<IFloraXchangeItem[]>([]);

    useEffect(() => {
        initialize();
    }, []);

    async function initialize() {
        try {
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
                fetch('https://api.floraxchange.nl/artikel?relatieid=785'),
            ]);

            const products = flatMap(
                await Promise.all(promises.map(p => p.json()))
            );

            setProducts(products);
        } catch (error) {
            console.error(error);
        }
    }

    function startTimer(type: string) {
        startTime = performance.now();
        console.group('Filtering products - ' + type);
        console.log('start:', startTime);
    }

    function finishTimer(type: string) {
        const endTime = performance.now();
        const duration = Math.floor(endTime - startTime).toString();
        const backgroundColor = type === 'solo' ? '#3f51b5' : '#f50057';

        console.log('end:', endTime);
        console.log('%c ' + duration + ' milliseconds ', 'color: #fff; background: ' + backgroundColor + '; font-weight: bold; font-size: 16px;');
        console.groupEnd();
    }

    function onFilterSolo() {
        startTimer('solo');

        const filteredProducts = products.filter(p =>
            p.AanbodRegels.length > 0 &&
            p.ArtikelGroep.Naam.length > 3 &&
            p.Beladingen.length > 1 &&
            p.Code.startsWith('1') &&
            p.Eigenschappen.length > 5 &&
            p.Fotos?.some(f => f.ID > 1000000) &&
            p.Hoogte.startsWith('3') &&
            p.ID > 60000 &&
            p.Naam.length > 10 &&
            p.PotmaatNumeriek === 12
        );

        finishTimer('solo');

        console.log(filteredProducts);
    }

    function onFilterChained() {
        startTimer('chained');

        const filteredProducts = products
            .filter(p => p.AanbodRegels.length > 0)
            .filter(p => p.ArtikelGroep.Naam.length > 3)
            .filter(p => p.Beladingen.length > 1)
            .filter(p => p.Code.startsWith('1'))
            .filter(p => p.Eigenschappen.length > 5)
            .filter(p => p.Fotos?.some(f => f.ID > 1000000))
            .filter(p => p.Hoogte.startsWith('3'))
            .filter(p => p.ID > 60000)
            .filter(p => p.Naam.length > 10)
            .filter(p => p.PotmaatNumeriek === 12);

        finishTimer('chained');

        console.log(filteredProducts);
    }


    function renderVirtualizedList() {
        return (
            <FixedSizeList
                height={600}
                itemCount={products.length}
                itemSize={64}
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
                <Button variant='contained' color='primary' style={{ marginRight: 16 }} onClick={onFilterSolo}>
                    Filter solo
                </Button>

                <Button variant='contained' color='secondary' style={{ marginRight: 16 }} onClick={onFilterChained}>
                    Filter chained
                </Button>
            </Toolbar>

            <Box my={2}>
                <Divider />
            </Box>

            {products.length === 0
                ? (
                    <Box display='flex' alignItems='center' justifyContent='center' py={3}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        <Box>
                            Aantal producten: {products.length} <br />
                        </Box>

                        {renderVirtualizedList()}
                    </Grid>
                )
            }
        </>
    );
}
