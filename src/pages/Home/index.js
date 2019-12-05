import React, { useEffect, useState } from 'react';
import Pagination from 'rc-pagination';
import api from '../../services/api';
import NavBar from '../../components/NavBar';
import List from '../../components/List';
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
        setCharacters([]);
        loadCharacters(pageCurrent);
    }, [pageCurrent]);

    return (
        <>
            <NavBar />
            <div id="page-content">
                <h3 style={{ paddingLeft: '80px' }}>Characters</h3>
                <div className="container text-center character-label-group">
                    <List characters={characters} />
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