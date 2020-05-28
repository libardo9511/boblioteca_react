import React from 'react';
import { useEffect, useState } from 'react';
import TableHeadBooksLending from "./head_table_book_lending.component";
import TableBodyBooksLending from "./body_table_book_lending.component";
import './table_book_lending.style.css';

const TableBooksLending = () => {
    const [booksLendingData, setBookLendingData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const getBooksLending = async () => {
        const response = await fetch('http://localhost:3003/api/prestamos');
        const responseJSON = await response.json();
        setBookLendingData(responseJSON.prestamos);
    }

    useEffect(() => {
        getBooksLending();
    }, [refresh]);

    return (
        <>
            <div className="col-md-8">
                <div className="row">
                    <table className="table table-striped table-hover">
                        <TableHeadBooksLending></TableHeadBooksLending>
                        <TableBodyBooksLending booksLending={booksLendingData}></TableBodyBooksLending>
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
export default TableBooksLending;