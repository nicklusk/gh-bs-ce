import React, { Component } from 'react';
import axios from 'axios';

const repoURL = 'https://api.github.com/search/repositories?q=created:>=2017-04-29&sort=stars&order=desc&type=Repositories&per_page=5';
const userURL = 'https://api.github.com/search/users?q=created:>=2016-05-29&sort=followers&order=desc&type=Users&per_page=5';

export default class App extends Component {
 constructor(props) {
   super(props);
   this.state = {
     items: [],
     users: []
   }
 }

 componentDidMount() {
   var _this = this;

   axios.get(repoURL)
   .then(function(res){
     console.log(res)
     _this.setState({
       items: res.data.items
     });
   })
   .catch(function(e) {
     console.log('ERROR ', e);
   })

   axios.get(userURL)
   .then(function(res){
     console.log(res)
     _this.setState({
       users: res.data.items
     });
   })
   .catch(function(e) {
     console.log('ERROR ', e);
   })
 }

 render() {
   const renderItems = this.state.items.map(function(item, i) {
     return (
       <div key={i} className="row">
         <div className="col-md-3">{item.id}</div>
         <div className="col-md-3">{item.name}</div>
         <div className="col-md-3">{item.description}</div>
         <div className="col-md-3">{item.stargazers_count}</div>
       </div>
     );
   });
   console.log(renderItems)
     const renderUsers = this.state.users.map(function(item, i) {
       return (
         <div key={i} className="row">
           <div className="col-md-3">{item.id}</div>
           <div className="col-md-3">{item.login}</div>
           <div className="col-md-3"><img alt="" class="avatar width-full rounded-2" height="80" src={item.avatar_url + "&s=160"} width="80" /></div>
         </div>
       );
     });
     console.log(renderUsers)
   return (
     <div className="App">

         <div className="row">

           <div className="col-md-6 ">
             <button type="button" id="hot_repo" className="btn btn-lg btn-danger">Hot Repositories</button>
           </div>
           <div className="col-md-6 ">
             <button type="button" id="prolific_users" className="btn btn-lg btn-success">Prolific Users</button>
           </div>

           <div id="repoTable" className="col-md-6 panel panel-default">
             <div id="repoHeader" className="panel-heading">5 Most Starred Repositories Last Month</div>
             <div className="repoSubHeader panel-body">
               <div id="repoId" className="col-md-3">ID</div>
               <div id="repoName" className="col-md-3">Name</div>
               <div id="repoDescription" className="col-md-3">Description</div>
               <div id="repoStars" className="col-md-3">Stars</div>
             </div>
             <div className="row">
             {renderItems}
             </div>
           </div>

           <div id="userTable" className="col-md-6 panel panel-default">
             <div id="userHeader" className="panel-heading">5 Most Active Users</div>
             <div className="userSubHeader panel-body">
               <div id="userId" className="col-md-3">ID</div>
               <div id="userLogin" className="col-md-3">Login</div>
               <div id="userAvatar" className="col-md-3">Avatar</div>
               <div id="userFollowers" className="col-md-3">Followers</div>
             </div>
             <div className="row">
             {renderUsers}
             </div>
           </div>

         </div>
     </div>
   );
 }
}
