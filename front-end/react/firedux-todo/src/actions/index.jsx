
import {todosRef} from '../config/firebase';
import {FETCH_TODOS} from './types';

//
export const addToDo = newToDo => async dispatch => {
  todosRef.push().set(newToDo);
};

//
export const completeToDo = completeToDo => async dispatch => {
  todosRef.child(completeToDo).remove();
};

//
export const fetchToDos = () => async dispatch => {
  todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};