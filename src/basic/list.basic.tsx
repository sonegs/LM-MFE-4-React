import React from "react";
import { Link, generatePath } from 'react-router-dom';
import { MyContext } from './context.basic';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';


interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const BasicListPage: React.FC = (props) => {

  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const { newCompany, setNewCompany } = React.useContext(MyContext);
  const [company, setCompany] = React.useState(newCompany);

  const handleFilter = e => {
    e.preventDefault();
    setNewCompany(company);
  };

  // cargamos los datos
  React.useEffect(() => {
    console.log(newCompany)
    fetch(`https://api.github.com/orgs/${newCompany}/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }, [newCompany]);

  return (
    <>
      <Link to={generatePath('/advance/list')}>
        <Button variant="contained" color="primary">
          Rick and Morty Exercise </Button>
      </Link>
      <form onSubmit={handleFilter}>
        <FormControl style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            type="text"
            value={company}
            id="filled-basic" label="Company" variant="filled"
            style={{ width: '300px' }}
            onChange={(e) => setCompany(e.target.value)}
          />
          <Button
            style={{ width: '300px' }}
            variant="contained"
            color="primary"
            type="submit">Buscar</Button>
        </FormControl>
      </form>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Avatar</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell align="right" width="20%">
                  <img src={member.avatar_url} width="80px" />
                </TableCell>
                <TableCell align="right" width="50%">
                  <span>{member.id}</span>
                </TableCell>
                <TableCell align="right" width="30%">
                  <span><Link to={generatePath('/basic/detail/:id', { id: member.login })}>{member.login}</Link></span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};