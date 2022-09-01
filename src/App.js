import { useEffect, useState } from 'react';
const url = "https://reqres.in/api/users"
function App() {

  const [dataApi, setDataApi] = useState({
    loading: true,
    data: []
  })
  
  const { data, loading } = dataApi
  const [ordering, setOrdering] = useState(data?.data)

  const getApi = async () => {
    const response = await fetch(url)
    const data = await response.json()

    return data
  }

  
  useEffect(() => {
    getApi()
    .then(item => {
      setDataApi({
        loading: false,
        // data: item
      })
      setOrdering(item.data)
      })
    }, [ ordering ])

  const handleAscending = () => {
    setOrdering(
      ordering.sort((a, b) => {
        if (a.last_name < b.last_name) {
          return -1;
        }
        if (a.last_name > b.last_name) {
          return 1;
        }

        return 0

      })
      )
      console.log('ascending')
      console.log(ordering)
  }
  const handleDescending = () => {
    setOrdering(
      ordering.sort((a, b) => {
        if (a.last_name > b.last_name) {
          return -1;
        }
        if (a.last_name < b.last_name) {
          return 1;
        }

        return 0
      })
      )
      console.log('descending')
      console.log(ordering)
  }

  return (
    <div className="App">
      <h1>Test</h1>
      <div>
        <button onClick={ handleAscending } >Ascending</button>
        <button onClick={ handleDescending } >Descending</button>
      </div>
      <ul>
        {
          !loading && ordering.map(({ id, email, first_name, last_name, avatar }) => (
            <li key={ id }>
              <figure>
                <img src={ avatar } alt=""/>
              </figure>
              { first_name } /
              { last_name } /
              { email }
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
