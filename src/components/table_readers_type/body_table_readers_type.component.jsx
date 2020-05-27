import React from 'react';
import { Link } from 'react-router-dom';

const TableReadersTypeBody = (props) => {

    const getReadersTypeData = async (id) => {
        //window.location.assign(`http://localhost:3000/api/tiposlector/${id}`);

    }

    return (
        <tbody>
            {props.readerstype.map((row) => (
                <tr key={row._id}>
                    <th>{row._id}</th>
                    <th>{row.descripcion}</th>
                    <th>
                        <button type="submit" className="btn btn-success" onClick={() => getReadersTypeData(row._id)}>
                        <Link to={`/readerstype/${row._id}`}>
                            View
                        </Link></button>
                    </th>
                </tr>
            ))}
        </tbody>
    );
}

export default TableReadersTypeBody;