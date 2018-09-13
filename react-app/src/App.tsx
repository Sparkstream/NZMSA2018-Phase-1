import {Button, CircularProgress,Grid, Input} from '@material-ui/core/';
import GoogleMapReact from 'google-map-react';
import MapComponent from './components/MapComponent';

import * as React from 'react';



interface IState {
    lat:any,
    lng: any,
    results: any
    stopLocation: any,
    loading: boolean
}

export default class App extends React.Component<{}, IState>{
 
    constructor(props: any) {
        super(props);
        this.state = {
            lat:-36.8485 ,
            lng: 174.7633,
            loading: false,
            results: [],
            stopLocation:[]
            
        }
        this.getRoute = this.getRoute.bind(this);
        this.centerMap = this.centerMap.bind(this);
    }

    public render() {

        return (
            
                <Grid container={true} xs={12} justify='center'>
                        <Grid item={true} xs={8}>
                            <Input placeholder="Search for the closest bus stop" onKeyPress={this.getRoute} fullWidth={true} />
                        </Grid>
                        <Grid item={true} xs={8}>
                            <Grid container={true} xs={12} justify='center'>
                                {this.state.loading ? 
                                    
                                        <Grid item={true}>
                                            <CircularProgress thickness={3}/>
                                        </Grid>
                                    :
                                this.state.results.map((name: any, index: any) => {
                                    return <Grid container={true} xs={4} justify='center' key={index}><Grid item={true}><Button variant="contained" color="primary" onClick={this.centerMap} value={index}>{name}</Button></Grid></Grid>
                                })}
                            </Grid> 
                        </Grid>
                        <Grid item={true} xs={8}>
                            <div style={{ height: '80vh', width: '100%' }}>  
                                <GoogleMapReact

                                    defaultCenter={{ lat:- 36.8485, lng: 174.7633}}
                                    defaultZoom={12}
                                    >
                                    <MapComponent  lat= {this.state.lat} lng= {this.state.lng}/> 
                                </GoogleMapReact>
                            </div>
                        </Grid>
                </Grid>
                
                        
                    

            
        )
    }
    private centerMap(event : any){
        // const index = event.target.value;
        this.setState({
            lat: this.state.stopLocation[event.currentTarget.value].lat,
            lng: this.state.stopLocation[event.currentTarget.value].lng
            
        })
    }
    private getRoute(event: any) {
        if (event.key === "Enter") {
            let count = 0;
            this.setState({ results: [],stopLocation: [],loading:true });
            fetch('https://api.at.govt.nz/v2/gtfs/stops/search/' + event.target.value, {
                headers: {
                    'Accept': 'application/json',
                    'Ocp-Apim-Subscription-Key': '9e481b6b61834deda1c0472280b24087'
                },
                method: 'GET'
            }).then((response: any) => {
                if (!response.ok) {
                    this.setState({ results: [] ,loading:false})
                } else if (response.ok) {
                    response.json().then((body: any) => {
                        body.response.forEach((element: any) => {
                            if (count < 3) {
                                this.setState({
                                    loading: false,
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