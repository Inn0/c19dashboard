import React from 'react';
import Navbar from './navbar';
import styled from 'styled-components';

const Page = styled.div`
    background-color: #f2f2f2;
    min-height: calc(100vh - 50px);
`;

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding: 50px;
    margin-top: 50px;
    grid-gap: 20px;

    @media (max-width: 1600px){
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (max-width: 1280px){
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 768px){
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;

const GridItem = styled.div`
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    min-height: 150px;
    box-shadow: 6px 6px 6px 0 var(--color-box-shadow);
    border-left: 5px solid var(--color-primary);

    &:hover {
        background-color: var(--color-tertiary);
        box-shadow: none;
        transition: 0.3s;
    }
`;

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            countries: []
        }
    }

    componentDidMount(){
        this.fetchAllCountryData();
    }

    fetchAllCountryData(){
        fetch('https://covid-api.mmediagroup.fr/v1/cases')
        .then(res => res.json())
        .then(res => {
            console.log(Object.values(res))
            this.setState({countries: Object.values(res)})
        })
    }

    //TODO: make this functionality show a seperate page or popup with information on one specific country
    fetchCountryData = (countryName)  => {
        fetch('https://covid-api.mmediagroup.fr/v1/cases?country='+countryName)
        .then(res => res.json())
        .then(res => {
            console.log(Object.values(res))
            this.setState({countries: Object.values(res)})
        })
    }

    render () {
        return(
            <Page>
                <Navbar fetchCountry={this.fetchCountryData}/>
                <Container>
                    {/* TODO: Convert these cards to a seperate component */}
                    {this.state.countries.map((country) => {
                        return <GridItem>
                                {country.All.country}<br />
                                Confirmed: {country.All.confirmed}<br />
                                Recovered: {country.All.recovered}<br />
                                Percentage: {((country.All.confirmed / country.All.population) * 100).toFixed(3)}%
                                </GridItem>
                    })}
                </Container>
            </Page>
        )
    }
}

export default Home