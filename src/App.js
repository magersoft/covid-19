import React from 'react';

import { Cards, Chart, CountryPicker, Alert } from './components';
import { playSound } from './components/Alert/playSound';
import { fetchData } from './api';
import style from './App.module.scss'

import coronaImg from './assets/image.png';

class App extends React.Component {
  state = {
    data: {},
    country: ''
  };

  async componentDidMount() {
    const time = 1000 * 60 * 5;

    const data = await fetchData();

    let tempData = data;

    this.setState({ data });

    setTimeout(() => {
      playSound();
    }, 3000);

    const interval = setInterval(async () => {
      console.info('Request');
      const data = await fetchData();
      const { confirmed, recovered, deaths } = data;

      if (tempData.confirmed.value !== confirmed.value || tempData.deaths.value !== deaths.value) {
        tempData = data;
        this.setState({ data });
        playSound();
        console.warn('Updated data!');
      }
    }, time);
  }

  handleCountryChange = async country => {
    const data = await fetchData(country);
    this.setState({ data, country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={style.container}>
        <img src={coronaImg} alt="covid-19 coronavirus" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        <Alert />
      </div>
    );
  }
}

export default App;
