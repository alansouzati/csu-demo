import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import Legend from 'grommet/components/Legend';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Meter from 'grommet/components/Meter';
import Notification from 'grommet/components/Notification';
import Paragraph from 'grommet/components/Paragraph';
import Spinning from 'grommet/components/icons/Spinning';
import Status from 'grommet/components/icons/Status';

import NavControl from '../components/NavControl';
import {
  loadAirports, unloadAirports
} from '../actions/airports';
import {
  loadActivities, unloadActivities
} from '../actions/activities';

import { getTypeDisplayName, pageLoaded } from './utils';

const COLOR_INDEX_MAP = {
  closed: 'graph-2',
  heliport: 'graph-1',
  small_airport: 'accent-1',
  medium_airport: 'accent-2',
  large_airport: 'graph-3'
};

class Dashboard extends Component {

  constructor() {
    super();

    this.state = {};
  }
  componentDidMount() {
    pageLoaded('Dashboard');
    this.props.dispatch(loadAirports());
    this.props.dispatch(loadActivities());
  }

  componentWillUnmount() {
    this.props.dispatch(unloadAirports());
    this.props.dispatch(unloadActivities());
  }

  render() {
    const { activities, airports, error } = this.props;
    const { activeTypeIndex } = this.state;

    let errorNode;
    let activitiesNode;
    const airportTypeSeries = [];
    const legendSeries = [];
    if (error) {
      errorNode = (
        <Notification status='critical' size='large' state={error.message}
          message='An unexpected error happened, please try again later' />
      );
    } else if (airports.length === 0 && activities.length === 0) {
      activitiesNode = (
        <Box direction='row' responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}>
          <Spinning /><span>Loading...</span>
        </Box>
      );
    }

    if (activities.length > 0) {
      const listItems = (activities || []).map((activity, index) => (
        <ListItem key={`activity_${index}`} pad={{
          vertical: 'medium', horizontal: 'medium', between: 'small'
        }}>
          <Status size='small' value={activity.status} />
          <span>{activity.description}</span>
        </ListItem>
      ));

      activitiesNode = (
        <List>
          {listItems}
        </List>
      );
    }

    if (airports.length > 0) {
      const typeCount = {};
      airports.forEach((airport) => {
        console.log('before', typeCount, airport.type, typeCount[airport.type]);
        typeCount[airport.type] = typeCount[airport.type] ? (
          (typeCount[airport.type] + 1)
        ) : 1;
      });

      Object.keys(typeCount).forEach((typeKey) => {
        airportTypeSeries.push({
          label: getTypeDisplayName(typeKey),
          value: typeCount[typeKey],
          colorIndex: COLOR_INDEX_MAP[typeKey]
        });
        legendSeries.push({
          label: getTypeDisplayName(typeKey),
          colorIndex: COLOR_INDEX_MAP[typeKey]
        });
      });
    }

    return (
      <Box full={true} primary={true}>
        <Header direction='row' justify='between' size='large'
          pad={{ horizontal: 'medium', between: 'small' }}>
          <NavControl />
        </Header>
        {errorNode}
        <Box pad={{ horizontal: 'medium' }}>
          <Label uppercase={true}>
            Airports
          </Label>
          <Box direction='row' pad={{
            vertical: 'small', horizontal: 'small', between: 'medium'
          }}>
            <Meter
              max={airports.length}
              size='medium'
              type='circle'
              series={airportTypeSeries}
              stacked={true}
              activeIndex={activeTypeIndex}
              onActive={index => this.setState({ activeTypeIndex: index })}
              label={
                <Box align='center'>
                  <Heading tag='h1' strong={true}>
                    {activeTypeIndex >= 0 ? (
                      airportTypeSeries[activeTypeIndex].value
                    ) : airports.length}
                  </Heading>
                  <Paragraph margin='none' size='large'>
                    {activeTypeIndex >= 0 ? (
                      airportTypeSeries[activeTypeIndex].label
                    ) : 'Total'}
                  </Paragraph>
                </Box>
              }
            />
            <Legend series={legendSeries} activeIndex={activeTypeIndex}
              onActive={index => this.setState({ activeTypeIndex: index })} />
          </Box>
          <Label uppercase={true}>
            Activity
          </Label>
        </Box>
        {activitiesNode}
      </Box>
    );
  }
}

Dashboard.defaultProps = {
  activities: [],
  airports: []
};

Dashboard.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object),
  airports: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object
};

Dashboard.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.airports, ...state.activities });

export default connect(select)(Dashboard);
