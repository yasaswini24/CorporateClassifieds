import React from 'react';
import './ServerError.sass';

const ServerError = () => {
    return (
        <div className="ServerError">
            <p className={'ServerError'}>{"SERVER ERROR, CONTACT ADMINISTRATOR!!!!"}</p>
            <h1>500</h1>
            <h2>Unexpected Error <b>:(</b></h2>
        </div>
    )
}

export default ServerError;