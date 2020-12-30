import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { save, isSaved, remove } from '../../services/playlist';

import './project.css';

const ProjectOptionsComponent = ({ data, openModal }) => {
    const bookmarkRef = useRef(null);

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
        <div className="dropdown player-menu">
            <span className="nav-item nav-link player-menu">Options</span>
            <div className="dropdown-content">
                <Link className="nav-item nav-link" to={`/project/${data._id}`}>
                    <i className="fa fa-level-down"></i> Open
                </Link>
                <a ref={bookmarkRef} className="nav-item nav-link" href="/"
                    onClick={(e) => onBookmark(e, data._id, data)}>
                    {isSaved(data._id) ? 'Remove Playlist' : 'Add Playlist'}
                </a>
                <hr />
                <a id={data._id} className="nav-item nav-link" href="/" onClick={(e) => openModal(e, data._id)}>
                    <i className="fa fa-cloud-download"></i> Sync
                </a>
            </div>
        </div>
    )
}

export default ProjectOptionsComponent;