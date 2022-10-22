import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'


const GITHUB_URL = "https://api.github.com"
const GITHUB_TOKEN="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"

const GithubContext = createContext()

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    repos:[],
    user:{},
    loading: false,
  }
  
  const [state, dispatch] = useReducer(githubReducer, initialState)

    const  searchUsers = async(text)=> {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`,
    {
      headers:{
        Authorization:`token ${GITHUB_TOKEN}`,
      },
    })

    // const response =  fetch(`${GITHUB_URL}/users`)
    const { items } = await response.json()
    //console.log(response);
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
    // setUsers ( data);
    // setLoading(false);
    // console.log(data);
    // console.log("Anmol");
    // setUsers(data)
  }
   //get single user
  const  getUser = async(login)=> {
    setLoading()

   
    const response = await fetch(`${GITHUB_URL}/users/${login}`,
    {
      headers:{
        Authorization:`token ${GITHUB_TOKEN}`,
      },
    })


     if(response.status === 404)
     {
      window.location= '/notfound'
     }
     else{
      const data = await response.json()
      //console.log(response);
      dispatch({
        type: 'GET_USER',
        payload: data,
      })
     }



    // const response =  fetch(`${GITHUB_URL}/users`)
    
    // setUsers ( data);
    // setLoading(false);
    // console.log(data);
    // console.log("Anmol");
    // setUsers(data)
  }





  const  getUserRepos = async(login)=> {
    setLoading()

  
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos`,
    {
      headers:{
        Authorization:`token ${GITHUB_TOKEN}`,
      },
    })

    // const response =  fetch(`${GITHUB_URL}/users`)
    const data = await response.json()
    //console.log(response);
    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
    // setUsers ( data);
    // setLoading(false);
    // console.log(data);
    // console.log("Anmol");
    // setUsers(data)
  }




  const clearUsers = () => dispatch({
    type: 'CLEAR_USERS'
  })


  const setLoading = () => dispatch({
    type: 'SET_LOADING'
  })


  return (
    <GithubContext.Provider value={
      {
        users: state.users,
        user: state.user,
        repos:state.repos,
        loading: state.loading,
     
       // fetchusers,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }
    } >

      {children}

    </GithubContext.Provider >


  )



  // const [state, dispatch] = useReducer(githubReducer, initialState)



}

export default GithubContext