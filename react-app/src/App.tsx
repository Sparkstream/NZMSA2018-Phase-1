import Input from '@material-ui/core/Input';
import * as React from 'react';


interface IState {
    results: any
}

export default class App extends React.Component<{}, IState>{

    constructor(props: any) {
        super(props);
        this.state = {
            results: []

        }
        this.getRoute = this.getRoute.bind(this);
    }

    public render() {
        return (
            <div className="container-fluid">
                <div className="centreText">
                    <Input placeholder="Search for the closest bus stop" onKeyPress={this.getRoute} />
                    <p>{this.state.results.length <1 ? "":this.state.results[1]}</p>
                    
                </div>
            </div>
        )
    }

    private getRoute(event: any) {
        if (event.key === "Enter") {
            let count = 0;
            this.setState({ results: [] });
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
                       body.response.forEach((element:any) =>{
                           if(count <3){
                               this.setState({
                                   results: [...this.state.results, element.stop_name]
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