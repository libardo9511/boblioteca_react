import React from 'react';

const HeadTableReaders = () => {
    return (
        <thead>
            <tr>
                <th className="th-sm" scope="col">Name</th>
                <th className="th-sm" scope="col">Surname</th>
                <th className="th-sm" scope="col">ID</th>
                <th className="th-sm" scope="col">Email</th>
                <th className="th-sm" scope="col">Reader Type</th>
            </tr>
        </thead>
    );
}

export default HeadTableReaders;