import React, { useState } from 'react';

export const SearchComponent = (props) => {
    const [search, setSearch] = useState('');
    const [searchOption, setSearchOption] = useState('q');

    const onPressedEnter = (e) => {
        if (e.key === 'Enter') {
            props.setLoading(true);
            props.setResponse(undefined);
            props.handlePageSearch(search, searchOption);
        }
    }
    
    return (
        <div className="card sticky">
            <div className="card-header">Search</div>
            <div className="card-body display-flex panel-search">
                <select className="custom-select" value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
                    <option value="q">Project</option>
                    <option value="style">Style</option>
                    <option value="mood">Mood</option>
                    <option value="collab">Contributor</option>
                    <option value="admin">Admin</option>
                </select>
                <input className="form-control search" type="text" placeholder="Search" value={search}
                    onChange={(e) => setSearch(e.target.value)} onKeyDown={onPressedEnter}></input>
                <button className="btn btn-primary btn-search" onClick={() => props.handlePageSearch(search, searchOption)}>Find</button>
            </div>
        </div>
    ); 
}

export default SearchComponent;