import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

let users;
$.ajax({
  type: 'GET',
  url: 'https://json2jsonp.com/?url=http://dev.frevend.com/json/users.json',
  dataType: 'jsonp',
  async: false,
  crossDomain: true,
success: function(data){
  users = data.users;
}
});

class App extends Component {
  render() {
    return (
      <div className="app">
        {users.map(function (item) {
          return (
            <div className="card" key={item.id}>
              <img src={`http://dev.frevend.com/json/images/u_${item.id}.png`} />
              <h2>{item.name} {item.surname}</h2>
              <p>{item.desc}</p>
            </div>
            );
        })}

      </div>
    );
  }
    
}

export default App;