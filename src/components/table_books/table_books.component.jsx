import React from 'react';
import { useEffect, useState } from 'react';
import TableHeadBooks from "../table_books/head_table_books_component";
import TableBodyBooks from "../table_books/body_table_books_component";
import './table_books.style.css';

const TableBooks = () => {
    const [booksData, setBookData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const getBooks = async () => {
        const response = await fetch('http://localhost:3003/api/libros');
        const responseJSON = await response.json();
        setBookData(responseJSON.libros);
    }

    useEffect(() => {
        getBooks();
    }, [refresh]);

    return (
        <>
            <div className="col-md-8">
                <div className="row">
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
        </>
    );
}
export default TableBooks;