import React from 'react';
import { connect } from 'react-redux';
import {Tab, MenuItem, Nav, Row, Col, NavItem, NavDropdown, Badge} from 'react-bootstrap';
import Settings from './LB_settings';
import Graphics from './LB_graphics';
import Appreciation from './LB_appreciation';
import Distillation from './LB_distillation';
import Reflux from './LB_reflux';
import Brewing from './LB_brewing';
import Heater from './LB_heater';
import Camera from './camera.js';
import SettingSensors from './LB_settingSensors';
import './index.css';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class App extends React.Component {

    static onlineTick = null;

    onOnline = () => {
        this.props.onOnlineOn();
    };
    onOnSetHeater = (val) => {
        this.props.onOnSetHeater(val);
    };

    render() {

        return (
            <Tab.Container id="tab1" defaultActiveKey="home">
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="home"><Badge bsStyle={this.props.online ? 'success' : 'danger'}>Дом</Badge></NavItem>
                            <NavItem eventKey="settings">Настройки</NavItem>
                            <NavItem eventKey="graphics">Графики</NavItem>
                            <NavDropdown title="Помощь">
                                <MenuItem eventKey="settingSensors">Подключение датчиков</MenuItem>
                                <MenuItem eventKey="help2" href="https://luckycenter.ru/mnogofunkcionalnaja-avtomatika-luckybox">Обновление
                                    прошивки</MenuItem>
                                <MenuItem eventKey="help3">Благодарности</MenuItem>
                                <MenuItem divider/>
                                <MenuItem eventKey="help4" href="https://luckycenter.ru/forum/konstruktorskoe-bjuro/avtomatizacija/avtomatika-luckybox">Форум
                                    поддержки</MenuItem>
                            </NavDropdown>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <CSSTransitionGroup
                            transitionName="carousel"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
                            <Header />
                        </CSSTransitionGroup>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="home"><Navigation2 onOnSetHeater={this.onOnSetHeater} onOnline={this.onOnline}  online = {this.props.online} heaterVal = {this.props.heaterVal}/></Tab.Pane>
                            <Settings/>
                            <Graphics/>
                            <SettingSensors/>
                            <Appreciation/>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}
export default connect(
    state => ({
        online: state.online,
        heaterVal: state.heaterVal
    }),
    dispatch => ({
        onOnlineOn: () => {
            dispatch({ type: 'ONLINE_ON'});
        },
        onOnSetHeater: (val) => {
            dispatch({ type: 'HEATER_VAL', payload: val});
        }
    })
)(App);


class Navigation2 extends React.Component {
    render() {
        return (
            <Tab.Container id="tab2" defaultActiveKey="heater">
                <Row className="clearfix">
                    <Col sm={12}>
                        <Nav bsStyle="tabs">
                            <NavItem eventKey="distillation">Дистилляция</NavItem>
                            <NavItem eventKey="reflux">РК</NavItem>
                            <NavItem eventKey="brewing">Затирание</NavItem>
                            <NavItem eventKey="heater">Мощность ТЭНа</NavItem>
                            <NavItem eventKey="camera">Камера</NavItem>
                        </Nav>
                    </Col>
                    <Col sm={12}>
                        <Tab.Content animation>
                            <Distillation heaterVal={ this.props.heaterVal } online={ this.props.online} onOnline={this.props.onOnline} />
                            <Reflux heaterVal={ this.props.heaterVal } online={ this.props.online } onOnline={this.props.onOnline} />
                            <Brewing online={ this.props.online } onOnline={this.props.onOnline}  />
                            <Heater onOnSetHeater={this.props.onOnSetHeater}/>
                            <Camera/>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <img key='a1' alt="Заставка" src="headerLB.jpg" width="100%"/>
                    </div>
                </div>
            </div>
        );
    }
}

