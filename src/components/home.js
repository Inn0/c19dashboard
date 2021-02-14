import React from 'react';
import Navbar from './navbar';
import styled from 'styled-components';

const Page = styled.div`
    background-color: #f2f2f2;
    min-height: calc(100vh - 50px);
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    width: 70vw;
    margin-left: 15vw;
    margin-right: 15vw;
    min-height: 100px;
    background-color: #f2f2f2;
`;

const Title = styled.p`
    background-color: white;
    border-left: 5px solid var(--color-primary);
    padding: 10px;
    border-radius: 5px;
    box-shadow: 4px 4px 4px var(--color-box-shadow);
    font-size: 32px;
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-left: 5px solid var(--color-primary);
    padding: 10px;
    border-radius: 5px;
    font-size: 24px;
    box-shadow: 4px 4px 4px var(--color-box-shadow);
`;

const StatTitle = styled.p`
    font-weight: 550;
    width: 275px;
    margin: 0;
`;

const StatText = styled.p`
    margin: 0;
`;

const StatRow = styled.div`
    display: flex;
    flex-direction: row;    
`;

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            data: {}
        }
    }

    componentDidMount(){
        this.fetchCountryData("netherlands");
    }

    fetchCountryData = (countryName)  => {
        countryName = countryName.charAt(0).toUpperCase() + countryName.slice(1);
        fetch('https://covid-api.mmediagroup.fr/v1/cases?country='+countryName)
        .then(res => res.json())
        .then(res => {
            if(res.All == undefined){
                alert('Country not found!');
            } else {
                this.setState({ loading: false, data: res })
                console.log(this.state.data)
            }
        })
    }

    calcPercentage(part, total){
        var perc = part / total * 100;
        return perc.toFixed(3)
    }

    render () {
        return(
            <Page>
                <Navbar fetchCountry={this.fetchCountryData}/>
                <Container>
                    {this.state.loading ? <p>Loading...</p> : 
                        <div>
                            <Title>{this.state.data.All.country} ({this.state.data.All.continent})</Title>
                            <Body>
                                <StatRow>
                                    <StatTitle>Confirmed cases:</StatTitle>
                                    <StatText>{this.state.data.All.confirmed}</StatText>
                                </StatRow>
                                <StatRow>
                                    <StatTitle>Recovered patients:</StatTitle>
                                    <StatText>{this.state.data.All.recovered}</StatText>
                                </StatRow>
                                <StatRow>
                                    <StatTitle>Deaths:</StatTitle>
                                    <StatText>{this.state.data.All.deaths}</StatText>
                                </StatRow>          
                                <StatRow>
                                    <StatTitle>Percentage confirmed:</StatTitle>
                                    <StatText>{this.calcPercentage(this.state.data.All.confirmed, this.state.data.All.population)}</StatText>
                                </StatRow>   
                                <StatRow>
                                    <StatTitle>Percentage recovered:</StatTitle>
                                    <StatText>{this.calcPercentage(this.state.data.All.recovered, this.state.data.All.population)}</StatText>
                                </StatRow>
                                <StatRow>
                                    <StatTitle>Percentage passed:</StatTitle>
                                    <StatText>{this.calcPercentage(this.state.data.All.deaths, this.state.data.All.population)}</StatText>
                                </StatRow>              
                            </Body>
                        </div>
                    }
                </Container>
            </Page>
        )
    }
}

export default Home