import React from 'react';
import ReactPaginate from 'react-paginate';

import './paginator.css';

const PaginatorComponent = (props) => {
    return (
        <div className="row center pagination-container">
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={props.pages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={props.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'} />
        </div>
    );
}

export default PaginatorComponent;