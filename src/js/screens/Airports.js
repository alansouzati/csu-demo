import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Article from 'grommet/components/Article';
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

  componentDidMount() {
    pageLoaded('Airports');
    this.props.dispatch(loadAirports());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadAirports());
  }

  render() {
    const { error, airports } = this.props;
    const { intl } = this.context;

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
      const airportsNode = (airports || []).map((airport, index) => (
        <ListItem key={index} justify='between' pad='medium'
          responsive={false}>
          <Label margin='none'>
            <Anchor path={`/airports/${airport.id}`} label={airport.name} />
          </Label>
          <Paragraph margin='none'>
            {getTypeDisplayName(airport.type)}
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
      <Article primary={true}>
        <Header direction='row' justify='between' size='large'
          pad={{ horizontal: 'medium', between: 'small' }}>
          <NavControl name={getMessage(intl, 'Airports')} />
        </Header>
        {errorNode}
        {listNode}
      </Article>
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
