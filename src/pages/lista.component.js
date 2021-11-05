import React, {Component} from "react";
import DataTable, {memoize} from 'react-data-table-component';

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

import {Modal, Button, Toast, ToastContainer} from 'react-bootstrap';

import Register from '../components/register.component'

const iconList = Object
    .keys(Icons)
    .filter(key => key !== "fas" && key !== "prefix")
    .map(icon => Icons[icon])

library.add(...iconList)


export default class Lista extends Component {
    constructor(props) {
        super(props);
        this.obtenerUsuarios = this.obtenerUsuarios.bind(this);

        this.state = {
            showRegistro: false,
            showEditar: false,
            showToast: false,
            mensajeApiDisable: "",
            userId: "",
            rows: "",
            columns: [

                {
                    name: 'username',
                    selector: row => row.username,
                    sortable: true,
                },
                {
                    name: 'correo',
                    selector: row => row.correo,
                    sortable: true,
                },
                {
                    name: 'telefono',
                    selector: row => row.telefono,
                    sortable: true,
                },
                {
                    name: 'perfil',
                    selector: row => row.perfil_id,
                    sortable: true,
                },
                {
                    name: 'status',
                    selector: row => row.estatus,
                    sortable: true,
                },
                {
                    cell: (row) => (
                        <>
                            <button  onClick={() => this.handleButtonEditar(row.id)} id={row.id}
                                     data-toggle="tooltip" data-placement="top" title="Editar usuario"
                                    className='btn btn-sm btn-primary'><FontAwesomeIcon icon="user-edit"/></button>
                            <button onClick={() => this.handleButtonDisable(row.id)} id={row.id}
                                    data-toggle="tooltip" data-placement="top" title="Desactivar usuario"
                                    className='btn btn-sm btn-danger'><FontAwesomeIcon icon="user-slash"/></button>
                            <button onClick={() => this.handleButtonEnable(row.id)} id={row.id}
                                    data-toggle="tooltip" data-placement="top" title="Reactivar usuario"
                                    className='btn  btn-sm btn-success'><FontAwesomeIcon icon="user-plus"/></button>
                        </>),
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                },
            ]
        };
    }

    handleChange = state => {
        console.log('state', state.selectedRows);
        this.setState({selectedRows: state.selectedRows});
    };

    componentDidMount() {
        this.obtenerUsuarios();
    }

    obtenerUsuarios() {
        UserService.getUsers().then(
            response => {
                this.setState({
                    rows: response.data
                });
            },
            error => {
                this.setState({
                    rows:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    registrar() {
        this.setState({
            showRegistro: true
        })
    }

    hideRegistro() {
        this.setState({
            showRegistro: false
        })
        this.obtenerUsuarios();
    }

    hideEditar() {
        this.setState({
            showEditar: false
        })
        this.obtenerUsuarios();
    }

    handleButtonEditar(id) {
        this.setState({
            userId: id,
            showEditar: true
        })
    };

    toggleToast() {
        this.setState({showToast: !this.state.showToast});
        this.obtenerUsuarios();
    }

    handleButtonDisable(userId) {
        AuthService.disable(
            userId
        ).then(
            response => {
                this.setState({
                    mensajeApiDisable: response.data.message,
                    showToast: true
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
                    mensajeApiDisable: resMessage
                });
            }
        );
    };


    handleButtonEnable(userId) {
        AuthService.enable(
            userId
        ).then(
            response => {
                this.setState({
                    mensajeApiDisable: response.data.message,
                    showToast: true
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
                    mensajeApiDisable: resMessage
                });
            }
        );
    };

    handleClick = () => {
        console.log('Se hizo click');
    }

    render() {
        const {showRegistro, showEditar, userId, showToast, mensajeApiDisable} = this.state;
        return (<>
                <FontAwesomeIcon icon={['fas', 'code']}/>
                <button onClick={() => this.registrar()} className='btn btn-success'><FontAwesomeIcon
                    icon="user"/> Registrar Usuario
                </button>
                <DataTable title="Lista de Usuarios" columns={this.state.columns} data={this.state.rows} pagination/>


                <Modal show={showRegistro} onHide={showRegistro} backdrop="static" keyboard={false}>
                    <Modal.Header>
                        <Modal.Title>Registrar Usuarios</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Register/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.hideRegistro()}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditar} onHide={showEditar} backdrop="static" keyboard={false}>
                    <Modal.Header>
                        <Modal.Title>Editar Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Register userId={userId}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.hideEditar()}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>


                <ToastContainer position="top-end" className="p-3">
                    <Toast show={showToast} onClose={() => this.toggleToast()} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Informacion del sistema</strong>
                        </Toast.Header>
                        <Toast.Body>{mensajeApiDisable}</Toast.Body>
                    </Toast>
                </ToastContainer>


            </>

        );
    }
}
