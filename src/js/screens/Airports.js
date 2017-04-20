import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import FormFields from 'grommet/components/FormFields';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Layer from 'grommet/components/Layer';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Paragraph from 'grommet/components/Paragraph';
import TextInput from 'grommet/components/TextInput';
import Spinning from 'grommet/components/icons/Spinning';
import AddIcon from 'grommet/components/icons/base/Add';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';

import {
  addAirport, loadAirports, unloadAirports
} from '../actions/airports';

import { getTypeDisplayName, pageLoaded } from './utils';

class Airports extends Component {

  constructor() {
    super();

    this._onAddAirport = this._onAddAirport.bind(this);

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

  _onAddAirport(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { airport } = this.state;

    airport.latitude = parseFloat(airport.latitude);
    airport.longitude = parseFloat(airport.longitude);

    dispatch(addAirport(airport)).then(() => this.setState({
      showAddAirportLayer: false
    }));
  }

  render() {
    const { intl } = this.context;
    const { error, airports } = this.props;
    const { airport, showAddAirportLayer } = this.state;

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

    let addAirportLayer;
    if (showAddAirportLayer) {
      addAirportLayer = (
        <Layer closer={true} align='right'
          onClose={() => this.setState({ showAddAirportLayer: false })}>
          <Header pad={{ vertical: 'medium' }}>
            <Heading tag='h2'>Add Airport</Heading>
          </Header>
          <Form onSubmit={this._onAddAirport}>
            <FormFields>
              <FormField label='Name' htmlFor='name'>
                <TextInput
                  id='name'
                  value={airport.name || ''}
                  onDOMChange={event => this.setState({
                    airport: {
                      ...airport,
                      name: event.target.value,
                    },
                  })}
                />
              </FormField>
              <FormField label='Type' htmlFor='type'>
                <select id='type' onChange={event => this.setState({
                  airport: {
                    ...airport,
                    type: event.target.value,
                  },
                })}>
                  <option value='closed'>Closed</option>
                  <option value='heliport'>Heliport</option>
                  <option value='small_airport'>Small Airport</option>
                  <option value='medium_airport'>Medium Airport</option>
                  <option value='large_airport'>Large Airport</option>
                </select>
              </FormField>
              <FormField label='Latitude' htmlFor='latitude'>
                <TextInput
                  id='latitude'
                  value={(airport.latitude || '').toString()}
                  onDOMChange={event => this.setState({
                    airport: {
                      ...airport,
                      latitude: event.target.value,
                    },
                  })}
                />
              </FormField>
              <FormField label='Longitude' htmlFor='longitude'>
                <TextInput
                  id='longitude'
                  value={(airport.longitude || '').toString()}
                  onDOMChange={event => this.setState({
                    airport: {
                      ...airport,
                      longitude: event.target.value,
                    },
                  })}
                />
              </FormField>
              <FormField label='City' htmlFor='city'>
                <TextInput
                  id='city'
                  value={airport.city || ''}
                  onDOMChange={event => this.setState({
                    airport: {
                      ...airport,
                      city: event.target.value,
                    },
                  })}
                />
              </FormField>
              <FormField label='State' htmlFor='state'>
                <TextInput
                  id='state'
                  value={airport.state || ''}
                  onDOMChange={event => this.setState({
                    airport: {
                      ...airport,
                      state: event.target.value,
                    },
                  })}
                />
              </FormField>
              <FormField label='Country' htmlFor='country'>
                <TextInput
                  id='country'
                  value={airport.country || ''}
                  onDOMChange={event => this.setState({
                    airport: {
                      ...airport,
                      country: event.target.value,
                    },
                  })}
                />
              </FormField>
            </FormFields>
            <Footer direction='column'
              align='start'
              pad={{ vertical: 'medium', between: 'medium' }}>
              <Button
                label='Add'
                type='submit'
                primary={true}
                onClick={this._onAddAirport}
              />
            </Footer>
          </Form>
        </Layer>
      );
    }

    return (
      <Box primary={true} full={true}>
        <Header direction='row' justify='between' size='large'>
          <Box pad={{ horizontal: 'medium' }}>
            <NavControl name={getMessage(intl, 'Airports')} />
          </Box>
          <Box pad={{ horizontal: 'small' }}>
            <Button plain={true} icon={<AddIcon />}
              onClick={() => this.setState({ showAddAirportLayer: true })} />
          </Box>
        </Header>
        {errorNode}
        {listNode}
        {addAirportLayer}
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
