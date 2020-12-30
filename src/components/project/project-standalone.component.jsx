import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { findById } from '../../services/api';
import ProjectComponent from './project.component';

const ProjectStandaloneComponent = (props) => {
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
            {projectData ? <ProjectComponent data={projectData} view={true} info={true} /> : ''}
        </div>
    );
}

export default ProjectStandaloneComponent;