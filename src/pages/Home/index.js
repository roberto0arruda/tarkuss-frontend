import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import api from '../../services/api';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

import 'rc-pagination/assets/index.css';
import './styles.css';

export default function Home() {
    const [characters, setCharacters] = useState([]);
    const [count, setCount] = useState(0);
    const [pageCurrent, setPageCurrent] = useState(1);

    function handlePageChange(page) {
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
            <NavBar />
            <div id="page-content">
                <h3 style={{ paddingLeft: '80px' }}>Characters</h3>
                <div class="container text-center">
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
            </div>
            <Footer />
        </>
    )
}