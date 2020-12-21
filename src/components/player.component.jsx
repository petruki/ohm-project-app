import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findById, sync } from '../services/api';
import "bootstrap/dist/css/bootstrap.min.css";

const PlayerComponent = (props) => {
    const params = useParams();
    const [view, setView] = useState(false);
    const [projectData, setProjectData] = useState(props.data);

    const onSync = (e, id) => {
        e.preventDefault();

        sync(id);
        var eleman = document.getElementById(id);
        eleman.style.display = 'none'; 
    }

    const toggleView = (e) => {
        e.preventDefault();
        setView(!view);
    }

    useState(() => {
        if (params.id) {
            findById(params.id).then(data => {
                setProjectData(data);
                setView(true);
            });
        }
    });

    return (
        <div>
            {projectData ?
            <div className="card">
                <div className="card-header">
                    <a href={'http://www.ohmstudio.com' + projectData.page} target="_blank" rel="noreferrer">
                        <strong>{projectData.project}</strong>
                    </a>
                </div>
                <div className="card-body display-flex">
                    <div className={projectData.comments.length ? 'project-col' : 'project-col-no-comments'}>
                        <div className="row">
                            <div className="panel panel-default col">
                                <div className="panel-heading label-title">Description</div>
                                <div className="panel-body">{projectData.description}</div>
                            </div>
                            <div className="dropdown player-menu">
                                <span className="nav-item nav-link player-menu">Options</span>
                                <div className="dropdown-content">
                                    <Link className="nav-item nav-link" to={`/project/${projectData._id}`} target="_blank">
                                        <i className="fa fa-level-down"></i> Open
                                    </Link>
                                    <a className="nav-item nav-link" href="/" onClick={toggleView}>
                                        <i className="fa fa-search-plus"></i> Show/Hide Detail
                                    </a>
                                    <hr />
                                    <a id={projectData._id} className="nav-item nav-link" href="/" onClick={(e) => onSync(e, projectData._id)}>
                                        <i className="fa fa-cloud-download"></i> Sync
                                    </a>
                                </div>
                            </div>
                        </div>
                        {view ?
                            <div>
                            <div className="row">
                                <div className="panel panel-default col">
                                    <div className="panel-heading label-title">Admins</div>
                                    <div className="panel-body">{projectData.admins.join(', ')}</div>
                                </div>
                                {projectData.contributors.length ? <div className="panel panel-default col">
                                    <div className="panel-heading label-title">Contributors</div>
                                    <div className="panel-body">{projectData.contributors.join(', ')}</div>
                                </div> : ''}
                            </div>
                            <div className="row">
                                {projectData.styles.length ? <div className="panel panel-default col">
                                    <div className="panel-heading label-title">Styles</div>
                                    <div className="panel-body">{projectData.styles.toString().replace(/,,/g, ', ')}</div>
                                </div> : ''}
                                {projectData.moods.length ? <div className="panel panel-default col">
                                    <div className="panel-heading label-title">Moods</div>
                                    <div className="panel-body">{projectData.moods.toString().replace(/,,/g, ', ')}</div>
                                </div> : ''}
                            </div>
                        </div> : ''}
                    </div>
                    {view && projectData.comments.length ?
                    <div className="project-col">
                        {projectData.comments.map((comment, key) =>
                            <div key={key} className="project-comment">
                                <span className="label-title">{comment.author}</span>
                                <span className="float-end">{comment.date}</span><br/>
                                <hr />
                                <p>{comment.content}</p>
                            </div>
                        )}
                    </div> : ''}
                </div>
                <div className="card-footer row project-audio">
                    <audio controls>
                        <source src={projectData.url} />
                    </audio>
                </div>
            </div> : ''}
        </div>
    );
}

export default PlayerComponent;