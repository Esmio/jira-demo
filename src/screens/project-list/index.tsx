import React, { useState, useEffect } from 'react';
import qs from 'qs';

import { cleanObject, useDebounce, useMount } from 'utils';

import SearchPanel from './search-panel';
import List from './list';

const apiUrl = process.env.REACT_APP_API_URL;

console.log('apiUrl', apiUrl);
console.log('process.env', process.env);

function ProjectListScreen() {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: '',
    personId: ''
  });
  const debouncedParam = useDebounce(param,  500);
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
      if(response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParam])
  
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if(response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
}

export default ProjectListScreen; 