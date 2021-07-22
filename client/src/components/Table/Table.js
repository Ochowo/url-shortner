/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import { redirectUrl, noAuthredirectUrl } from '../../features/DashBoard/urlSlice';
// import { loading } from '../../features/Signup/signUpSlice';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#5d5d5d',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const App = ({ products, noAuth, isLoading }) => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [product, setProduct] = React.useState(products);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    console.log('vjhg');
    setProduct(products);
  }, [products]);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };
  const onClick = (url, shortUrl) => {
    console.log('clicking', noAuth, url);
    if (noAuth) {
      console.log('right');
      dispatch(noAuthredirectUrl(shortUrl));
    } else {
      dispatch(redirectUrl(shortUrl));
    }
    window.location.href = url;
  };
  console.log(product, 'lkj');
  const classes = useStyles();
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Url</StyledTableCell>
              <StyledTableCell align="right">Short Url</StyledTableCell>
              {!noAuth && <StyledTableCell align="right">Clicks</StyledTableCell>}
              <StyledTableCell align="right"> </StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading === true ? 'Loading....' : products === null || products === undefined || products.length === 0 ? (
              <>
                {' '}
                <StyledTableCell align="right">
                  No urls found
                </StyledTableCell>
              </>
            ) : (
              <>
                {' '}
                {products !== null && products.slice(page * rowsPerPage, page
                * rowsPerPage + rowsPerPage).map((item) => {
                  console.log(products, product, 'good', item, 'purple');
                  return (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell component="th" scope="row">
                        {item.url}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.shortUrl}
                      </StyledTableCell>
                      {!noAuth && (
                      <StyledTableCell align="right">
                        {item.clicks}
                      </StyledTableCell>
                      )}
                      <StyledTableCell align="right"><Button text="Redirect" className="border-2 border-mainBlue rounded text-mainBlue w-3/6 p-2 text-sm px-10 flex justify-center" onClick={() => onClick(item.url, item.shortUrl)} /></StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </>
            )}

          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}

      />
    </>
  );
};
App.propTypes = {
  isLoading: PropTypes.bool,
  noAuth: PropTypes.bool,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      shortUrl: PropTypes.string,
      clicks: PropTypes.string,
    }),
  ),
};

export default App;
