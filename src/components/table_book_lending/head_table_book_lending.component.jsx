import React from 'react';

const HeadTableBookLending = () => {
    return (
        <thead>
            <tr>
                <th className="th-sm" scope="col">ISBN</th>
                <th className="th-sm" scope="col">Reader Identification</th>
                <th className="th-sm" scope="col">Loan completion date</th>
                <th className="th-sm" scope="col">Expected return date</th>
                <th className="th-sm" scope="col">Return date</th>                
                <th className="th-sm" scope="col">Penalty</th>
                
            </tr>
        </thead>
    );
}

export default HeadTableBookLending;