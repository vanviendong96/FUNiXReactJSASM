import React, { Component } from 'react';
import './App.css';
import StaffList from './components/StaffComponent';
import { Navbar, NavbarBrand } from 'reactstrap';
import { STAFFS } from './shared/staffs';
// import { OPTIONS } from './shared/options'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			staffs: STAFFS,
            responsiveCol: ""
		};
        this.handleChange = this.handleChange.bind(this);
	}

    // After component did mount, add eventlistener to catch resize of window
    // Whenever width of window satisfy below condition, we setState of this Component, 
    // this will effect change selected value of [SELECT]
    // and transfer responsiveCol to StaffList as a props
    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    resize() {
        if (window.innerWidth >= 992 ) {
            this.setState({ responsiveCol : "col-12 col-md-6 col-lg-4"});
        } else if (window.innerWidth < 992 && window.innerWidth >= 768) {
            this.setState({ responsiveCol : "col-12 col-md-6" })
        } else {
            this.setState({ responsiveCol : "col-12"})
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    handleChange(e) {
        this.setState({ responsiveCol: e.target.value });
    }
	render() {
		return (
			<div className="App">
				<Navbar dark color="primary">
					<div className="container">
						<NavbarBrand href="/">
							Staff Management Application v1.0
						</NavbarBrand>
					</div>
				</Navbar>
                <div className="container">
                    <select value={this.state.responsiveCol} onChange={this.handleChange}>
                        {/* {OPTIONS.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))} */}
                        <option value="col-12 col-md-6 col-lg-4">Three Columns</option>
                        <option value="col-12 col-md-6">Two Columns</option>
                        <option value="col-12">One Column</option>
                    </select>
                </div>
				<StaffList staffs={this.state.staffs} responsiveCol={this.state.responsiveCol} />
			</div>
		);
	}
}

export default App;
