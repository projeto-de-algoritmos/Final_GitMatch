import React, {
  createContext,
  useContext,
  useState,
  useCallback
} from 'react';

import { data } from './data';

const GlobalsContext = createContext({});

const GlobalsProvider= ({ children }) => {
  const [users, setUsers] = useState(data);

  const merge = useCallback((a, b) => {
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
  }, [])
  
  const mergeSort = useCallback((obj) => {
    if(obj.otherUserArray.length === 1) {
      return obj
    }
    let middle = Math.floor(obj.otherUserArray.length/2)
    let left = {otherUserArray: obj.otherUserArray.slice(0, middle), count: obj.count}
    let right = {otherUserArray: obj.otherUserArray.slice(middle), count: obj.count}
    let result = merge(mergeSort(left), mergeSort(right))
    return result
  }, [merge])

  const inversionCounter = useCallback((currentUser) => {
    const copyUsers = [...users];
    // Encontra as informações user logado
    console.log(currentUser);
    let currentUserInfo;
    for (let index = 0; index < copyUsers.length; index++) {
      if(copyUsers[index].username === currentUser) {
        currentUserInfo = copyUsers[index];
      }
    }

    console.log(currentUserInfo)

    if (!currentUserInfo) {
      return false;
    }

    let baseOrder = {};

    for (let x = 1; x <= 5; x++) {
      baseOrder[x.toString()] = currentUserInfo.technologys[x-1];
    }

    console.log(baseOrder)

    let otherUserResult;
    let otherUserArray = [];

    let allUsersResult = {};

    console.log(copyUsers);
    let finalResult;
    // Cria o array dos outros usuarios de acordo com o array base 
    for (let index = 0; index < copyUsers.length; index++) {
      // Para todo usuario que não for o usuario logado
      if(copyUsers[index].username !== currentUser) {
        console.log(copyUsers[index].username);
        // Zera o array para cada usuario
        otherUserArray = [];
        // Cria o array de acordo com o base
        for (let x = 1; x <= 5; x++) {
          let newOrder = Object.keys(baseOrder).find(key => baseOrder[key] === copyUsers[index].technologys[x-1]);
          otherUserArray.push(newOrder)
        }
        console.log(otherUserArray);
        otherUserResult = mergeSort({otherUserArray, count: 0});
        
        if (allUsersResult[`${otherUserResult.count}`]) {

          otherUserResult.count = otherUserResult.count+1
        }

        console.log(otherUserResult.count.toString())

        allUsersResult[otherUserResult.count.toString()] = copyUsers[index].username;
      }

      finalResult = [];

      Object.keys(allUsersResult).forEach((key) => {
        const orderedUser = copyUsers.find(user => user.username === allUsersResult[key]);
        finalResult.push(orderedUser)
      })      
    }
    console.log(finalResult)
    return finalResult;
  },[users, mergeSort])
  
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


