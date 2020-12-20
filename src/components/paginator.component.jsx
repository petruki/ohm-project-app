import React from 'react';
import ReactPaginate from 'react-paginate';

const PaginatorComponent = (props) => {
    return (
        <div className="display-flex float-end">
            <select id="perPage" className="form-control" onChange={props.handleChangePerPage}>
                <option>10</option>
                <option>20</option>
                <option>25</option>
                <option>30</option>
            </select>
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