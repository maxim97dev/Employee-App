import { Component } from "react";

import './employers-add-form.scss';

class EmployersAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: '',
            valid: {
                name: true,
                salary: true
            }
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitForm = (e) => {
        e.preventDefault();

        if (this.state.name.length < 3 || !this.state.salary.length) {
            this.setState({
                valid: {
                    name: !(this.state.name.length < 3),
                    salary: !!this.state.salary.length
                }
            })
            return;
        }

        this.props.onAdd(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: '',
            valid: {
                name: true,
                salary: true
            }
        })
    }

    render() {
        const {name, salary, valid} = this.state;

        const nameValidation = valid.name ? '' : 'red',
            salaryValidation = valid.salary ? '' : 'red';

        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form className="add-form d-flex flex-column flex-lg-row align-items-center justify-content-around"
                      onSubmit={this.onSubmitForm}
                >
                    <input type="text"
                           className={`form-control new-post-label mb-3 mb-md-3 mb-lg-0 ${nameValidation}`}
                           placeholder="Как его зовут?"
                           name="name"
                           value={name}
                           onChange={this.onValueChange}
                    />
                    <input type="number"
                           className={`form-control new-post-label mb-3 mb-md-3 mb-lg-0 ${salaryValidation}`}
                           placeholder="З/П в $?"
                           name="salary"
                           value={salary}
                           onChange={this.onValueChange}
                    />
                    <button type="submit"
                            className="btn btn-outline-light"
                    >
                        Добавить
                    </button>
                </form>
            </div>
        )
    }
}

export default EmployersAddForm;