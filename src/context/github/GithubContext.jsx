
import { createContext, useReducer } from 'react'
import githubReducer from './GithubReducer'




const GithubContext = createContext()
export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
     repos:[],
     user:{},
    loading: false,
  }
  // const [users,setUsers]= useState([])
  // const [loading,setLoading]= useState(true)

 const [state, dispatch] = useReducer(githubReducer, initialState)
 const searchUsers= async(text)=>{
  setLoading()
  const params = new URLSearchParams({
          q: text,
        })
  const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`)
   const {items} = await response.json();
  
   dispatch({
          type: 'GET_USERS',
          payload: items,
        })
  }
  const clearUsers = () => dispatch({
    type: 'CLEAR_USERS'
  })


  
  const  getUser = async(login)=> {
    setLoading()

    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users/${login}`)


     if(response.status === 404)
     {
      window.location= '/notfound'
     }
     else{
      const data = await response.json()
   
      dispatch({
        type: 'GET_USER',
        payload: data,
      })
     }


  }


  const  getUserRepos = async(login)=> {
    setLoading()

  
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users/${login}/repos`)
    const data = await response.json()
  
    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
  
  }


  const setLoading=()=>{
dispatch({
type:'SET_LOADING'
})
  }
  return (
    <GithubContext.Provider value={
      {
      
        users: state.users,
       repos:state.repos,
        user:state.user,
         loading: state.loading,
        // fetchUsers,
        searchUsers,
        clearUsers,
        getUser,
         getUserRepos,
      }
    } >

      {children}

    </GithubContext.Provider >


  )



}
  export default GithubContext












// export const GithubProvider = ({ children }) => {
//   const initialState = {
//     users: [],
//     // repos:[],
//     // user:{},
//     loading: false,
//   }
  
//   const [state, dispatch] = useReducer(githubReducer, initialState)

//   const searchUsers = async(text)=> {
//        setLoading()

//     const params = new URLSearchParams({
//       q: text,
//     })
//     const response = await fetch(`${GITHUB_URL}/search/users?${params}`,
//     {
//       headers:{
//         Authorization:`token ${GITHUB_TOKEN}`,
//       },
//     })

   
//     const { items } = await response.json()
 
//     dispatch({
//       type: 'GET_USERS',
//       payload: items,
//     })
 
//   }
  
//   const  getUser = async(login)=> {
//     setLoading()

   
//     const response = await fetch(`${GITHUB_URL}/users/${login}`,
//     {
//       headers:{
//         Authorization:`token ${GITHUB_TOKEN}`,
//       },
//     })


//      if(response.status === 404)
//      {
//       window.location= '/notfound'
//      }
//      else{
//       const data = await response.json()
   
//       dispatch({
//         type: 'GET_USER',
//         payload: data,
//       })
//      }


//   }





//   const  getUserRepos = async(login)=> {
//     setLoading()

  
//     const response = await fetch(`${GITHUB_URL}/users/${login}/repos`,
//     {
//       headers:{
//         Authorization:`token ${GITHUB_TOKEN}`,
//       },
//     })
//     const data = await response.json()
  
//     dispatch({
//       type: 'GET_REPOS',
//       payload: data,
//     })
  
//   }




//   const clearUsers = () => dispatch({
//     type: 'CLEAR_USERS'
//   })


//   const setLoading = () => dispatch({
//     type: 'SET_LOADING'
//   })


  // return (
  //   <GithubContext.Provider value={
  //     {
  //       users: state.users,
  //       // user: state.user,
  //       // repos:state.repos,
  //       loading: state.loading,
  //       searchUsers,
  //       // clearUsers,
  //       // getUser,
  //       // getUserRepos,
  //     }
  //   } >

  //     {children}

  //   </GithubContext.Provider >


  // )




// }

// 