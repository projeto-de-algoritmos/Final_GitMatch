import React, {
  createContext,
  useContext,
  useState,
} from 'react';

import { data } from './data';

const GlobalsContext = createContext({});

const GlobalsProvider= ({ children }) => {
  const [users, setUsers] = useState(data);

  const merge = (a, b) => {
    let i = 0
    let j = 0
    let temp = []
    let count = a.count + b.count
    while(i < a.otherUserArray.length && j < b.otherUserArray.length) {
      if(a.otherUserArray[i] > b.otherUserArray[j]) {
        temp.push(b.otherUserArray[j])
        j++
        count += a.otherUserArray.length - i
      } else {
        temp.push(a.otherUserArray[i])
        i++
      }
    }
    temp = [...temp, ...a.otherUserArray.slice(i), ...b.otherUserArray.slice(j)]
    return {otherUserArray: temp, count }
  }
  
  const mergeSort = (obj) => {
    if(obj.otherUserArray.length === 1) {
      return obj
    }
    let middle = Math.floor(obj.otherUserArray.length/2)
    let left = {otherUserArray: obj.otherUserArray.slice(0, middle), count: obj.count}
    let right = {otherUserArray: obj.otherUserArray.slice(middle), count: obj.count}
    let result = merge(mergeSort(left), mergeSort(right))
    return result
  }

  const inversionCounter = (obj, currentUser) => {
    // Encontra as informações user logado
    let currentUserInfo;
    for (let index = 0; index < users.length; index++) {
      if(users[index].username == currentUser) {
        currentUserInfo = users[index];
      }
    }

    if (!currentUserInfo) {
      return false;
    }

    console.log(currentUserInfo.technologys)

    let baseOrder = {};

    for (let x = 1; x <= 5; x++) {
      baseOrder[x.toString()] = currentUserInfo.technologys[x-1];
    }

    console.log(baseOrder)
    let otherUser;
    let otherUserResult;
    let otherUserArray = [];

    let allUsersResult = {};

    // Cria o array dos outros usuarios de acordo com o array base 
    for (let index = 0; index < users.length; index++) {
      // Para todo usuario que não for o usuario logado
      if(users[index].username !== currentUser) {
        otherUser = users[index];
        console.log(otherUser.technologys);
        // Zera o array para cada usuario
        otherUserArray = [];
        // Cria o array de acordo com o base
        for (let x = 1; x <= 5; x++) {
          let newOrder = Object.keys(baseOrder).find(key => baseOrder[key] === otherUser.technologys[x-1]);
          otherUserArray.push(newOrder)
        }
        console.log(otherUserArray);
        otherUserResult = mergeSort({otherUserArray, count: 0});
        allUsersResult[otherUserResult.count.toString()] = otherUser.username;
        console.log(allUsersResult);
        // { 2: "lucassiqz", 5: "joao" }
      }

      let finalResult = [];

      console.log('----------------');
      Object.keys(allUsersResult).forEach((key, index) => {
        console.log(users[index].username)
        console.log(allUsersResult[key])
        const orderedUser = users.find(user => user.username == allUsersResult[key]);
        finalResult.push(orderedUser)
      })
      return finalResult;
    }
  }
  
  return (
    <GlobalsContext.Provider
      value={{
        users,
        setUsers,
        inversionCounter,
      }}
    >
      {children}
    </GlobalsContext.Provider>
  );
};

function useGlobals() {
  const context = useContext(GlobalsContext);

  if (!context) {
    throw new Error('useGlobals must be used within a GlobalsProvider');
  }

  return context;
}

export { GlobalsProvider, useGlobals };


