import React from 'react';
import { sync } from '../services/api';
import "bootstrap/dist/css/bootstrap.min.css";

const PlayerComponent = (props) => {

    const onSync = (id) => {
        sync(id);
        var eleman = document.getElementById(id);
        eleman.disabled = true; 
    }

    return (
        <div className="card">
            <div className="card-header">
                <a href={'http://www.ohmstudio.com' + props.data.page} target="_blank" rel="noreferrer">
                    <strong>{props.data.project}</strong>
                </a>
                <button id={props.data._id} className="btn btn-primary btn-sync" onClick={() => onSync(props.data._id)}
                    title="Click to update this project">Sync</button>
            </div>
            <div className="card-body display-flex">
                <div className={props.data.comments.length ? 'project-col' : 'project-col-no-comments'}>
                    {props.data.description ? <div className="row">
                        <div className="panel panel-default col">
                            <div className="panel-heading label-title">Description</div>
                            <div className="panel-body">{props.data.description}</div>
                        </div>
                    </div> : ''}
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
                </div>
                {props.data.comments.length ?
                <div className="project-col">
                    {props.data.comments.map((comment, key) =>
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
                    <source src={props.data.url} />
                </audio>
            </div>
        </div>
    );
}

export default PlayerComponent;