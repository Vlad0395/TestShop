import React, { Component } from 'react';
import { connect } from 'react-redux';
import { payment } from '../actions/ProductActions';
import styled from 'styled-components';
import Popup from './Popup';

class Shipping extends Component {
    state = {
        name: '',
        address: '',
        phone: '',
        email: '',
        errorValidation: {},
    }
    handleChange = (event) => {
        let error = { ...this.state.errorValidation };
        let regular = '';
        let required = '';
        switch (event.target.name) {
            case 'name':
                regular = RegExp('^[a-zA-Z0-9]{1,15}$');
                error[event.target.name] = 'Name must consist of latin letters and numbers';
                required = 'field is required';
                break;
            case 'address':
                regular = RegExp('^[a-zA-Z0-9]{1,15}$');
                error[event.target.name] = 'Address must consist of latin letters and numbers';
                required = 'field is required';
                break;
            case 'phone':
                regular = RegExp('^[0-9]{8,12}$');
                error[event.target.name] = 'The phone number must consist of positive digits';
                break;
            case 'email':
                regular = RegExp('^\\w+@[a-zA-Z0-9_.-]+?\\.[a-zA-Z_.-]{2,3}$');
                error[event.target.name] = 'email not valid';
                required = 'field is required';
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

    handleError = () => {
        this.setState({ errorValidation: true });
        console.log('errorValidation', this.state.errorValidation)
    }

    handlePay = () =>{
        this.props.dispatch(payment())
    }

    render() {
        const { errorValidation, name, address, email } = this.state;
        const { sum, paymentSuccess } = this.props;
        console.log('sum', sum)
        console.log('errorValidation', errorValidation)
        console.log('name', name)
        console.log('address', address)
        console.log('email', email)

        return (
            <Form >
                { paymentSuccess && <Popup/> }
                <Label>
                    <Span>Name*</Span>
                    <Box>
                        <Input
                            type="text"
                            name='name'
                            value={this.state.name}
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
                        name="shipping options"
                        id="shippingOptions"
                        defaultValue={sum >= 300 ? 'Free express shipping' : 'Free shipping'}
                        disabled={sum >= 300}
                    >
                        <option value="Free shipping">Free shipping</option>
                        <option value="Express shipping - additional 9.99 €">Express shipping - additional 9.99 €</option>
                        <option value="Courier shipping - additional 19.99 €">Courier shipping - additional 19.99 €</option>
                        {sum >= 300 && <option value="Free express shipping">Free express shipping</option>}
                    </Select>
                </Label>
                <Div>
                    <Button
                        onClick={this.handlePay}
                        disabled={ 
                            !name || !address || !email || errorValidation.name || errorValidation.address || errorValidation.phone || errorValidation.email}
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
   
`;

const Label = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom:10px;
`;

const Span = styled.span`
    font-size: 20px;
    font-family: 'Courier New', Courier, monospace;
`;

const Input = styled.input`
    width: 250px;
    padding: 5px;
    margin: 5px;
    border: none;
    border-radius: 2%;
    color: ${props => props.error ? 'red' : 'black'}
`;

const Select = styled.select`
    width: 265px;
    background: #ffffff;
    padding: 5px;
    margin: 5px;
    border-radius: 2%;
`;

const Button = styled.button`
    width: 50px;
    padding: 5px;
    border-radius: 5%;
    margin-top: 20px;
`;

const Div = styled.div`
    text-align:right;
`;

const Error = styled.p`
    color: red;
    font-size:12px;
    padding:0;
    margin:0 0 0 10px;
    position:absolute;
    top:-13px;

`;

const Box = styled.div`
    display:flex;
    flex-direction:column;
    position:relative;
`;
