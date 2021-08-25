import React from "react";
import { Link, useParams } from 'react-router-dom'


interface DetailPageParams {
  id: string;
}
interface OriginInterface {
  name: string
}
interface MemberDetailEntity {
  id: string;
  name: string;
  status: string;
  species: string;
  type?: string;
  origin: OriginInterface;
}

const createDefaultMemberDetail = (): MemberDetailEntity => ({
  id: '',
  name: '',
  status: '',
  species: '',
  type: 'None',
  origin: {
    name: ''
  }
});

export const AdvanceDetailPage: React.FC = () => {
  const { id } = useParams<DetailPageParams>();
  const [member, setMember] = React.useState<MemberDetailEntity>(createDefaultMemberDetail());

  // cargamos los datos:
  React.useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((json) => setMember(json));
  }, []);

  return (
    <>
      <h2>Hello from Detail page of Rick and Morty Characters</h2>
      <h3>Name: {member.name}</h3>
      <p>id: {id}</p>
      <p>Status {member.status}</p>
      <p>Specie: {member.species}</p>
      <p>Type: {member.type}</p>
      <p>Origin: {member.origin.name}</p>
      <Link to="/advance/list">Navigate to List page</Link>
    </>
  )
}
