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
    margin-left: 10px;
`;

const SearchBar = styled.input`
    font-size: 16px;
    background-color: white;
    color: var(--color-secondary);
    border-radius: 5px;
    border: none;
    width: 400px;
    height: 20px;
    padding: 5px;
    margin: 10px;
`;

class Navbar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchValue: ""
        }
    }


    render(){
        return (
            <Container>
                <Title>C19Dashboard</Title>
                <SearchBar 
                    type="text" 
                    placeholder="Search for a country..."
                    onKeyPress={event => {
                        if(event.key === 'Enter'){
                            this.props.fetchCountry(event.target.value)
                        }
                    }}
                />
            </Container>
        )
    }
}

export default Navbar