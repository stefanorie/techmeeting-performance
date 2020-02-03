import React from 'react';
import { IFloraXchangeItem } from '../../../../Definitions/fxItem';
import { Card, CardContent, Typography, FormControl, InputLabel, Input, InputAdornment, CardMedia, makeStyles } from '@material-ui/core';

interface IProps {
    product: IFloraXchangeItem;
    style: React.CSSProperties;
    value: number;
    onChange: (newValue: number) => void;
}

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
    formControl: {
        marginTop: theme.spacing(1),
    }
}));

function StyledMemoizedProductCardWDYR(props: IProps) {
    const { product, style, value, onChange } = props;
    const classes = useStyles(props);

    return (
        <Card className={classes.card} style={style}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component='h5' variant='h5'>
                        {product.Naam}
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                        STYLED MEMOIZED
                    </Typography>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor='standard-adornment-amount'>Prijs</InputLabel>
                        <Input
                            type='number'
                            value={value}
                            onChange={event => onChange(Number(event.currentTarget.value))}
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

const memo = React.memo(StyledMemoizedProductCardWDYR);
memo.whyDidYouRender = true;

export default memo;
