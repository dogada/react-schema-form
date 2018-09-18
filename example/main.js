import React from 'react'
import ReactDOM from 'react-dom'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import ExamplePage from './ExamplePage'

const theme = createMuiTheme({
    typography: {
        fontSize: 22,
    },
})

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <ExamplePage/>
    </MuiThemeProvider>,
    document.getElementById('app')
)
