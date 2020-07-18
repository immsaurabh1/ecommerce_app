import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { IconButton } from "@material-ui/core"
import { Link } from "react-router-dom"

export default () => {
    return (<header className="App-header">
        <Link to={"/"} style={{ color: '#fff' }}> Digiplug</Link>
        <Link to={"/cart"}><IconButton ><ShoppingCartIcon /></IconButton></Link>

    </header>)
}