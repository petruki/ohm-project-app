const ProjectCommentsComponent = ({ comments }) => {
    return (
        <div className="col">
            {comments.map((comment, key) =>
                <div key={key} className="project-comment">
                    <span className="label-title">{comment.author}</span>
                    <span className="float-end">{comment.date}</span><br/>
                    <hr />
                    <p>{comment.content}</p>
                </div>
            )}
        </div>
    )
}

export default ProjectCommentsComponent;