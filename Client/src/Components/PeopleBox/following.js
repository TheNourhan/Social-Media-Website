import Sidebar from '../Sidebar/Sidebar';
import PeopleBox from './PeopleBox';
import Widgets from '../Home/Widgets/Widgets';
import './following.css';


const Following = ({ user }) => {
    return (
        <div className='main'>
            <div>
            <Sidebar />
            </div>
           
            <PeopleBox {...user}/>
          
            <div>
                <Widgets />
            </div>
            
        </div>
       
    );
};

export default Following;
