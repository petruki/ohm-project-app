import React, { useState } from 'react';
import { sync } from '../../services/api';
import { save, isSaved } from '../../services/playlist';
import LoadingComponent from '../loading/loading.component';
import Modal from 'react-modal';

import './project.css';
import ProjectOptionsComponent from './project-options.component';
import ProjectCommentsComponent from './project-comments.component';
import ProjectDetailsComponent from './project-details.component';

const modalStyle = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
        zIndex: 1000
    }
};

Modal.setAppElement('#root');

const ProjectComponent = (props) => {
    const [loading, setLoading] = useState(false);
    const [view, setView] = useState(props.view ? props.view : false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [cookie, setCookie] = useState(undefined);
    const [selectedProjectId, setSelectedProjectId] = useState(undefined);

    const onSync = (id, cookie) => {
        setLoading(true);
        sync(id, cookie).then(data => {
            if (isSaved(id))
                save(id, data);
                
            Object.assign(props.data, data);
            setLoading(false);
        });
        var eleman = document.getElementById(id);
        eleman.style.display = 'none'; 
    }

    const onAfterOpen = () => {
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
    }

    const onChange = (e) => {
        setCookie(e.target.value);
    }

    const openModal = (e, id) => {
        e.preventDefault();

        setIsOpen(true);
        setCookie(undefined);
        setSelectedProjectId(id);
    }
    
    const closeModal = () => {
        setIsOpen(false);
        document.getElementsByTagName('body')[0].style.overflowY = 'scroll';

        if (selectedProjectId && cookie) {
            onSync(selectedProjectId, cookie);
        }
    }

    const toggleView = (e) => {
        setView(!view);
    }

    return (
        <div className="card">
            {!loading ?
            <div>
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
                            <ProjectOptionsComponent data={props.data} openModal={openModal} />
                        </div>
                        {view ?
                        <ProjectDetailsComponent data={props.data} />: ''}
                    </div>
                    {view && props.data.comments.length ?
                    <ProjectCommentsComponent comments={props.data.comments} /> : ''}
                </div> : ''}
                <div className="card-footer row project-audio">
                    <audio controls>
                        <source src={props.data.url} />
                    </audio>
                </div>
            </div> : <LoadingComponent />}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                onAfterOpen={onAfterOpen}
                style={modalStyle}
                className="Modal"
                contentLabel="Cookie Entry">

                <div>
                    <label>Cookie Entry</label><br />
                    <input type="text" onChange={(e) => onChange(e)} />
                    <button className="btn btn-dark" onClick={closeModal}>Continue</button>
                </div>
            </Modal>
        </div>
    );
}

export default ProjectComponent;