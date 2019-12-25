import React, { PureComponent } from 'react';
import Skeleton from 'react-skeleton-loader';
import styled from 'styled-components';
import Image from "../images/image.png";

class CartItem extends PureComponent {
    render() {
        const { product, index, handleChange, handleMove, handleRemove, numbers } = this.props
        return (
            <Card className="card" >
                {product && <BtnDelete
                    onClick={() => handleRemove(product.id, index)}
                >
                    <i className="fas fa-trash"></i>
                </BtnDelete>}
                {product &&
                    <Img src={Image} alt={product && product.image} />}
                <Description >
                    <DescriptionH3>{product && product.title || <Skeleton />}</DescriptionH3>
                    <Paragraf>{product && product.about || <Skeleton count={3} />}</Paragraf>
                </Description>
                {product && <Number >
                    <button className='btnMinus' onClick={() => handleMove(index, -1)}>-</button>
                    <NumParagraf
                        name='number'
                        onChange={() => handleChange(index)}
                    >{numbers[index] || 1}</NumParagraf>
                    <button className='btnPlus' onClick={() => handleMove(index, +1)}>+</button>
                </Number>}
                {product && <Price className='price'>
                    <p>{product && product.price * (numbers[index] || 1)} €</p>
                </Price>}
            </Card>
        )
    }
}

export default CartItem;

const Card = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    border-bottom: 1px solid #a3a7a5;
    padding: 10px;
    position: relative;
    @media screen and (max-width: 1280px){
        border-bottom: 1px solid #a3a7a5;
        padding: 10px;
    }
    @media screen and (max-width: 1024px){
        border-bottom: 1px solid #a3a7a5;
        padding: 10px;
    }
    @media screen and (max-width: 768px) {
        border-bottom: 1px solid #a3a7a5;
        padding: 10px;
    }
    @media screen and (max-width: 480px) {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px; 
        border: 1px solid #a3a7a5;
        border-radius: 10%;
    }
`;

const BtnDelete = styled.button`
    position: absolute;
    right: 35px;
    top: 15px;
    border: none;
    background: none;
    padding: 15px;
    &:hover{
        background: grey;
        opacity: 0.5;
        border-radius: 50%;
    }
`;

const Img = styled.img`
    width: 100px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    @media screen and (max-width: 1280px){
        width: 100px;
        padding: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3)
    }
    @media screen and (max-width: 1024px){
        width: 100px;
        padding: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }
    @media screen and (max-width: 768px) {
        width: 100px;
        padding: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }
    @media screen and (max-width: 480px) {
        width: 100px;
        padding: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }
`;

const Description = styled.div`
    width: 40%;
    border-right: 1px solid #a3a7a5;
    padding: 10px;
    text-align: left;
    @media screen and (max-width: 480px) {
        width: 90%;
        border-right: none;
        padding: 10px;
        text-align: left;
    }
`;

const Paragraf = styled.p`
    font-size: 12px;
    line-height: 20px;
`;

const Number = styled.div`
    padding: 10px;
    display:flex
`;

const Price = styled.div`
    padding: 0 10px;
    width: 40px;
`;

const NumParagraf = styled.p`
    width: 30px;
    margin: 0 10px;
    border: none;
    text-align: center;
`;

const DescriptionH3 = styled.h3`
    @media screen and (max-width: 480px) {
        text-align: center;
    }
`;