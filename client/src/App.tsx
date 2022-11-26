import './index.css'
import List from './components/List/List';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="app">
      <div className="form-container">
        <Form/>
      </div>

      <div className="list-container">
        <List />
      </div>
    </div>
  )
}

export default App
