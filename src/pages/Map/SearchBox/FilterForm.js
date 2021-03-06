import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const careers = [
  'Medicine',
  'Nursing',
  'Dentistry',
  'Pharmacy',
  'Social Work',
  'Public Health',
  'General Health Sciences',
  'Allied Health',
  'STEM',
  'Other'
];

const gradeLevels = [
  {name: 'Middle School', id: 0},
  {name: 'High School', id: 1},
  {name: 'Community College/Technical Schools', id: 2},
  {name: 'Undergraduates', id: 3},
  {name: 'Post Bacc', id: 4},
  {name: 'Other', id: 5}
];

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7b59b3',
      main: '#4b2e83',
      dark: '#1a0555',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ead6a9',
      main: '#b7a57a',
      dark: '#867643e',
      contrastText: '#000',
    },
  },
});

const style = {
  margin: 'theme.spacing.unit',
  width: 275,
  marginTop: 10,
  marginBottom: 10
};

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CareerEmp: [],
      HasCost: false,
      Under18: false,
      HasTransport: false,
      HasShadow: false,
      GradeLevels: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    var newState = this.state
    newState[name] = value
    this.props.onNewFilterKey(newState)

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className='filterForm'>
          <MuiThemeProvider theme={theme}>
            <div className="row">
              <div className="col s12 m6">
                <div className='multiSelects'>
                  <div className='select'>
                    <FormControl style={style}>
                      <InputLabel htmlFor="select-multiple-checkbox">Career Emphasis</InputLabel>
                        <Select
                          name='CareerEmp'
                          multiple
                          value={this.state.CareerEmp}
                          onChange={this.handleInputChange}
                          input={<Input id="select-multiple-checkbox" />}
                          renderValue={selected => selected.join(', ')}
                        >
                        {careers.map(career => (
                          <MenuItem key={career} value={career}>
                            <Checkbox checked={this.state.CareerEmp.indexOf(career) > -1} />
                            <ListItemText primary={career} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <FormControl style={style}>
                    <InputLabel htmlFor="select-multiple-checkbox" className='selectInput'>Grade Level</InputLabel>
                      <Select
                        name='GradeLevels'
                        multiple
                        value={this.state.GradeLevels}
                        onChange={this.handleInputChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.map(id => gradeLevels[id].name).join(', ')}
                      >
                      {gradeLevels.map(level => (
                        <MenuItem key={level.id} value={level.id}>
                          <Checkbox checked={this.state.GradeLevels.indexOf(level.id) > -1} />
                          <ListItemText primary={level.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="col s12 m6 checkBoxColumn">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.HasCost}
                        onChange={this.handleInputChange}
                        name='HasCost'/>
                      }
                    label='Associated Costs'/>            
                  <br />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.HasTransport}
                        onChange={this.handleInputChange}
                        name='HasTransport'/>
                      }
                    label='Provides Transportation'/> 
                  <br />         
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.HasShadow}
                        onChange={this.handleInputChange}
                        name='HasShadow'/>
                      }
                    label='Provides Shadowing Opportunites'/>
                  <br />
              </div>

            </div>
            </MuiThemeProvider>
      </div>
    );
  }
}

export default FilterForm;
export const GradeLevels = gradeLevels;

