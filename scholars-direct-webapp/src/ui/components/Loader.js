import React from 'react';
import {GridLoader} from 'react-spinners';

class Loader extends React.Component {
    render() {
        return (
            <GridLoader
                sizeUnit={"px"}
                size={20}
                color={'#43D1AF'}
            />
        )
    }
}

export default Loader;