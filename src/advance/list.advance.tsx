import React from "react";
import { Link, generatePath } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}

export const AdvanceListPage: React.FC = () => {

  const [org, setOrg] = React.useState('Lemoncode');
  const [members, setMembers] = React.useState<MemberEntity[]>([]);


  // cargamos los datos

  const orgFilter = () => {
    fetch(`https://api.github.com/orgs/${org}/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }

  React.useEffect(() => { orgFilter() }, []);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Organization</TableCell>
            <TableCell align="center">
              <Input autoFocus={true} value={org} onChange={e => setOrg(e.target.value)} />
              <IconButton key={1} onClick={() => orgFilter()}>
                <SearchIcon />
              </IconButton>
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
          {/* {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell align="right">
                <img src={member.avatar_url} style={{ width: "5rem" }} />
              </TableCell>
              <TableCell align="right">
                <span>{member.id}</span>
              </TableCell>
              <TableCell align="right">
                <span><Link to={generatePath('/detail/:id', { id: member.login })}>{member.login}</Link></span>
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>

  );
};