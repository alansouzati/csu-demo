import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Meter from 'grommet/components/Meter';
import Notification from 'grommet/components/Notification';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import LinkPrevious from 'grommet/components/icons/base/LinkPrevious';

import {
  loadAirport, unloadAirport
} from '../actions/airports';

import { getTypeDisplayName, pageLoaded } from './utils';

class Airport extends Component {

  componentDidMount() {
    const { match: { params }, dispatch } = this.props;
    pageLoaded('Airport');
    dispatch(loadAirport(params.id));
  }

  componentWillUnmount() {
    const { match: { params }, dispatch } = this.props;
    dispatch(unloadAirport(params.id));
  }

  render() {
    const { error, airport } = this.props;

    let errorNode;
    let airportNode;
    if (error) {
      errorNode = (
        <Notification status='critical' size='large' state={error.message}
          message='An unexpected error happened, please try again later' />
      );
    } else if (!airport) {
      airportNode = (
        <Box direction='row' responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}>
          <Spinning /><span>Loading...</span>
        </Box>
      );
    } else {
      airportNode = (
        <Box
          pad={{ between: 'small', vertical: 'medium', horizontal: 'medium' }}>
          <Box pad={{ between: 'small' }}>
            <Label margin='none'>Type</Label>
            <Heading tag='h4' strong={true}>
              {getTypeDisplayName(airport.type)}
            </Heading>
          </Box>
          <Box pad={{ between: 'small' }}>
            <Label margin='none'>Latitude</Label>
            <Heading tag='h4' strong={true}>
              {airport.latitude}
            </Heading>
          </Box>
          <Box pad={{ between: 'small' }}>
            <Label margin='none'>Longitude</Label>
            <Heading tag='h4' strong={true}>
              {airport.longitude}
            </Heading>
          </Box>
          <Box pad={{ between: 'small' }}>
            <Label margin='none'>Location</Label>
            <Heading tag='h4' strong={true}>
              {airport.city} - {airport.state}, {airport.country}
            </Heading>
          </Box>
        </Box>
      );
    }

    return (
      <Article primary={true} full={true}>
        <Header direction='row' size='large' colorIndex='light-2'
          align='center' responsive={false}
          pad={{ horizontal: 'small' }}>
          <Anchor path='/airports'>
            <LinkPrevious a11yTitle='Back to Airports' />
          </Anchor>
          <Heading margin='none' strong={true}>
            {airport ? airport.name : 'Airport'}
          </Heading>
        </Header>
        {errorNode}

        {airportNode}
      </Article>
    );
  }
}

Airport.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  match: PropTypes.object.isRequired,
  airport: PropTypes.object
};

const select = state => ({ ...state.airports });

export default connect(select)(Airport);
