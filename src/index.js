import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
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

  class App extends Component {
    constructor() {
      super();
      this.state = {
        currentPage: 1
      }
        this.handleClick = this.handleClick.bind(this);
      }

      handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
      });
    }
    render() {
    const currentPage = this.state.currentPage;

    const usersAmount = users.length;
    const usersPerPage = 5;
    const amountOfPages = Math.ceil(usersAmount/usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const curentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const pages = [];
    for(var i = 1; i <= amountOfPages; i++){
      pages.push(i);
    }

    const renderPageNumbers = pages.map(number => {
      return (
        <button key={number} id={number} onClick={this.handleClick} >
            {number}
        </button>
      )
    })
      return (
        <div className="App">
          {curentUsers.map(function (item) {
            return (
              <div key={item.id}>
                <img src={`http://dev.frevend.com/json/images/u_${item.id}.png`} />
                <h2>{item.name} {item.surname}</h2>
                <p>{item.desc}</p>
              </div>
              );
          })}
          <div className="pagination">
            {renderPageNumbers}
          </div>
        </div>
      );
    }
      
  }
  
  ReactDOM.render(<App />, document.getElementById('root'));
}
});


registerServiceWorker();

if (module.hot) {
    module.hot.accept();
    }
    