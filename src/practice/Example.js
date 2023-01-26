import { textAlign } from '@mui/system';
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Example = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div style={{textAlign:'center',margin:'10px'}}>
            
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>
    )

}

export default Example