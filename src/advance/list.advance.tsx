import React from "react";
import { Link, generatePath } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

import { useDebounce } from "use-debounce";

const useUserCollection = () => {

  const [filter, setFilter] = React.useState("");
  const [userCollection, setUserCollection] = React.useState([]);

  const [debounceFilter] = useDebounce(filter, 500);

  React.useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?name=${filter}`)
      .then(response => response.json())
      .then(json => setUserCollection(json.results ? json.results : []));
  }, [debounceFilter]) // delay 500 mls

  return { filter, setFilter, userCollection }
}

export const AdvanceListPage = () => {

  const { filter, setFilter, userCollection } = useUserCollection();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">
              <Link to={generatePath('/')}>
                <Button variant="contained" color="primary">
                  Return to the basic exercise
                </Button>
              </Link>
            </TableCell>
            <TableCell align="center">
              <TextField
                autoFocus={true}
                type="text"
                value={filter}
                id="filled-basic" label="Character" variant="filled"
                style={{ width: '300px' }}
                onChange={(e) => setFilter(e.target.value)}
              />
            </TableCell>
            <TableCell align="right"> Author: Miguel Cobo
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Avatar</TableCell>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userCollection.map((user, index) => (
            <TableRow key={index}>
              <TableCell align="right">
                <img src={user.image} width="80px" />
              </TableCell>
              <TableCell align="right">
                <span>{index}</span>
              </TableCell>
              <TableCell align="right">
                <span>
                  <Link
                    to={generatePath('/advance/detail/:id', { id: user.id })}
                    style={{ fontSize: "18px" }}>
                    {user.name}
                  </Link>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
