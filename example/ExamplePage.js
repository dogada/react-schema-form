import React from 'react'
import {SchemaForm, utils} from 'react-schema-form'
import AceEditor from 'react-ace'
import {Button, FormControl, InputLabel, MenuItem, Select} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
// RcSelect is still in migrating process so it's excluded for now
// import RcSelect from 'react-schema-form-rc-select/lib/RcSelect';

const styles = theme => ({
    actions: {
        alignItems: 'center',
        display: 'grid',
        gap: '24px',
        gridTemplateRows: '60px auto',
        gridTemplateColumns: '1fr 1fr',
        width: '100%',
    },
    button: {
      height: 40,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
})

class ExamplePage extends React.Component {

    tempModel = {
        'comments': [
            {
                'name': '1'
            },
            {
                'name': '2'
            }
        ]
    }

    state = {
        tests: [
            {label: 'Simple', value: 'data/simple.json'},
            {label: 'Triple Boolean', value: 'data/noanswer.json'},
            {label: 'Simple Array', value: 'data/simplearray.json'},
            {label: 'Basic JSON Schema Type', value: 'data/types.json'},
            {label: 'Basic Radios', value: 'data/radio.json'},
            {label: 'Condition', value: 'data/condition.json'},
            {label: 'Kitchen Sink', value: 'data/kitchenSink.json'},
            {label: 'Login', value: 'data/login.json'},
            {label: 'Date', value: 'data/date.json'},
            {label: 'Readonly', value: 'data/readonly.json'},
            {label: 'Array', value: 'data/array.json'},
            {label: 'Object', value: 'data/object.json'},
            {label: 'ArraySelect', value: 'data/arrayselect.json'}
        ],
        validationResult: {},
        schema: {},
        form: [],
        model: {},
        schemaJson: '',
        formJson: '',
        selected: ''
    }

    setStateDefault = () => this.setState({model: this.tempModel})

    onSelectChange = ({target: {value}}) => {
        if (!value) {
            return this.setState({
                schemaJson: '',
                formJson: '',
                selected: '',
                schema: {},
                model: {},
                form: []
            })
        }

        fetch(value)
            .then(x => x.json())
            .then(({form, schema}) =>
                this.setState({
                    schemaJson: JSON.stringify(schema, undefined, 2),
                    formJson: JSON.stringify(form, undefined, 2),
                    selected: value,
                    schema,
                    model: {},
                    form
                })
            )
    }

    onModelChange = (key, val, type) => {
        let newModel = this.state.model
        utils.selectOrSet(key, newModel, val, type)
        this.setState({model: newModel})
    }

    onValidate = () => {
        let result = utils.validateBySchema(this.state.schema, this.state.model)
        this.setState({validationResult: result})
    }

    onFormChange = (val) => {
        let f = JSON.parse(val)
        this.setState({formJson: val, form: f})
    }

    onSchemaChange = (val) => {
        let s = JSON.parse(val)
        this.setState({schemaJson: val, schema: s})
    }

    render() {
        const {classes} = this.props
        let mapper = {
            // 'rc-select': RcSelect
        }

        let schemaForm = ''
        let validate = ''
        if (this.state.form.length > 0) {
            schemaForm = (
                <SchemaForm schema={this.state.schema} form={this.state.form} model={this.state.model}
                            onModelChange={this.onModelChange} mapper={mapper}/>
            )
            validate = (
                <div className={classes.actions}>
                    <Button variant='raised' color='primary' onClick={this.onValidate}
                            classes={{ root: classes.button }}
                            style={{gridColumn: '1 / 2', gridRow: '1 / 2'}}>
                        Validate
                    </Button>
                    <Button variant='raised' color='primary' onClick={this.setStateDefault}
                            classes={{ root: classes.button }}
                            style={{gridColumn: '2 / 3', gridRow: '1 / 2'}}>
                        Throw temp model in
                    </Button>
                    <pre style={{gridColumn: '1 / 3', gridRow: '2 / 3'}}>
                        {JSON.stringify(this.state.validationResult, undefined, 2)}
                    </pre>
                </div>
            )
        }

        return (
            <div className='col-md-12'>
                <h1>Schema Form Example</h1>
                <div className='row'>
                    <div className='col-sm-4'>
                        <h3 style={{display: 'inline-block'}}>The Generated Form</h3>
                        {schemaForm}
                        <h3>Model</h3>
                        <pre>{JSON.stringify(this.state.model, undefined, 2)}</pre>
                        {validate}
                    </div>
                    <div className='col-sm-8'>
                        <h3>Select Example</h3>
                        <form className={classes.form}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="tests">tests</InputLabel>
                                <Select
                                    value={this.state.selected}
                                    onChange={this.onSelectChange}
                                    inputProps={{name: 'tests', id: 'tests',}}>
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    {this.state.tests.map(({label, value}) => <MenuItem key={value}
                                                                                        value={value}>{label}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </form>
                        <h3>Form</h3>
                        <AceEditor style={{'zIndex': '-1'}} mode='json' theme='github' height='300px' width='800px'
                                   onChange={this.onFormChange} name='aceForm' value={this.state.formJson}
                                   editorProps={{$blockScrolling: true}}/>
                        <h3>Schema</h3>
                        <AceEditor mode='json' theme='github' height='300px' width='800px'
                                   onChange={this.onSchemaChange} name='aceSchema' value={this.state.schemaJson}
                                   editorProps={{$blockScrolling: true}}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ExamplePage)
