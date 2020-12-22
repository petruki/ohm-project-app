import React, { useState } from 'react';
import PaginatorComponent from './paginator.component';
import { find } from '../services/api';
import "bootstrap/dist/css/bootstrap.min.css";

import PlayerComponent from './player.component';
import LoadingComponent from './loading.component';
import ControllerComponent from './controller.component';
import { getAll } from '../services/playlist';

const HomeComponent = () => {
    const [response, setResponse] = useState({ data: [] });
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ perPage: 10, page: 1, pages: 0 });
    const [seachHistory] = useState({});
    const [info, setInfoVisible] = useState(false);

    const handlePageClick = (data) => {
        pagination.page = data.selected + 1;
        setPagination(pagination);
        
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
            <ControllerComponent 
                handlePageSearch={handlePageSearch} 
                showPlaylist={showPlaylist} 
                toggleInfo={toggleInfo} />
                
            {!loading ?
                <div>
                    {response.data.map((data, key) => 
                        <PlayerComponent key={key} data={data} info={info} />
                    )}
                    {response.data.length ?
                        <PaginatorComponent 
                            pages={pagination.pages} 
                            handlePageClick={handlePageClick} /> : ''}
                </div> : 
                <LoadingComponent />
            }
        </div>
    );
}

export default HomeComponent;