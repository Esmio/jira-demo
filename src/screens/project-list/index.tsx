import { useState, useEffect } from 'react';

import { cleanObject, useDebounce, useMount } from 'utils';

import SearchPanel from './search-panel';
import List from './list';
import { useHttp } from 'utils/http';

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
  const client = useHttp();

  useEffect(() => {
    client('projects', {
      data: cleanObject(debouncedParam)
    }).then(setList);
  }, [debouncedParam])
  
  useMount(() => {
    client('users').then(setUsers);
  })

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
}

export default ProjectListScreen; 