import React, { useState } from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Input, InputAdornment, CardMedia, makeStyles } from '@material-ui/core';

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


function SmartProductCardWDYR() {
    const classes = useStyles(undefined);
    const [value, setValue] = useState(0);

    return (
        <Card className={classes.card}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component='h5' variant='h5'>
                        Dracaena Twist
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                        SMART
                    </Typography>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor='standard-adornment-amount'>Prijs</InputLabel>
                        <Input
                            type='number'
                            value={value}
                            onChange={event => setValue(Number(event.currentTarget.value))}
                            startAdornment={<InputAdornment position='start'>€</InputAdornment>}
                        />
                    </FormControl>
                </CardContent>
            </div>

            <CardMedia
                className={classes.cover}
                image='http://static.floraxchange.nl/artikelen/1547784_v_t8.jpg'
            />
        </ Card>
    );
}

SmartProductCardWDYR.whyDidYouRender = true;

export default SmartProductCardWDYR;