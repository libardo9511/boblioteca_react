import React from 'react';
import { useEffect, useState } from 'react';
import TableHeadBooks from "../table_books/head_table_books_component";
import TableBodyBooks from "../table_books/body_table_books_component";
import './table_books.style.css';
import SearchBook from '../search_book/search_book.component';
import Alert from '@material-ui/lab/Alert';

const TableBooks = () => {
    const [booksData, setBookData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [showSearchValue, setShowSearchValue] = useState("");

    const [noResultsValue, setNoResultsValue] = useState(false);

    const getBooks = async () => {
        const response = await fetch('http://localhost:3003/api/libros');
        const responseJSON = await response.json();
        setBookData(responseJSON.libros);
    }

    const getBooksSearch = async () => {
        const response = await fetch(`http://localhost:3003/api/libros/buscar/${showSearchValue}`);
        const responseJSON = await response.json();
        if (Object.keys(responseJSON.libros).length >= 1) {
            setBookData(responseJSON.libros);
        }else{
            setNoResultsValue(true);
            setBookData([]);
        }
    }

    useEffect(() => {
        setNoResultsValue(false);        
        if (showSearchValue !== "") {
            getBooksSearch();
        } else {
            getBooks();
        }
    }, [refresh, showSearchValue]);

    return (
        <>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="dataTables_filter">
                            <SearchBook onInputSearch={(textSearch) => {
                                setShowSearchValue(textSearch);
                            }}></SearchBook>
                        </div>
                    </div>
                </div>
                <div className="dataTables_wrapper dt-bootstrap4">
                    <div className="row">
                    {
                        noResultsValue
                        ?<Alert severity="error">No Search Results</Alert>
                        :<></>
                    }
                        <table className="table table-striped table-hover">
                            <TableHeadBooks></TableHeadBooks>
                            <TableBodyBooks books={booksData}></TableBodyBooks>
                        </table>
                        <form>
                            <br></br>
                            <input type="button" value="refresh" onClick={() => {
                                setRefresh(!refresh);
                            }}></input>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TableBooks;