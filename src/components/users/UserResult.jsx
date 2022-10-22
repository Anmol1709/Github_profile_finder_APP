
import {useContext} from 'react'
import GithubContext from '../../context/github/GithubContext';
import Spinner from '../layouts/Spinner'
import UserItem from '../users/UserItem'
import UserSearch from '../users/UserSearch'

function UserResult() {

const {users,loading}=useContext(GithubContext);



   
if(!loading){
     return( <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md-grid-cols-2">
       {
       users.map((user)=>(
           <UserItem key={user.id} user={user}/>
       ))}
     </div>
     )
}
else{
  return (
     <Spinner/>)
}  
       
//        else{
      //  return <div>Loading...</div>
       
     
}

export default UserResult


// function UserResults() {
//   const { users, loading } = useContext(GithubContext)

//   if (!loading) {
//     return (
//       <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
//         {users.map((user) => (
//           <UserItem key={user.id} user={user} />
//         ))}
//       </div>
//     )
//   } else {
//     return <Spinner />
//   }
// }

// export default UserResults