import React from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Input, InputAdornment, CardMedia, makeStyles } from '@material-ui/core';

interface IProps {
    name: string;
    photoUrl: string;
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

function PrimitiveProductCardWDYR(props: IProps) {
    const { name, photoUrl, value, onChange } = props;
    const classes = useStyles(props);

    return (
        <Card className={classes.card}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component='h5' variant='h5'>
                        {name}
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                        PRIMITIVE
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

            {photoUrl &&
                <CardMedia
                    className={classes.cover}
                    image={photoUrl}
                />
            }
        </Card>
    );
}

PrimitiveProductCardWDYR.whyDidYouRender = true;

export default PrimitiveProductCardWDYR;