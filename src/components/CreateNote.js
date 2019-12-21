import React, { Component } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

//import { registerLocale } from  "react-datepicker";
//import es from 'date-fns/locale/es';
//registerLocale('es', es)

export default class CreateNote extends Component {

    state = {
        users: [],
        userSelected: '',
        title: '',
        content: '',
        date: new Date()
    }

    async componentDidMount() {
       const res = await axios.get('http://localhost:4000/api/users');
       this.setState({
           users: res.data.map(user => user.username),
           userSelected: res.data[0].username
       })
       this.setState({users: res.data.map(user => user.username)});
       
    }

    onSubmit = async (e) => {
        //console.log(this.state.title, this.state.content)
        e.preventDefault();
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            date: this.state.date,
            author: this.state.userSelected
        };
        await axios.post('http://localhost:4000/api/notes', newNote);
        window.location.href = '/';
    }

    onInputChange = e => {
        this.setState({
           [e.target.name]: e.target.value
        })
    }

    onChangeDate = date => {
        this.setState({date});
    }

    render() {
        return (
            <div>
                <div className="col-md-6 offset-md-3">
                    <div className="card card-body">
                        <h4>Create a Note</h4>

                        {/* SELECT USER */}



                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <select
                                    className="form-control"
                                    name="userSelected"
                                    onChange={this.onInputChange}
                                >
                                    {
                                        this.state.users.map(user => 
                                            <option key={user} value={user}>
                                                {user}
                                            </option>
                                            )
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text"
                                    name="title"
                                    placeholder="Tile"
                                    className="form-control"
                                    onChange={this.onInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea 
                                name="content"
                                className="form-control"
                                placeholder="Content"
                                onChange={this.onInputChange}
                                required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <DatePicker 
                                    className="form-control"
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                    //locale="es"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
