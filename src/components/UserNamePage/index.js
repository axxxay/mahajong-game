import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.css'

const UserNamePage = () => {
    const [name, setName] = useState('');
    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length > 0) {
            localStorage.setItem('userName', name);
            history.push('/game');
        } else {
            alert('Please enter your name');
        }
    }

    return (
        <div className="user-name-page-con">
            <h1 className='heading'>React Tiles</h1>
            <form className="name-input-form" onSubmit={handleSubmit}>
                <label className='label'>Enter Your Name</label>
                <input type="text" className='name-input' value={name} onChange={handleNameChange} placeholder="Enter your name" />
                <button type="submit" className="play-btn">Play</button>
            </form>
        </div>
    );
}

export default UserNamePage;