import React, { useState, useRef } from 'react';

export const ControllerComponent = (props) => {
    const [search, setSearch] = useState('');
    const [searchOption, setSearchOption] = useState('q');
    const searchRef = useRef(null);
    let prevScrollpos;

    const onSearch = (e) => {
        e.preventDefault();
        
        setSearch('');
        props.handlePageSearch(search, searchOption);
    }

    const scrollMenuHandler = () => {
        window.onscroll = function () {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                searchRef.current.style.top = "0";
            } else {
                searchRef.current.style.top = "-200px";
            }
            prevScrollpos = currentScrollPos;
        }
    }

    scrollMenuHandler();
    
    return (
        <div ref={searchRef} className="card sticky">
            <div className="card-header">Search</div>
            <div className="card-body display-flex panel-search">
                <select className="custom-select" value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
                    <option value="q">Project</option>
                    <option value="style">Style</option>
                    <option value="mood">Mood</option>
                    <option value="collab">Contributor</option>
                    <option value="admin">Admin</option>
                </select>
                <form onSubmit={(e) => onSearch(e)}>
                    <input className="form-control search" type="text" placeholder="Search" value={search} required
                        onChange={(e) => setSearch(e.target.value)}></input>
                    <button className="btn btn-dark">Find</button>
                </form>
                <button className="btn btn-dark" onClick={() => props.showPlaylist()}>Playlist</button>
                <button className="btn btn-dark" onClick={() => props.toggleInfo()}>Info</button>
            </div>
        </div>
    ); 
}

export default ControllerComponent;