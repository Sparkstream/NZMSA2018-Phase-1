import * as React from 'react';
export default class App extends React.Component<{lat :any,lng :any}>{
    public render(){
        return  <div><img width="20" height="20" src={require('../img/mapMarker.png')}/></div>
    }
}