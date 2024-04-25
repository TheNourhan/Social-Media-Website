import Sidebar from '../Sidebar/Sidebar';
import PeopleBox from './PeopleBox';
import Widgets from '../Home/Widgets/Widgets';
import './following.css';


const Following = ({ user }) => {
    return (
        <div className='following'>
            <Sidebar />
            <div className='following__container'>
                <PeopleBox {...user}/>
            </div>
            <Widgets />
        </div>
    );
};

export default Following;
