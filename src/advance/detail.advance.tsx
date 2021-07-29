import React from "react";
import { Link, useParams } from 'react-router-dom'


interface DetailPageParams {
  id: string;
}

interface MemberDetailEntity {
  id: string;
  login: string;
  name: string;
  company: string;
  bio: string;
}

const createDefaultMemberDetail = (): MemberDetailEntity => ({
  id: '',
  login: '',
  name: '',
  company: '',
  bio: '',
});

export const AdvanceDetailPage: React.FC = () => {
  const { id } = useParams<DetailPageParams>();
  const [member, setMember] = React.useState<MemberDetailEntity>(createDefaultMemberDetail());

  // cargamos los datos:
  React.useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((response) => response.json())
      .then((json) => setMember(json));
  }, []);

  return (
    <>
      <h2>Hello from Detail page</h2>
      <h3>User id: {id}</h3>
      <p>id: {member.id}</p>
      <p>login: {member.login}</p>
      <p>name: {member.name}</p>
      <p>company: {member.company}</p>
      <p>bio: {member.bio}</p>
      <Link to="/list">Navigate to List page</Link>
    </>
  )
}
