import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BodyTableBookLending = (props) => {

    const [dataSelected, setDataSelected] = useState(null);
    const [showModalValue, setShowModalValue] = useState(false);

    const { onEnabledModal } = props;

    return (
        <tbody>
            {props.booksLending.map((row) => (
                <tr key={row._id} onClick={() => {
                    setDataSelected(row);
                    onEnabledModal(true, row);
                    console.log(row);
                }}>
                    <th>{row.idLibro.cod_isbn}</th>
                    <th>{row.idLector.identificacion}</th>
                    <th>{row.fechaPrestamo}</th>
                    <th>{row.fecha_dev_esperada}</th>
                    <th>{row.fecha_dev}</th>
                    <th>{row.multa}</th>
                </tr>
            ))}
        </tbody>

    );
}

export default BodyTableBookLending;