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
    while(i < a.arr.length && j < b.arr.length) {
      if(a.arr[i] > b.arr[j]) {
        temp.push(b.arr[j])
        j++
        count += a.arr.length - i
      } else {
        temp.push(a.arr[i])
        i++
      }
    }
    temp = [...temp, ...a.arr.slice(i), ...b.arr.slice(j)]
    return {arr: temp, count }
  }
  
  const mergeSort = (obj) => {
    if(obj.arr.length === 1) {
      return obj
    }
    let middle = Math.floor(obj.arr.length/2)
    let left = {arr: obj.arr.slice(0, middle), count: obj.count}
    let right = {arr: obj.arr.slice(middle), count: obj.count}
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
    // 1: "Python"
    // 2: "Javascript"
    // 3: "Java"
    // 4: "C++"
    // 5: "PHP"

    let otherUser;
    // let otherOrder

    for (let index = 0; index < users.length; index++) {
      if(users[index].username !== currentUser) {
        otherUser = users[index];
        console.log(otherUser.technologys)
        // [ "PHP", "Javascript", "Python", "Java", "C++" ]
        for (let x = 1; x <= 5; x++) {
          let newOrder = Object.keys(baseOrder).find(key => baseOrder[key] === otherUser.technologys[x-1]);
          console.log(newOrder);
          // console.log(mergeSort({newOrder, count: 0}))
        }
      }
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


