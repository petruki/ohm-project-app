const ProjectDetailsComponent = ({ data }) => {
    return (
        <div>
            <div className="row">
                <div className="panel panel-default col">
                    <div className="panel-heading label-title">Admins</div>
                    <div className="panel-body">{data.admins.join(', ')}</div>
                </div>
                {data.contributors.length ? <div className="panel panel-default col">
                    <div className="panel-heading label-title">Contributors</div>
                    <div className="panel-body">{data.contributors.join(', ')}</div>
                </div> : ''}
            </div>
            <div className="row">
                {data.styles.length ? <div className="panel panel-default col">
                    <div className="panel-heading label-title">Styles</div>
                    <div className="panel-body">{data.styles.toString().replace(/,,/g, ', ')}</div>
                </div> : ''}
                {data.moods.length ? <div className="panel panel-default col">
                    <div className="panel-heading label-title">Moods</div>
                    <div className="panel-body">{data.moods.toString().replace(/,,/g, ', ')}</div>
                </div> : ''}
            </div>
        </div> 
    )
}

export default ProjectDetailsComponent;