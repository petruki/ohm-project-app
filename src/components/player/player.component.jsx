import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { sync } from '../../services/api';
import { save, isSaved, remove } from '../../services/playlist';

import './player.css';

const PlayerComponent = (props) => {
    const [view, setView] = useState(props.view ? props.view : false);
    const bookmarkRef = useRef(null);

    const onSync = (e, id) => {
        e.preventDefault();

        sync(id);
        var eleman = document.getElementById(id);
        eleman.style.display = 'none'; 
    }

    const toggleView = (e) => {
        setView(!view);
    }

    const onBookmark = (e, id, project) => {
        e.preventDefault();

        if (isSaved(id)) {
            remove(id);
            bookmarkRef.current.text = 'Add Playlist';
        } else {
            save(id, project);
            bookmarkRef.current.text = 'Remove Playlist';
        }
    }

    return (
        <div className="card">
            <div className="card-header" onClick={toggleView}>
                <a href={'http://www.ohmstudio.com' + props.data.page} target="_blank" rel="noreferrer">
                    <strong>{props.data.project}</strong>
                </a>
            </div>
            {props.info || view ?
            <div className="card-body">
                <div className={props.data.comments.length ? 'col' : 'project-col-no-comments'}>
                    <div className="row">
                        <div className="panel panel-default col">
                            <div className="panel-heading label-title">Description</div>
                            <div className="panel-body">{props.data.description}</div>
                        </div>
                        <div className="dropdown player-menu">
                            <span className="nav-item nav-link player-menu">Options</span>
                            <div className="dropdown-content">
                                <Link className="nav-item nav-link" to={`/project/${props.data._id}`} target="_blank">
                                    <i className="fa fa-level-down"></i> Open
                                </Link>
                                <a ref={bookmarkRef} className="nav-item nav-link" href="/"
                                    onClick={(e) => onBookmark(e, props.data._id, props.data)}>
                                    {isSaved(props.data._id) ? 'Remove Playlist' : 'Add Playlist'}
                                </a>
                                <hr />
                                <a id={props.data._id} className="nav-item nav-link" href="/" onClick={(e) => onSync(e, props.data._id)}>
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
                                <div className="panel-body">{props.data.admins.join(', ')}</div>
                            </div>
                            {props.data.contributors.length ? <div className="panel panel-default col">
                                <div className="panel-heading label-title">Contributors</div>
                                <div className="panel-body">{props.data.contributors.join(', ')}</div>
                            </div> : ''}
                        </div>
                        <div className="row">
                            {props.data.styles.length ? <div className="panel panel-default col">
                                <div className="panel-heading label-title">Styles</div>
                                <div className="panel-body">{props.data.styles.toString().replace(/,,/g, ', ')}</div>
                            </div> : ''}
                            {props.data.moods.length ? <div className="panel panel-default col">
                                <div className="panel-heading label-title">Moods</div>
                                <div className="panel-body">{props.data.moods.toString().replace(/,,/g, ', ')}</div>
                            </div> : ''}
                        </div>
                    </div> : ''}
                </div>
                {view && props.data.comments.length ?
                <div className="col">
                    {props.data.comments.map((comment, key) =>
                        <div key={key} className="project-comment">
                            <span className="label-title">{comment.author}</span>
                            <span className="float-end">{comment.date}</span><br/>
                            <hr />
                            <p>{comment.content}</p>
                        </div>
                    )}
                </div> : ''}
            </div> : ''}
            <div className="card-footer row project-audio">
                <audio controls>
                    <source src={props.data.url} />
                </audio>
            </div>
        </div>
    );
}

export default PlayerComponent;