import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import api from '../../services/api';

import 'rc-pagination/assets/index.css';
import './styles.css';

import logoNav from '../../assets/LOGO_black.svg';
import userPlaceholder from '../../assets/User_placeholder.svg';

export default function Home() {
    const [characters, setCharacters] = useState([]);
    const [count, setCount] = useState(0);
    const [pageCurrent, setPageCurrent] = useState(1);

    function handlePageChange(page) {
        console.log(page);
        setPageCurrent(page);
    }

    async function loadCharacters(page) {
        const params = { page };
        const response = await api.get('/characters', { params });
        const { count, results } = response.data;

        setCount(count);
        setCharacters(results);
    }

    useEffect(() => {
        loadCharacters(pageCurrent);
    }, [pageCurrent]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <a href="/home" className="navbar-brand">
                    <img src={logoNav} alt="logo" />
                </a>

                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src={userPlaceholder} width="30" height="30" className="d-inline-block align-right" alt="" />
                            User Name
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Sign Out</a>
                        </div>
                    </li>
                </ul>

            </nav>

            <h3 style={{ paddingLeft: '80px' }} >Characters</h3>
            <div className="container">
                <ul className="character-list">
                    {characters.map((character, index) => (
                        <Link to={{ pathname: `/character/${character.url.split('/')[character.url.split('/').length - 2]}` }} key={index}>
                            <li>
                                <header style={{ backgroundImage: `url(${character.imageUrl})` }} />
                                <span>{character.name}</span>
                            </li>
                        </Link>
                    ))}
                </ul>

                <Pagination
                    className="ant-pagination"
                    onChange={handlePageChange}
                    current={pageCurrent}
                    total={count}
                />
            </div>
        </>
    )
}