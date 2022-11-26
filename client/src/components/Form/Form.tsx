import { useState } from 'react'
import { HTTP_METHODS } from '../../enums';
import { useRequest } from '../../hooks/useRequest';
import { UserModel } from '../../types';

const Form = () => {
  const [userData, setUserData] = useState<UserModel>({} as UserModel);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name] : e.target.value
    })
  };

  const { doApiRequest } =  useRequest({
    url: '/users/create',
    method: HTTP_METHODS.POST,
    onSucces: () => window.location.reload()
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doApiRequest(userData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
        <h1>Create free account</h1>
        <label htmlFor="name">
          <input type="text" name="name" placeholder="Name" onChange={(e) => handleOnChange(e)}/>
        </label>
        <label htmlFor="password">
          <input type="password" name="password" placeholder="******" onChange={(e) => handleOnChange(e)}/>
        </label>
        <label htmlFor="admin">
          <input type="text" name="admin" placeholder="Role" onChange={(e) => handleOnChange(e)}/>
        </label>
        <label htmlFor="country">
          <input type="text" name="country" placeholder="Country" onChange={(e) => handleOnChange(e)}/>
        </label>

        <button className="button">Create account</button>
      </form>
  )
}

export default Form
