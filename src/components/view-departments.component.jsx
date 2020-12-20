import React, { useState } from 'react';
import PaginatorComponent from './paginator.component';
import { find, sync } from '../services/api';
import "bootstrap/dist/css/bootstrap.min.css";

const ViewDepartmentsComponent = () => {
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ perPage: 10, page: 1, pages: 0 });
    const [search, setSearch] = useState('');
    const [searchOption, setSearchOption] = useState('q');

    const handlePageClick = (data) => {
        pagination.page = data.selected + 1;
        setPagination(pagination);

        find(search, searchOption, pagination).then(data => {
            pagination.pages = data.meta.pages;
            setResponse(data);
            setPagination(pagination)
            setLoading(false);
        });
    };

    const handleChangePerPage = (event) => {
        pagination.perPage = event.target.value;
        setPagination(pagination);
        handlePageClick({ selected: 0 });
    }

    const onPressedEnter = (e) => {
        if (e.key === 'Enter') {
            setLoading(true);
            setResponse(undefined);
            handlePageClick({ selected: 0 });
        }
    }

    const onSync = (id) => {
        sync(id);
        var eleman = document.getElementById(id);
        eleman.disabled = true; 
    }

    useState(() => {
        handlePageClick({ selected: 0 });
    });

    return (
        <div>
            <div className="card">
                <div className="card-header">Search</div>
                <div className="card-body display-flex">
                    <select className="custom-select" value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
                        <option value="q">Project</option>
                        <option value="style">Style</option>
                        <option value="mood">Mood</option>
                        <option value="collab">Contributor</option>
                        <option value="admin">Admin</option>
                    </select>
                    <input className="form-control search" type="text" placeholder="Search" value={search}
                        onChange={(e) => setSearch(e.target.value)} onKeyDown={onPressedEnter}></input>
                    <button className="btn btn-primary btn-search" onClick={() => handlePageClick({ selected: 0 })}>Find</button>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    {!loading ?
                        <div>
                            {response.data.map((data, key) => 
                                <div key={key} className="card">
                                    <div className="card-header">
                                        <a href={'http://www.ohmstudio.com' + data.page} target="_blank" rel="noreferrer">
                                            <strong>{data.project}</strong>
                                        </a>
                                        <button id={data._id} className="btn btn-primary btn-sync" onClick={() => onSync(data._id)}>Sync</button>
                                    </div>
                                    <div className="card-body display-flex">
                                        <div className="project-col">
                                            <p><span className="label-title">Description:</span> {data.description}</p>
                                            <p><span className="label-title">Admins:</span> {data.admins.join(', ')}</p>
                                            <p><span className="label-title">Contributors:</span> {data.contributors.join(', ')}</p>
                                            <p><span className="label-title">Styles:</span> {data.styles.toString().replace(/,,/g, ', ')}</p>
                                            <p><span className="label-title">Moods:</span> {data.moods.toString().replace(/,,/g, ', ')}</p>
                                            <audio controls>
                                                <source src={data.url} />
                                            </audio>
                                        </div>
                                        <div className="project-col project-comment-container">
                                            {data.comments.map((comment, key) =>
                                                <div key={key} className="project-comment">
                                                    <span className="label-title">Author:</span> {comment.author}
                                                    <span className="float-end">{comment.date}</span><br/>
                                                    <hr />
                                                    <p>{comment.content}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <PaginatorComponent 
                                pages={pagination.pages} 
                                handlePageClick={handlePageClick} 
                                handleChangePerPage={handleChangePerPage} />
                        </div> : 
                        <div className="center">
                            <hr className="left-separator" />
                                <div className="spinner-border text-secondary center" role="status" />
                            <hr className="right-separtor" />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ViewDepartmentsComponent;