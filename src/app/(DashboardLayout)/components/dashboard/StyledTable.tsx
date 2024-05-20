"use client"
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

interface Column {
  id: 'name' | 'email' | 'number' | 'orderid' | 'paymentstatus' | 'price'; // Add 'price' to Column type
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'number', label: 'Phone Number', minWidth: 100, align: 'right' },
  { id: 'orderid', label: 'Order Id', minWidth: 100, align: 'right' },
  { id: 'paymentstatus', label: 'Payment Status', minWidth: 100, align: 'right' },
  { id: 'price', label: 'Price', minWidth: 100, align: 'right' }, // Add price column
];

interface Data {
  name: string;
  email: string;
  number: number;
  orderid: string;
  paymentstatus: boolean;
  price: number; // Add price property
}

function createData(
  name: string,
  email: string,
  number: number,
  orderid: string,
  paymentstatus: boolean,
  price: number // Accept price as a parameter
): Data {
  return { name, email, number, orderid, paymentstatus, price }; // Include price in the returned object
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allUsers, setAllUsers] = React.useState<Data[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/users');
      setAllUsers(response.data.userdetails.map((user: any) => 
        createData(user.name, user.email, user.phone, user.orderid, user.paymentstatus, user.price)
      ).reverse());
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    setAllUsers(prevUsers => [...prevUsers].reverse());
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <h3 style={{ paddingLeft: "16px" }}>Customer Overview</h3>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.orderid}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'paymentstatus' ? (
                              <span style={{ color: row.paymentstatus ? 'green' : 'red' }}>
                                {row.paymentstatus ? 'Success' : 'Fail'}
                              </span>
                            ) : column.id === 'number' ? (
                              // Display phone number
                              value.toString()
                            ) : (
                              column.format && typeof value === 'number' ?
                              column.format(value) : value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={allUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
