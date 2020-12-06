import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, useHistory } from 'react-router-dom';
import { 
  FormControl, 
  Select, 
  MenuItem
 } from '@material-ui/core';

import { useGlobals } from '../../hooks';
import api from '../../services/api';
import { toast } from 'react-toastify';

import { 
  Container, 
  Input, 
  useStyles, 
  MenuProps, 
  SelectContainer,
  MInput
} from './styles';

function SignUp() {
  const [username, setUsername] = useState('');
  const [technologys, setTechnologys] = useState([]);
  const classes = useStyles();
  const { users, setUsers } = useGlobals();
  const history = useHistory();

  const options = [
    'Javascript',
    'Python',
    'C++',
    'Java',
    'PHP'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!username) return toast.error('Username não informado!');

      const userExists = users.find( user => user.username === username);

      if (userExists) return toast.error('Usuário já cadastrado!');

      if (technologys.length === 0) return toast.error('Tecnologias não informadas!')

      if (technologys.length < 5) return toast.error('Selecione todas as tecnologias!')

      const response = await api.get(`/${username}`);
      
      const { name, bio, avatar_url } = response.data;

      setUsers(state => [...state, {
        username: username,
        name: name,
        bio: bio,
        avatar: avatar_url,
        technologys: technologys,
        on: false,
        likes: [],
        dislikes: [],
        matchs: [],
      }])

      toast.success('Usuário cadastrado com sucesso');
      history.push('/');       
    }
    catch { 
      toast.error('Erro ao criar usuário!');
    }
  }
 
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <h1>GitMatch</h1>
        <Input
          placeholder="Digite seu usuário do Github"
          value={username}
          onChange={ e => setUsername(e.target.value)}
        />
        <SelectContainer>
          <FormControl className={clsx(classes.formControl)}>
            <Select
              multiple
              displayEmpty
              value={technologys}
              onChange={(e) => setTechnologys(e.target.value)}
              input={<MInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Selecione as tecnologias em ordem:</em>;
                }

                return selected.join(', ');
              }}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem disabled value="">
                <em>Selecione as tecnologias em ordem: </em>
              </MenuItem>
              {options.map((op) => (
                <MenuItem key={op} value={op}>
                  {op}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </SelectContainer>
        <button type="submit"> Criar conta </button>
        <Link to="/">
          Voltar para o login
        </Link>
      </form>
    </Container>
  );
}

export default SignUp;