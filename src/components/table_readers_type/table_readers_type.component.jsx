import React from 'react';
import { useEffect, useState } from 'react';
import TableHeadReadersType from "../table_readers_type/head_table_readers_type.component";
import TableBodyReadersType from "../table_readers_type/body_table_readers_type.component";

const TableReadersType = () => {

    const [readersTypeData, setReadersTypeData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const getReadersTypeData = async () => {
        const response = await fetch('http://localhost:3003/api/tiposlector');
        const responseJSON = await response.json();
        setReadersTypeData(responseJSON.tipos);
    }

    useEffect(() => {
        getReadersTypeData();
    }, [refresh]);

    return (
        <div className="col-md-8">
            <div className="row">
                <table className="table table-striped table-hover" data-search="true">
                    <TableHeadReadersType></TableHeadReadersType>
                    <TableBodyReadersType readerstype={readersTypeData}></TableBodyReadersType>
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
export default TableReadersType;