import React, { useEffect } from 'react';
import MenuItem from './MenuItem';
import testImg from '../assets/test.png';
import SnakeLogo from './SnakeLogo.png'
import M from 'materialize-css'

const Menu = (props) => {

    useEffect(() => {
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems, {

        });
    }, [])


    return (
        <div className='' id='Menu'>
            <div>
                <h2>Select a game!</h2>
            </div>

            <div class="carousel">
                <MenuItem image={SnakeLogo} url='/snake' title='Snake' />
                <MenuItem image={testImg} url='/snake' title='Snake 2' />
            </div>

        </div>

    )
}

export default Menu;