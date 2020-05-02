import React from 'react';
import { useHistory } from 'react-router-dom';

/**
 * @param {*} props props.{image, title, url}
 */
const MenuItem = (props) => {
    const history = useHistory();

    // const handlePlay = (e) => {
    //     e.preventDefault();
    //     history.push(props.url);
    // }

    return (
        <div class="carousel-item">
            <div class="card">
                <div class="card-image">
                    <img src={props.image} />
                    <span class="card-title">{props.title}</span>
                </div>
                <div class="card-action center-align">
                    <a href={props.url}>Play !</a>
                </div>
            </div>
        </div>
    )
}

export default MenuItem;