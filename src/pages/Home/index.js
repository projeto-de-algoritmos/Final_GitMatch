import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useGlobals } from '../../hooks';
import { Container, Buttons, Empty } from './styles';

import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'

function Home() {
  const [recommendUsers, setRecommendUsers] = useState([]);
  const { users, setUsers } = useGlobals();
  const history = useHistory();

  useEffect(() => {
    let usersCopy = [...users];
    const loggedUser = usersCopy.find((user) => user.on === true); 
    usersCopy = usersCopy.filter((user) => (
      user.on === false &&
      !loggedUser.likes.some((like) => like === user.username) &&
      !loggedUser.dislikes.some((dislike) => dislike === user.username) &&
      !loggedUser.matchs.some((match) => match === user.username) 
    ));

    setRecommendUsers(usersCopy);
  }, [users])

  const handleLike = (username) => {
    let usersCopy = [...users];
    const loggedIdx = usersCopy.findIndex((user) => user.on === true); 
    usersCopy[loggedIdx] = {
      ...usersCopy[loggedIdx], 
      likes: [...usersCopy[loggedIdx].likes, username]
    }

    setUsers(usersCopy);
  }

  const handleDislike = (username) => {
    let usersCopy = [...users];
    const loggedIdx = usersCopy.findIndex((user) => user.on === true); 
    usersCopy[loggedIdx] = {
      ...usersCopy[loggedIdx], 
      dislikes: [...usersCopy[loggedIdx].dislikes, username]
    }

    setUsers(usersCopy);
  }

  const handleLogout = () => {
    setUsers(state => state.map((user) => user.on === true ? {...user, on: false } : user));
    history.push('/');
  }

  return (
    <Container>
      <h1 onClick={handleLogout}>ProgramMatch</h1>
      {recommendUsers.length > 0 ? (
        <ul>
        {recommendUsers.map(user => (
          <li key={user.username}>
            <img src={user.avatar} alt={user.name} />
            <footer>
              <strong>{user.name}</strong>
                <p>
                  {user.bio}
                </p>
              </footer>
                
            <Buttons>
              <button type="button" onClick={() => handleDislike(user.username)}>
                <img src={dislike} alt="dislike"/>
              </button>
              <button type="button" onClick={() => handleLike(user.username)}>
                  <img src={like} alt="like"/>
              </button>
            </Buttons>
          </li>
        ))}
        </ul>
        ) :(
            <Empty>Acabou :( </Empty>
        ) }

    </Container>
  );
}

export default Home;