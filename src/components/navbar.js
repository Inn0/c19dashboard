import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 50px;
    background-color: var(--color-primary); 
    box-shadow: 0 4px 4px 0 var(--color-box-shadow);
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0;
    z-index: 100;
`;

const Title = styled.p`
    font-size: 30px;
    color: var(--color-text-secondary);
    margin: 5px;
    margin-left: 55px;
`;

class Navbar extends React.Component {
    render(){
        return (
            <Container>
                <Title>C19Dashboard</Title>
            </Container>
        )
    }
}

export default Navbar