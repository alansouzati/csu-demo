import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Paragraph from 'grommet/components/Paragraph';
import Spinning from 'grommet/components/icons/Spinning';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';

import {
  loadAirports, unloadAirports
} from '../actions/airports';

import { getTypeDisplayName, pageLoaded } from './utils';

class Airports extends Component {

  constructor() {
    super();

    this.state = {
      airport: {
        type: 'closed',
      },
      showAddAirportLayer: false
    };
  }

  componentDidMount() {
    pageLoaded('Airports');
    this.props.dispatch(loadAirports());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadAirports());
  }

  render() {
    const { intl } = this.context;
    const { error, airports } = this.props;

    let errorNode;
    let listNode;
    if (error) {
      errorNode = (
        <Notification status='critical' size='large' state={error.message}
          message='An unexpected error happened, please try again later' />
      );
    } else if (airports.length === 0) {
      listNode = (
        <Box direction='row' responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}>
          <Spinning /><span>Loading...</span>
        </Box>
      );
    } else {
      const airportsNode = (airports || []).map((currentAirport, index) => (
        <ListItem key={index} justify='between' pad='medium'
          responsive={false}>
          <Label margin='none'>
            <Anchor path={`/airports/${currentAirport.id}`}
              label={currentAirport.name} />
          </Label>
          <Paragraph margin='none'>
            {getTypeDisplayName(currentAirport.type)}
          </Paragraph>
        </ListItem>
      ));

      listNode = (
        <List>
          {airportsNode}
        </List>
      );
    }

    return (
      <Box primary={true} full={true}>
        <Header direction='row' justify='between' size='large'>
          <Box pad={{ horizontal: 'medium' }}>
            <NavControl name={getMessage(intl, 'Airports')} />
          </Box>
        </Header>
        {errorNode}
        {listNode}
      </Box>
    );
  }
}

Airports.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  airports: PropTypes.arrayOf(PropTypes.object)
};

Airports.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.airports });

export default connect(select)(Airports);
