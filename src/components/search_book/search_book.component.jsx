import React, { useState } from 'react';

const SearchBook = (props) => {

    const [searchBookValue, setSearchValue] = useState();
    const { onInputSearch } = props;

    const handleChangeSearch = (e) => {
        setSearchValue(e.target.value);
        onInputSearch(e.target.value);
    }

    return (
        <div className="form-group row">
            <label className="col-sm-2 col-form-label">Search</label>
            <div className="col-sm-10">
                <input className="form-control form-control-sm" type="search" placeholder="Search ..." onChange={handleChangeSearch}></input>
            </div>
        </div>
    );
}

export default SearchBook;