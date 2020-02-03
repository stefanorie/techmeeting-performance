import React from 'react';
import { IFloraXchangeItem } from '../../../../Definitions/fxItem';
import { ListItem, Box } from '@material-ui/core';

interface IProps {
    product: IFloraXchangeItem;
}

export default function ProductRow(props: IProps) {
    const { product } = props;

    return (
        <ListItem button>
            <Box width={48} height={48} mr={2}>
                <img src={product.Fotos[0]?.UrlThumb50} alt='' width={48} height={48} />
            </Box>

            <Box>
                {product.Naam}
            </Box>
        </ListItem>
    );
}
