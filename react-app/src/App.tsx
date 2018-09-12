import {Button, Grid, Input} from '@material-ui/core/';
// import GoogleMap from 'google-map-react';
// import MapComponent from './components/MapComponent';

import * as React from 'react';



interface IState {
    lat:any,
    lng: any,
    results: any
    stopLocation: any
    stopName: string
}

export default class App extends React.Component<{}, IState>{
 
    constructor(props: any) {
        super(props);
        this.state = {
            lat:-36.8485 ,
            lng: 174.7633,
            results: [],
            stopLocation:[],
            stopName: ""

        }
        this.getRoute = this.getRoute.bind(this);
        this.centerMap = this.centerMap.bind(this);
    }

    public render() {

        return (
            
                <Grid container={true} xs={12} justify='center'>

                    <Grid container={true} xs={8} justify='center' >
                        <Input placeholder="Search for the closest bus stop" onKeyPress={this.getRoute} fullWidth={true} />

                        <Grid container={true} spacing={24} alignItems='center'>

                            {this.state.results.map((name: any, index: any) => {
                                return <Grid item={true} xs={12} key={index}><Button onClick={this.centerMap} value={index}>{name}</Button></Grid>
                            })}
                        </Grid>
                        <div style={{ height: '100vh', width: '100%' }}>
                            <p>{this.state.lat},{this.state.lng}</p>     
                            
                        </div>
                    </Grid>
                </Grid>
                
                        
                    

            
        )
    }
    private centerMap(event : any){
        // const index = event.target.value;
        
        this.setState({
            lat: this.state.stopLocation[event.target.value].lat,
            lng: this.state.stopLocation[event.target.value].lng,
            stopName: this.state.stopLocation[event.target.value].stop_name
        })
    }
    private getRoute(event: any) {
        if (event.key === "Enter") {
            let count = 0;
            this.setState({ results: [],stopLocation: [] });
            fetch('https://api.at.govt.nz/v2/gtfs/stops/search/' + event.target.value, {
                headers: {
                    'Accept': 'application/json',
                    'Ocp-Apim-Subscription-Key': '9e481b6b61834deda1c0472280b24087'
                },
                method: 'GET'
            }).then((response: any) => {
                if (!response.ok) {
                    this.setState({ results: [] })
                } else if (response.ok) {
                    response.json().then((body: any) => {
                        body.response.forEach((element: any) => {
                            if (count < 3) {
                                this.setState({
                                    results: [...this.state.results, element.stop_name],
                                    stopLocation: [...this.state.stopLocation,{lat: element.stop_lat,lng:element.stop_lon,stopName:element.stop_name}]
                                })
                                count++;
                            }
                        }

                        );
                    })
                }
                return response;
            })
        }
    };


}