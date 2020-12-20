import React, { useState } from 'react';
import PaginatorComponent from './paginator.component';
import { find } from '../services/api';
import "bootstrap/dist/css/bootstrap.min.css";

import PlayerComponent from './player.component';
import LoadingComponent from './loading.component';
import SearchComponent from './search.component';

const HomeComponent = () => {
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ perPage: 10, page: 1, pages: 0 });
    let seachHistory = {};

    const handlePageClick = (data) => {
        pagination.page = data.selected + 1;
        setPagination(pagination);

        find(seachHistory.search, seachHistory.searchOption, pagination).then(data => {
            pagination.pages = data.meta.pages;
            setResponse(data);
            setPagination(pagination)
            setLoading(false);
        });
    };

    const handleChangePerPage = (event) => {
        pagination.perPage = event.target.value;
        setPagination(pagination);
        handlePageClick(seachHistory.search, seachHistory.searchOption, { selected: 0 });
    }

    const handlePageSearch = (search, searchOption) => {
        seachHistory.search = search;
        seachHistory.searchOption = searchOption;
        handlePageClick({ selected: 0 });
    }

    useState(() => {
        handlePageClick({ selected: 0 });
    });

    return (
        <div>
            <SearchComponent 
                handlePageSearch={handlePageSearch} 
                setLoading={setLoading} 
                setResponse={setResponse} />
            <div className="card">
                <div className="card-body">
                    {!loading ?
                        <div>
                            {response.data.map((data, key) => 
                                <PlayerComponent key={key} data={data} />
                            )}
                            <PaginatorComponent 
                                pages={pagination.pages} 
                                handlePageClick={handlePageClick} 
                                handleChangePerPage={handleChangePerPage} />
                        </div> : 
                        <LoadingComponent />
                    }
                </div>
            </div>
        </div>
    );
}

export default HomeComponent;