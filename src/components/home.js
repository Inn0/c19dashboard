import React from 'react';
import Navbar from './navbar';
import styled from 'styled-components';
import { PieChart } from 'react-minimal-pie-chart';

const Page = styled.div`
    background-color: #f2f2f2;
    min-height: calc(100vh - 50px);

    @media screen and (max-width: 768px){
        min-height: calc(100vh - 100px);
    }
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

    @media screen and (max-width: 1600px){
        width: 95vw;
        margin-left: 2.5vw;
        margin-right: 2.5vw;
    }

    @media screen and (max-width: 768px){
        margin-top: 100px;
    }
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
    flex-direction: row;
    background-color: white;
    padding: 15px;
    border-radius: 5px;
    font-size: 24px;
    box-shadow: 4px 4px 4px var(--color-box-shadow);

    @media screen and (max-width: 768px){
        flex-direction: column;
    }
`;

const StatHeader = styled.p`
    font-weight: 550;
    font-size: 28px;
    width: 390px;
    margin: 0;
    color: var(--color-primary)
`;

const StatTitle = styled.p`
    font-weight: 550;
    width: 390px;
    margin: 0;
`;

const StatText = styled.p`
    margin: 0;
`;

const StatRow = styled.div`
    display: flex;
    flex-direction: row;    
`;

const Chart = styled(PieChart)`
    width: 15%;
    min-width: 200px;
    max-width: 300px;
    margin-top: 10px;

    @media screen and (max-width: 768px){
        padding: 10px;
        width: 60%;
        margin-left: calc(20% - 15px);
        margin-right: 20%;
    }
`;

const Stats = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
`;

const Divider = styled.div`
    width: 100%;
    height: 10px;
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
                            <Title>{this.state.data.All.country} ({this.state.data.All.location})</Title>
                            <Body>
                                <Stats>
                                    <StatHeader>Covid Statistics</StatHeader>
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
                                        <StatTitle>Confirmed per 100k:</StatTitle>
                                        <StatText>{((this.state.data.All.confirmed / this.state.data.All.population) * 100000).toFixed(0)}</StatText>
                                    </StatRow>

                                    <Divider />    
                                    
                                    <StatHeader>Information</StatHeader>
                                    <StatRow>
                                        <StatTitle>Population per square kilometer:</StatTitle>
                                        <StatText>{(this.state.data.All.population / this.state.data.All.sq_km_area).toFixed(2)}</StatText>
                                    </StatRow>
                                    <StatRow>
                                        <StatTitle>Capital:</StatTitle>
                                        <StatText>{this.state.data.All.capital_city}</StatText>
                                    </StatRow>
                                    <StatRow>
                                        <StatTitle>Life expectancy:</StatTitle>
                                        <StatText>{this.state.data.All.life_expectancy}</StatText>
                                    </StatRow>

                                    <Divider />

                                    <StatHeader>Percentages</StatHeader>
                                    <StatRow>
                                        <StatTitle>Percentage confirmed:</StatTitle>
                                        <StatText>{this.calcPercentage(this.state.data.All.confirmed, this.state.data.All.population)}%</StatText>
                                    </StatRow>   
                                    <StatRow>
                                        <StatTitle>Percentage recovered:</StatTitle>
                                        <StatText>{this.calcPercentage(this.state.data.All.recovered, this.state.data.All.population)}%</StatText>
                                    </StatRow>
                                    <StatRow>
                                        <StatTitle>Percentage passed:</StatTitle>
                                        <StatText>{this.calcPercentage(this.state.data.All.deaths, this.state.data.All.population)}%</StatText>
                                    </StatRow>
                                </Stats>
                                
                                <Chart
                                    data={[
                                        {title: 'Confirmed: '+this.state.data.All.confirmed, value: this.state.data.All.confirmed, color: 'orange'},
                                        {title: 'Recovered: '+this.state.data.All.recovered, value: this.state.data.All.recovered, color: 'green'},
                                        {title: 'Deaths: '+this.state.data.All.deaths, value: this.state.data.All.deaths, color: 'red'}
                                    ]}
                                    lineWidth="70"
                                    paddingAngle='1'
                                />
                            </Body>
                        </div>
                    }
                </Container>
            </Page>
        )
    }
}

export default Home