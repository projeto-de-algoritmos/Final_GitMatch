import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useGlobals } from '../../hooks';
import { 
  Container, 
  Buttons, 
  Empty, 
  Match } from './styles';

import like from '../../assets/like.svg'
import dislike from '../../assets/dislike.svg'
import itsamatch from '../../assets/itsamatch.png'

function Home() {
  const [recommendUsers, setRecommendUsers] = useState([]);
  const [bfsResult, setBfsResult] = useState([]);
  const [match, setMatch] = useState(null);
  const { users, setUsers, inversionCounter } = useGlobals();
  const history = useHistory();

  const cleanData = useCallback(
    (BFSResult) => {
      return BFSResult.filter((node) => node[1] === 2);
    },
    [],
  );

  const bfs = useCallback(
    (startingNode) => {
      const graph = [];

      const visited = [];

      for (let i = 0; i < users.length; i++) {
        visited[i] = false;
      }

      const queue = [];

      const startingNodeIndex = users.findIndex(
        (user) => user.username === startingNode.username,
      );

      visited[startingNodeIndex] = true;

      queue[0] = [startingNodeIndex, 0];

      while (queue.length > 0) {
        const getQueueElement = queue.shift();
        graph.push(getQueueElement);

        if (users[getQueueElement[0]]){
          const getList = users[getQueueElement[0]].likes;

          getList.forEach((like) => {
            const neighIndex = users.findIndex(
              (usr) => usr.username === like,
            );
            if (!visited[neighIndex]) {
              visited[neighIndex] = true;
              const next = [neighIndex, getQueueElement[1] + 1];
              queue[queue.length] = next;
            }
          });
        }
      }
      const cleanGraph = cleanData(graph.slice(1));
      return cleanGraph;
    },
    [users, cleanData],
  );

  useEffect(() => {
    let usersCopy = [...users];
    const loggedUser = usersCopy.find((user) => user.on === true);
    
    const result = bfs(loggedUser);

    let completResult = result.map((userIndex) => usersCopy[userIndex[0]]);

    completResult = completResult.filter((user) => (
      !loggedUser.likes.some((like) => like === user.username) &&
      !loggedUser.dislikes.some((dislike) => dislike === user.username) &&
      !loggedUser.matchs.some((match) => match === user.username) 
    ));
    
    setBfsResult(completResult);
  }, [users, bfs])

  useEffect(() => {
    let usersCopy = [...users];
    const loggedUser = usersCopy.find((user) => user.on === true);
    
    let result = inversionCounter(loggedUser.username);

    result = result.filter((user) => (
      !loggedUser.likes.some((like) => like === user.username) &&
      !loggedUser.dislikes.some((dislike) => dislike === user.username) &&
      !loggedUser.matchs.some((match) => match === user.username) 
    ));

    setRecommendUsers(result);
  },[inversionCounter, users]);

  const handleLike = (username) => {
    let usersCopy = [...users];
    const loggedIdx = usersCopy.findIndex((user) => user.on === true); 
    
    usersCopy[loggedIdx] = {
      ...usersCopy[loggedIdx], 
      likes: [...usersCopy[loggedIdx].likes, username]
    }

    const likedUser = usersCopy.find((user) => user.username === username); 

    const itsAMatch = likedUser.likes.some((like) => usersCopy[loggedIdx].username === like);

    if (itsAMatch) {
      setMatch(likedUser);
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
      <h1 onClick={handleLogout}>GitMatch</h1>

      <h2>Com base na suas tecnologias preferidas: </h2>
      {recommendUsers.length > 0 ? (
        <ul>
        {recommendUsers.map(user => (
          <li key={user.username}>
            <img src={user.avatar} alt={user.name} />
            <footer>
              <strong>{user.name}</strong>
                <p>Bio: 
                   {user.bio}
                </p>
                <p>Curte: {user.technologys}</p>
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
        ) : (
            <Empty>Acabou :( </Empty>
        )}

      <h2>Com base nos seus likes: </h2>
      {bfsResult.length > 0 ? (
        <ul>
        {bfsResult.map(user => (
          <li key={user.username}>
            <img src={user.avatar} alt={user.name} />
            <footer>
              <strong>{user.name}</strong>
                <p>Bio: 
                   {user.bio}
                </p>
                <p>Curte: {user.technologys}</p>
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
        ) : (
            <Empty>Acabou :( </Empty>
        )}

        {
          match && (
            <Match>
              <img src={itsamatch} alt="It's a match" />
              <img className="avatar" src={match.avatar} alt="avatar" />
              <strong>{match.name}</strong>
              <p>{match.bio}</p>
              <p>{match.technologys}</p>
              <button type="button" onClick={() => setMatch(null)}>Fechar</button>  
            </Match>
          )  
        }

    </Container>
  );
}

export default Home;