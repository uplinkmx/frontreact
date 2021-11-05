import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import AuthService from "../services/auth.service";

import UserService from "../services/user.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                El campo es Requerido!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                El correo No es valido.
            </div>
        );
    }
};


const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                El Usuario Debe Ser entre 3 y 20 caracteres.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                el password debe ser entre 6 y 40 caracteres.
            </div>
        );
    }
};

const vperfil = value => {
    if (value.length == '') {
        return (
            <div className="alert alert-danger" role="alert">
                debe seleccionar al menos una opcion
            </div>
        );
    }
};

const vestatus = value => {
    if (value.length == '') {
        return (
            <div className="alert alert-danger" role="alert">
                debe seleccionar al menos una opcion
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            userId: this.props.userId,
            isEditar: false,
            perfiles: [],
            username: "",
            email: "",
            password: "",
            telefono: "",
            perfil: "",
            estatus: 1,
            successful: false,
            message: ""

        };

        console.log(this.state.userId);

        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangePerfil = this.onChangePerfil.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.obtenerPerfiles = this.obtenerPerfiles.bind(this);
        this.obtenerUsuario = this.obtenerUsuario.bind(this);
        this.obtenerPerfiles();
        if (this.state.userId) {
            this.obtenerUsuario();
        }

    }

    obtenerUsuario() {
        UserService.getUser(this.state.userId).then(
            response => {
                console.log(this.response);
                this.setState({
                    username: response.data.username,
                    email: response.data.correo,
                    password: '',
                    telefono: response.data.telefono,
                    perfil: response.data.perfil,
                    estatus: response.data.estatus,
                    isEditar: true
                });
            },
            error => {
                this.setState({
                    error:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    obtenerPerfiles() {
        UserService.getProfiles().then(
            response => {
                console.log(this.response);
                this.setState({
                    perfiles: response.data
                });
            },
            error => {
                this.setState({
                    perfiles:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            telefono: e.target.value
        });
    }

    onChangePerfil(e) {
        this.setState({
            perfil: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            estatus: e.target.value
        });
    }


    handleRegister(e) {
        e.preventDefault();
        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            console.log(this.state.isEditar);
            if (this.state.isEditar) {
                AuthService.edit(
                    this.state.username,
                    this.state.email,
                    this.state.password,
                    this.state.telefono,
                    this.state.perfil,
                    this.state.estatus,
                    this.state.userId
                ).then(
                    response => {
                        this.setState({
                            message: response.data.message,
                            successful: true
                        });
                    },
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        this.setState({
                            successful: false,
                            message: resMessage
                        });
                    }
                );
            } else {

                AuthService.register(
                    this.state.username,
                    this.state.email,
                    this.state.password,
                    this.state.telefono,
                    this.state.perfil,
                    this.state.estatus
                ).then(
                    response => {
                        this.setState({
                            message: response.data.message,
                            successful: true
                        });
                    },
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        this.setState({
                            successful: false,
                            message: resMessage
                        });
                    }
                );

            }


        }
    }

    render() {
        const {isEditar} = this.state;
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Usuario</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required, vusername]}
                                        disabled={(isEditar) ? "disabled" : ""}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        validations={[required, email]}
                                        disabled={(isEditar) ? "disabled" : ""}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required, vpassword]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Telefono</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="telefono"
                                        value={this.state.telefono}
                                        onChange={this.onChangePhone}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Perfil</label>
                                    <Select
                                        className="form-control"
                                        name="perfil"
                                        value={this.state.perfil}
                                        onChange={this.onChangePerfil}
                                        validations={[required, vperfil]}
                                    >
                                        <option value=''>
                                            Seleccione Un perfil
                                        </option>
                                        {this.state.perfiles.map(perfil => (
                                            <option key={perfil.id} value={perfil.id}>
                                                {perfil.nombre}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Estatus</label>
                                    <Select
                                        className="form-control"
                                        name="estatus"
                                        value={this.state.estatus}
                                        onChange={this.onChangeStatus}
                                        validations={[required, vestatus]}
                                    >
                                        <option value=''>
                                            Seleccione Un estatus
                                        </option>
                                        <option value="1">Activo</option>
                                        <option value="0">Desactivado</option>
                                    </Select>

                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">
                                        {isEditar ? 'Editar' : 'Registrar'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}
