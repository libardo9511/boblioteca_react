import React from 'react';
import { useEffect, useState } from 'react';
import TableHeadReaders from "../table_readers/head_table_readers.component";
import TableBodyReaders from "../table_readers/body_table_readers.component";

const TableReaders = () => {

    const [readersData, setReadersData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const getReaders = async () => {
        const response = await fetch('http://localhost:3003/api/lectores');
        const responseJSON = await response.json();
        setReadersData(responseJSON.lectores);
        console.log(responseJSON.lectores);
    }

    useEffect(() => {
        getReaders();
    }, [refresh]);

    return (
        <div className="col-md-8">
            <div className="row">
                <table className="table table-striped table-hover">
                    <TableHeadReaders></TableHeadReaders>
                    <TableBodyReaders readers={readersData}></TableBodyReaders>
                </table>
                <form>
                    <br></br>
                    <input type="button" value="refresh" onClick={() => {
                        setRefresh(!refresh);
                    }}></input>
                </form>
            </div>
        </div>
    );
}
export default TableReaders;