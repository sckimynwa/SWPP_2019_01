import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions';

class App extends Component {
    componentDidMount() {
        //if mounted, get all the meeting data
        this.props.GetAllMeetings();
    }

    render() {
        return (
            <div className="App">


                <p>User</p>
                <input value={this.props.inputUser}
                onChange={(input) => this.props.ChangeInputUser(input.target.value)}/>
                <p>Password</p>
                <input value={this.props.inputPassword}
                onChange={(input) => this.props.ChangeInputPassword(input.target.value)}/>

                <button onClick={() => {
                    this.props.Login({
                        username: this.props.inputUser,
                        password: this.props.inputPassword,
                    });
                    this.props.ChangeInputUser('');
                    this.props.ChangeInputPassword('');
                }}>Log in
                </button>
                <button onClick={() =>
                  this.props.Logout()}>Log out
                </button>



                <p>MeetingList</p>
                <ul>
                    {this.props.meetings.map((data) =>
                        (<li key={data.id}>{`sinceWhen : ${data.sinceWhen}`}<br/>{`tilWhen : ${data.tilWhen}`}<br/>{`reserved by : User${data.user}`}<br/>
                                <button onClick={()=>this.props.DeleteMeeting(data.id)}>delete</button> <br/>
                            </li>
                        ))}
                </ul>


                <p>sinceWhen</p>
                <input value={this.props.inputSinceWhen}
                onChange={(input) => this.props.ChangeInputSinceWhen(input.target.value)}/>
                <p>tilWhen</p>
                <input value={this.props.inputTilWhen}
                onChange={(input) => this.props.ChangeInputTilWhen(input.target.value)}/>

                <button onClick={() => {
                   {
                        this.props.AddMeeting({
                            sinceWhen: this.props.inputSinceWhen,
                            tilWhen: this.props.inputTilWhen,
                        });
                        this.props.ChangeInputSinceWhen('');
                        this.props.ChangeInputTilWhen('');
                    }
                }}>{this.props.updating === 'add'}
                Add Node </button>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        meetings: state.meetings.data,
        inputSinceWhen: state.meetings.inputSinceWhen,
        inputTilWhen: state.meetings.inputTilWhen,
        login: state.auth.login,
        username: state.auth.username,
        inputUser: state.auth.inputUser,
        inputPassword: state.auth.inputPassword,
    }),
    (dispatch) => ({
        //meeting
        GetAllMeetings: () => dispatch(actions.getAllMeetings()),
        DeleteMeeting: (id) => dispatch(actions.deleteMeeting(id)),

        //Add meeting
        AddMeeting: (meeting) => dispatch(actions.addMeeting(meeting)),
        ChangeInputSinceWhen: (value) => dispatch(actions.changeInputSinceWhen(value)),
        ChangeInputTilWhen: (value) => dispatch(actions.changeInputTilWhen(value)),

        //user
        Login: (user) => dispatch(actions.login(user)),
        Logout: () => dispatch(actions.logout()),
        ChangeInputUser: (value) => dispatch(actions.changeInputUser(value)),
        ChangeInputPassword: (value) => dispatch(actions.changeInputPassword(value)),
    })
)(App);
