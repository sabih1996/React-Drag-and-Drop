import React, { useEffect } from 'react';

function  App(){
  useEffect(()=>{
//here called api and then stored result in the database.Wip ones in wip list and completed in their respective
    store("/tasks").then(response =>
      response.json().then(data => {
        console.log("record stored");
      }))
  });
}
export default App;