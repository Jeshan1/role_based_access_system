import { useAuth } from '../context/Auth'
import {useNavigate} from 'react-router'
const HomePage = () => {
    const navigate = useNavigate()
    const {user} = useAuth()
    user?navigate('/dashboard'):navigate('/login')
  return (
    <div>HomePage</div>
  )
}

export default HomePage