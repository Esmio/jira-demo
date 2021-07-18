import { Form, Input, Select } from 'antd';

const {Option} = Select;

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  },
  setParam: (param: SearchPanelProps['param']) => void;
}

function SearchPanel({ users, param, setParam }: SearchPanelProps) {

  return (
    <Form>
      <Input type="text" value={param.name} onChange={evt => setParam({
        ...param,
        name: evt.target.value,
      })} />
      <Select value={param.personId} onChange={value => setParam({
        ...param,
        personId: value,
      })}>
        <Option value={''}>负责人</Option>
        {users.map(user => <Option value={user.id} key={user.id}>{user.name}</Option>)}
      </Select>
    </Form>
  );
}

export default SearchPanel;
