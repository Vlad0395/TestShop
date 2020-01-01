import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';

class Popup extends Component {
    render() {
        
        const { sum, express, courier, select } = this.props;
        let delivery = ''
        
        switch(select) {
            case 'Express shipping - additional 9.99 €':
                delivery=express
            break;
            case 'Courier shipping - additional 19.99 €':
                delivery=courier
            break;
            case 'Free express shipping':
                delivery='free express shipping'
            break;
            case 'Free shipping':
                delivery='free'
            break;
            default:
                delivery = '';
            break;
        }
        console.log('typeof', typeof(delivery))
        return (
            <Div>
                <Title> Order successfully paid </Title>
                <Box>
                    <span> The order amount is {sum}</span> 
                    <span> Delivery {delivery}</span> 
                    <span> Everything was paid for {sum + (typeof(delivery) =='number'? delivery : '')}</span> 
                </Box>
            </Div>
        )
    }
};

const mapStateToProps = (state) => {
    const { sum, express, courier } = state.productReducer;
    return {
        sum,
        express,
        courier,
    }

};

export default connect(mapStateToProps)(Popup)

const Div = styled.div`
    color: black;
    display:flex;
    flex-direction:column;
    position: absolute;
    opacity:0.8;
    width:450px;
    height: 200px;
    background: lightblue;
    z-index:1;
    border:1px solid gray;
    border-radius: 10%;
    padding:10px
`;

const Title = styled.span`
    font-size:20px;
    color: green;
    text-align:center;
`;

const Box = styled.div`
    display:flex;
    flex-direction:column;
    padding: 20px;
    text-align:center;
`;