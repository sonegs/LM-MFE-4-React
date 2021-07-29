import React from "react";
import { Link, generatePath } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";

interface MemberEntity {
  id: string;
  login: string;
  avatar_url: string;
}
interface CompanyContext {
  newCompany: string;
  setNewCompany: (value: string) => void;
}

// Componente en el que inyecto el contexto
const MyContext = React.createContext<CompanyContext>({
  newCompany: "",
  setNewCompany: (value) => { },
});

// Contexto. Lo meto dentro de MyContext
export const MyContextComponent: React.FC = (props) => {
  const [newCompany, setNewCompany] = React.useState("Lemoncode");
  return (
    <MyContext.Provider value={{ newCompany, setNewCompany }}>
      {props.children}
    </MyContext.Provider>
  )
};


export const BasicListPage: React.FC = (props) => {

  const filterContext = React.useContext(MyContext);
  const [members, setMembers] = React.useState<MemberEntity[]>([]);
  const { newCompany, setNewCompany } = React.useContext(MyContext);
  const [company, setCompany] = React.useState(newCompany);

  const handleFilter = (e) => {
    e.preventDefault();
    setNewCompany(company);
  };

  // cargamos los datos
  React.useEffect(() => {
    console.log(filterContext.newCompany)
    fetch(`https://api.github.com/orgs/${filterContext.newCompany}/members`)
      .then((response) => response.json())
      .then((json) => setMembers(json));
  }, [filterContext]);

  return (
    <>
      <form onSubmit={handleFilter}>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <button type="submit">Buscar</button>
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
                <TableCell align="right">
                  <img src={member.avatar_url} style={{ width: "5rem" }} />
                </TableCell>
                <TableCell align="right">
                  <span>{member.id}</span>
                </TableCell>
                <TableCell align="right">
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