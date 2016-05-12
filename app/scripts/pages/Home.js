import React, {Component, PropTypes} from 'react';
import HomeContainer from '../components/home/HomeContainer';
import HeaderContainer from '../components/header/HeaderContainer';

class Home extends Component {

  render() {
    return (
      <div>
        <HeaderContainer
          params={this.props.params}
        />
        <HomeContainer
          params={this.props.params}
        />
      </div>
    );
  }
}

Home.propTypes = {
  params: PropTypes.object.isRequired
};

export default Home;
