import React, { useState } from 'react';
import { find } from '../../services/api';

import PaginatorComponent from '../paginator/paginator.component';
import PlayerComponent from '../player/player.component';
import LoadingComponent from '../loading/loading.component';
import HomeHeaderComponent from '../home-header/home-header.component';
import { getAll } from '../../services/playlist';

import './home.css';

const HomeComponent = () => {
    const [response, setResponse] = useState({ data: [] });
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ perPage: 10, page: 1, pages: 0 });
    const [seachHistory] = useState({});
    const [info, setInfoVisible] = useState(false);

    const handlePageClick = (data) => {
        pagination.page = data.selected + 1;
        setPagination(pagination);
        
        setResponse({ data: [] });
        find(seachHistory.search, seachHistory.searchOption, pagination).then(data => {
            pagination.pages = data.meta.pages;
            setPagination(pagination)
            setResponse(data);
            setLoading(false);
        });
    };

    const handlePageSearch = (search, searchOption) => {
        seachHistory.search = search;
        seachHistory.searchOption = searchOption;

        pagination.page = 1;
        setLoading(true);
        handlePageClick({ selected: 0 });
    }

    const showPlaylist = () => {
        setLoading(true);
        
        // little trick to update audio src
        setTimeout(() => {
            let data = {...response.data};
            data = getAll();
            setResponse({ data });
            setLoading(false);
        }, 300);
    }

    const toggleInfo = () => {
        setInfoVisible(!info);
    }

    return (
        <div>
            <HomeHeaderComponent 
                handlePageSearch={handlePageSearch} 
                showPlaylist={showPlaylist} 
                toggleInfo={toggleInfo} />
                
            {!loading ?
                <div>
                    {response.data.map((data, key) => 
                        <PlayerComponent key={key} data={data} info={info} />
                    )}
                    {response.data ?
                        <PaginatorComponent 
                            pages={pagination.pages} 
                            handlePageClick={handlePageClick} /> : ''}
                    
                    {!response.data.length ?
                        // Page Content 
                        <div id="home-wrapper" className="container">
                            <img id="ohmplayerbg" src="../assets/ohmplayer_bg.png" alt="Ohm Player"></img>
                        </div> : ''}
                </div> : 
                <LoadingComponent />
            }
        </div>
    );
}

export default HomeComponent;