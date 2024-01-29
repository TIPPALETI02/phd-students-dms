import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable(props) {
    return (
        <TableContainer component={Paper}>
            {
                props.students?.length > 0
                    ? <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    props.students?.length > 0 ?
                                        Object.keys(props.students[0]).map((key) => (
                                            <TableCell key={key}>{key}</TableCell>
                                        ))
                                        : <></>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.students?.length > 0
                                    ? props.students.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            {
                                                Object.keys(row).map((key) => (
                                                    <TableCell key={key}>{row[key]}</TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    ))
                                    : <></>
                            }
                        </TableBody>
                    </Table>
                    : <TableHead align="center">
                        <h sr3>No Data Found</h>
                    </TableHead>
            }
        </TableContainer>
    );
}