import React from 'react';

export const FooterComponent = (props) => {
    return (
        <footer className="footer center">
            <span className="text-muted">Created by Roger Floriano - 2020</span>
            <p>
                <a rel="noopener noreferrer" target="_blank"href="mailto:roger.petruki@gmail.com">Contact</a>
            </p>
            <div className="footer-right">
                <a className="link" href="https://github.com/petruki" target="_black">
                    <img src="../assets/github.svg" width="30px;" alt="GitHub"/>
                </a>
            </div>
        </footer>
    ); 
}

export default FooterComponent;