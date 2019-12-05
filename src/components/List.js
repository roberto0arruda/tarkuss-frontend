import React from 'react';
import { Link } from 'react-router-dom';

function List(props) {
    return (
        <>
            {props.characters.length > 0 ? (
                <div className="row row-cols-5">
                    {props.characters.map((character, index) => (
                        <div className="col-sm" key={index}>
                            <Link to={{ pathname: `/character/${character.url.split('/')[character.url.split('/').length - 2]}` }}>
                                <header style={{ backgroundImage: `url(${character.imageUrl})` }} />
                                <label>{character.name}</label>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                    <div className="spinner-border text-warning" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                )}

        </>
    )
}

export default List;