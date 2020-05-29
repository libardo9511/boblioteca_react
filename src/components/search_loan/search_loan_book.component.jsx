import React, { useState } from 'react';

const SearchLoanBook = (props) => {

    const [searchLoanBookValue, setSearchLoanValue] = useState();
    const { onInputLoanSearch } = props;

    const handleChangeSearchLoan = (e) => {
        setSearchLoanValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onInputLoanSearch(searchLoanBookValue);        
    }

    return (
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Search</label>
            <div className="col-sm-6">
                <input className="form-control form-control-sm" type="search" placeholder="Search ..." onChange={handleChangeSearchLoan}></input>
            </div>
            <div className="col-sm-4">
                <button className="form-control btn btn-secondary" type="submit" onClick={(e)=>{
                    onSubmit(e);
                }}>Buscar</button>
            </div>
        </div>
    );
}

export default SearchLoanBook;