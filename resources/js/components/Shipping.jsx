import React, { Component } from 'react';
import { connect } from 'react-redux';
import { payment, costDelivery } from '../actions/ProductActions';
import styled from 'styled-components';
import Popup from './Popup';
import '../style.css'
class Shipping extends Component {
    state = {
        name: '',
        address: '',
        phone: '',
        email: '',
        select:'Free shipping',
        errorValidation: {},
    }
    handleChange = (event) => {
        let error = { ...this.state.errorValidation };
        let regular = '';
        switch (event.target.name) {
            case 'name':
                regular = RegExp('^[a-zA-Z0-9]{1,15}$');
                error[event.target.name] = 'Name must contain of latin letters and numbers';
                break;
            case 'address':
                regular = RegExp('^[a-zA-Z0-9]{1,15}$');
                error[event.target.name] = 'Address must contain of latin letters and numbers';
                break;
            case 'phone':
                regular = RegExp('^[0-9]{8,12}$');
                error[event.target.name] = 'The phone number must contain of positive digits';
                break;
            case 'email':
                regular = RegExp('^\\w+@[a-zA-Z0-9_.-]+?\\.[a-zA-Z_.-]{2,3}$');
                error[event.target.name] = 'email not valid';
                break;
            default:
                regular = '';
                break;
        }

        this.setState({ [event.target.name]: event.target.value });
        if (event.target.value.match(regular)) {
            error[event.target.name] = '';
            this.setState({ errorValidation: error });
        } else {
            this.setState({ errorValidation: error })
        }
        // if (event.target.value.lenght === 0 || !event.target.value ){
        //     error[event.target.name] = '';
        //     this.setState({ errorValidation: required });
        // }
    };
    handleChangeSelect = () =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleError = () => {
        this.setState({ errorValidation: true });
    }

    handlePay = () => {
        this.props.dispatch(payment())
    }

    handleCostDelivery = (express, courier) => {
        this.props.dispatch(costDelivery(express, courier))
    }

    render() {
        const { errorValidation, name, address, email, select } = this.state;
        const { sum, paymentSuccess } = this.props;
        let express = 9.99;
        let courier = 19.99;
        console.log('select', select)
        return (
            <Form >
                {paymentSuccess && 
                    <Popup
                        select={select}
                    />}
                <Label>
                    <Span>Name*</Span>
                    <Box>
                        <Input
                            type="text"
                            name='name'
                            value={this.state.name}
                            placeholder="Vlad"
                            required
                            onChange={this.handleChange}
                            error={Boolean(errorValidation && errorValidation.name)}
                        />
                        <Error>{errorValidation.name}</Error>
                    </Box>
                </Label>
                <Label >
                    <Span>Address*</Span>
                    <Box>
                        <Input
                            type="text"
                            name='address'
                            placeholder='street'
                            value={this.state.address}
                            required
                            onChange={this.handleChange}
                            error={Boolean(errorValidation && errorValidation.address)}
                        />
                        <Error>{errorValidation.address}</Error>
                    </Box>
                </Label>
                <Label >
                    <Span>Phone</Span>
                    <Box>
                        <Input
                            type="tel"
                            name='phone'
                            placeholder='380504588746'
                            value={this.state.phone}
                            onChange={this.handleChange}
                            error={Boolean(errorValidation && errorValidation.phone)}
                        />
                        <Error>{errorValidation.phone}</Error>
                    </Box>
                </Label>
                <Label >
                    <Span>Email*</Span>
                    <Box>
                        <Input
                            type="email"
                            name='email'
                            placeholder='email@gmail.com'
                            value={this.state.email}
                            required
                            onChange={this.handleChange}
                            error={Boolean(errorValidation && errorValidation.email)}
                        />
                        <Error>{errorValidation.email}</Error>
                    </Box>
                </Label>
                <Label >
                    <Span>Shipping options</Span>
                    <Select
                        name="select"
                        id="shippingOptions"
                        defaultValue={sum >= 300 ? 'Free express shipping' : 'Free shipping'}
                        onChange={this.handleChangeSelect}
                        disabled={sum >= 300}
                    >
                        <option value="Free shipping">Free shipping</option>
                        <option value="Express shipping - additional 9.99 €">Express shipping - additional {express} €</option>
                        <option value="Courier shipping - additional 19.99 €">Courier shipping - additional {courier} €</option>
                        {sum >= 300 && <option value="Free express shipping">Free express shipping</option>}
                    </Select>
                </Label>
                <Div>
                    <Button
                        onClick={
                            () => {
                                this.handlePay()
                                this.handleCostDelivery(express, courier)
                            }
                        }
                        disabled={
                            !name || !address || !email || errorValidation.name || errorValidation.address || errorValidation.phone || errorValidation.email || paymentSuccess}
                    >
                        PAY
                    </Button>
                </Div>
            </Form>
        )
    }
}

const mapStateToProps = (state) => {
    const { sum, paymentSuccess } = state.productReducer;
    return {
        sum,
        paymentSuccess,
    }
}

export default connect(mapStateToProps)(Shipping);

const Form = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #456264;
    background: #f2f3f1;
    position:relative;
    z-index:100;
    @media screen and (max-width: 1280px){
        width:40%
    }
    @media screen and (max-width: 1024px){
        width:50%
    }
    @media screen and (max-width: 768px) {
        width:65%
    }
    @media screen and (max-width: 480px) {
        width:100%;
        border:none;
    }
`;

const Label = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom:10px;
    @media screen and (max-width: 480px) {
        width:100%;
        flex-direction:column;
        align-items:left;
    }
`;

const Span = styled.span`
    font-size: 20px;
    font-family: 'Courier New', Courier, monospace;
    @media screen and (max-width: 480px) {
        width:100%;
        margin-left:15px;
    }
`;

const Input = styled.input`
    width: 250px;
    padding: 5px;
    margin: 5px;
    border: none;
    border-radius: 2%;
    color: ${props => props.error ? 'red' : 'black'};
    @media screen and (max-width: 480px) {
        width:95%;
    }
`;

const Select = styled.select`
    width: 265px;
    background: #ffffff;
    padding: 5px;
    margin: 5px;
    border-radius: 2%;
    @media screen and (max-width: 480px) {
        width:100%;

    }
`;

const Button = styled.button`
    width: 50px;
    padding: 5px;
    border-radius: 5%;
    margin-top: 20px;
`;

const Div = styled.div`
    text-align:right;
    @media screen and (max-width: 480px) {
        text-align:center;
        width:100%;
    }
`;

const Error = styled.p`
    color: red;
    font-size:12px;
    padding:0;
    margin:0 0 0 10px;
    position:absolute;
    top:-13px;
    @media screen and (max-width: 480px) {
        top: -15px;
        right: 25px;
    }
`;

const Box = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
    @media screen and (max-width: 480px) {
        width:100%
    }
`;
