import React from 'react';

class Login extends React.Component {
    _isMounted = false;

    refEmail = React.createRef();
    refPw = React.createRef();;

    state = { msg: '' }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this._isMounted) {
            this.setState({ msg: '' });
        }
        const resp = await this.authenticate(
            this.refEmail.current.value,
            this.refPw.current.value
        );
        if (resp['email']) {
            this.props.signin(resp.email);
        }
        if (this._isMounted) {
            this.setState({ msg: 'You shall not pass!' });
        }
    }

    authenticate = async (email, pw) => {
        return fetch(`http://neat-mvp-api.herokuapp.com/v1/auth?email=${email}&password=${pw}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
        .then(response => response.json());
    }

    render() {
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <form className="form-signin mt-5" onSubmit={this.handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                        <label className="sr-only">Email address</label>
                        <input ref={this.refEmail} type="email" className="form-control mb-3" placeholder="Email address" required autoFocus />
                        <label className="sr-only">Password</label>
                        <input ref={this.refPw} type="password" className="form-control mb-3" placeholder="Password" required />
                        <h5 className="text-danger">{this.state.msg}</h5>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    </form>
                </div>
                <div className="col-3"></div>
            </div>
        );
    }
}

export default Login;
