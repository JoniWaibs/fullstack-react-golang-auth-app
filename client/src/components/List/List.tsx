import { useEffect, useMemo, useState } from 'react';
import { HTTP_METHODS } from '../../enums';
import { useRequest } from '../../hooks/useRequest';
import { UserModel } from '../../types';

const List = () => {
  const [users, setUsers] = useState<UserModel[]>([]);

  const { doApiRequest } = useRequest({
    url: '/users',
    method: HTTP_METHODS.GET,
    onSucces: (data: UserModel[]) => setUsers(data),
  });

  useEffect(() => () => { doApiRequest() }, []);

  return (
    <ul className="list">
      { users.length ?
        users.map((user: UserModel) => <li key={Math.random()}>{user.name}</li>) 
        : <p>No users to show :(</p>
      }
    </ul>
  );
};

export default List;
