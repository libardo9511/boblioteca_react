import React from 'react';
import { useEffect, useState } from 'react';
import TableHeadBooksLending from "./head_table_book_lending.component";
import TableBodyBooksLending from "./body_table_book_lending.component";
import SearchLoanBook from "../search_loan/search_loan_book.component";
import './table_book_lending.style.css';
import Alert from '@material-ui/lab/Alert';
import DataTypeReader from "../data_type_readers/data_type_reader_modal.component";


const TableBooksLending = () => {
    const [booksLendingData, setBookLendingData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const [textSearchLoanValue, setTextSearchLoanValue] = useState("");

    const [message, setMessage] = useState("");

    const [showModalView, setShowModalView] = useState(false);

    const [dataEdit, setDataEdit] = useState(null);




    const getBooksLending = async () => {
        const response = await fetch('http://localhost:3003/api/prestamos');
        const responseJSON = await response.json();
        setBookLendingData(responseJSON.prestamos);
        setMessage("");
    }

    const getBooksLendingSearch = async () => {
        const response = await fetch(`http://localhost:3003/api/prestamos/lector/${textSearchLoanValue}`);
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (responseJSON.prestamos !== null) {
            if (Object.keys(responseJSON.prestamos).length >= 1) {
                setBookLendingData(responseJSON.prestamos);
            } else {
                setBookLendingData([]);
                console.log(responseJSON.message);
                setMessage("");
            }
        } else {
            setBookLendingData([]);
            setMessage(responseJSON.message);
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        setTextSearchLoanValue("");
        getBooksLending();
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
            <div className="col-md-8" >
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <div className="dataTables_filter">
                            <div className="col-sm-6">
                                <button className="form-control btn btn-secondary" type="submit" onClick={(e) => {
                                    onSubmit(e);
                                }}>Show All</button>
                            </div>
                        </div>
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
                        {
                            message !== ""
                                ? <Alert severity="error">No Search Results - {message}</Alert>
                                : <></>
                        }
                        <table className="table table-striped table-hover">
                            <TableHeadBooksLending></TableHeadBooksLending>
                            <TableBodyBooksLending booksLending={booksLendingData} onEnabledModal={(showModal) => {
                                setShowModalView(showModal);
                            }} onEnabledModalData={(data) => {
                                setDataEdit(data);
                            }}></TableBodyBooksLending>
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
            {
                showModalView
                    ? <DataTypeReader edit={dataEdit} onEnabledModal={(showModal) => {
                        console.log("papá: " + showModal.toString());
                        setShowModalView(showModal);
                    }}></DataTypeReader>
                    : <></>
            }
        </>
    );
}
export default TableBooksLending;