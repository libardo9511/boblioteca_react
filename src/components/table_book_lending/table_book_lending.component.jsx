import React from 'react';
import { useEffect, useState } from 'react';
import TableHeadBooksLending from "./head_table_book_lending.component";
import TableBodyBooksLending from "./body_table_book_lending.component";
import SearchLoanBook from "../search_loan/search_loan_book.component";
import './table_book_lending.style.css';

const TableBooksLending = () => {
    const [booksLendingData, setBookLendingData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const [textSearchLoanValue, setTextSearchLoanValue] = useState("");


    const getBooksLending = async () => {
        const response = await fetch('http://localhost:3003/api/prestamos');
        const responseJSON = await response.json();
        setBookLendingData(responseJSON.prestamos);
    }

    const getBooksLendingSearch = async () => {
        const response = await fetch(`http://localhost:3003/api/prestamos/lector/${textSearchLoanValue}`);
        const responseJSON = await response.json();
        if (Object.keys(responseJSON.prestamos).length >= 1) {
            setBookLendingData(responseJSON.prestamos);
        } else {
            setBookLendingData([]);
        }
    }

    useEffect(() => {
        if (textSearchLoanValue !== "") {
            getBooksLendingSearch();
        } else {
            getBooksLending();
        }
    }, [refresh, textSearchLoanValue]);

    return (
        <>
            <div className="col-md-8">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="dataTables_filter">
                            <SearchLoanBook onInputLoanSearch={(textSearchLoan) => {
                                console.log(textSearchLoan);
                                setTextSearchLoanValue(textSearchLoan);
                            }}></SearchLoanBook>
                        </div>
                    </div>
                </div>
                <div className="dataTables_wrapper dt-bootstrap4">
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
            </div>
        </>
    );
}
export default TableBooksLending;