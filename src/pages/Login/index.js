import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGlobals } from '../../hooks';

import { Container } from './styles';

function Login() {
  const [username, setUsername] = useState('');
  const { users, setUsers } = useGlobals();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userExists = users.find( user => user.username === username);

    if (!userExists) return toast.error('Usuário não encontrado!');

    setUsers(state => state.map((user) => user.username === username ? {...user, on: true } : user));
    history.push('/home');
  }
 
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h1>GitMatch</h1>
        <input
          placeholder="Digite seu usuário do Github"
          value={username}
          onChange={ e => setUsername(e.target.value)}
        />
        <button type="submit"> Entrar </button>
        <Link to="/signUp">
          Criar conta
        </Link>
      </form>
    </Container>
  );
}

export default Login;