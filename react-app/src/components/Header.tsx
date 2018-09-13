import { AppBar,Toolbar,Typography } from '@material-ui/core/';
import * as React from 'react';
import { Link } from 'react-router-dom';
import '../css/styles.css'

export const Header: React.StatelessComponent<{}> = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    <Link className='Link' to="/">Bus Stop Finder</Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

