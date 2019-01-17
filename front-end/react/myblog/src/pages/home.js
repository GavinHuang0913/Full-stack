import React, { Component } from 'react';
import AppNav from '../components/AppNav';

class Home extends Component {

   constructor(props) {
       super(props);
   }

   render() {
       return (
           <div>
               <AppNav />
               <div class="card mt-4" Style="width: 100%;">
                   <div class="card-body">
                       Please login to see your posts.
         </div>
               </div>
           </div>
       );
   }
}

export default Home;