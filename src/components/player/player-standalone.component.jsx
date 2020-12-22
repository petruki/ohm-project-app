import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { findById } from '../../services/api';
import PlayerComponent from './player.component';

const PlayerStandaloneComponent = (props) => {
    const params = useParams();
    const [projectData, setProjectData] = useState(undefined);

    useState(() => {
        if (params.id) {
            findById(params.id).then(data => {
                setProjectData(data);
            });
        }
    });

    return (
        <div>
            {projectData ? <PlayerComponent data={projectData} view={true} info={true} /> : ''}
        </div>
    );
}

export default PlayerStandaloneComponent;