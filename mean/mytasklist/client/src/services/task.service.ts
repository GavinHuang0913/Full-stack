import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { jsonpFactory } from '@angular/http/src/http_module';
import 'rxjs/add/operator/map'; // npm install rxjs-compat

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(private http: Http) {
    console.log('Task service is starting...');
  }

  //
  getTasks = () => this.http.get('http://localhost:3001/api/tasks').map( res => res.json());

  addTask = newTask => {
    // header
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    //
    return this.http.post('http://localhost:3001/api/task', JSON.stringify(newTask), {headers: headers})
    .map( res => res.json() );
  }

  //
  deleteTask = id =>  this.http.delete('http://localhost:3001/api/tasks/' + id).map( res => res.json() );

  //
  updateStatus = _task => {
        // header
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        //
        return this.http.put('http://localhost:3001/api/tasks/' + _task._id, JSON.stringify(_task), {headers: headers})
        .map( res => res.json() );
  }
}
