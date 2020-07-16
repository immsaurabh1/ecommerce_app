import React, { useEffect } from 'react';
const axios = require('axios')
export default function ProductComponent(props) {
    useEffect(() => {
        axios.get('api/v1/products')
            .then(response => { console.log(response) })
            .catch(error => console.log(error))
    }, [])

    return (<div>This is a test component</div>);
}