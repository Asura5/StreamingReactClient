import { React, Component, useEffect } from 'react'
import {GraphingCanvas} from './GraphingCanvas'

class MainWindowRender extends Component {
    
    handle = null;
    
    constructor(props) {
        
        super(props);
        this.state = {
            datafield: null,
            datahistory: [],
            isLoading: true,
            error: null
        }
    }

    async componentDidMount() {
        
        this.handle = setInterval(async () => {
            await fetch("http://markets-local/market/pricing/1.178086849?depth=5")
            .then(result => result.json())
            .then(
                (result) => {
                    this.setState(previousState => ({
                        isLoading: false,
                        datafield: result,
                        datahistory: [...previousState.datahistory, result]
                    }));
                },
                (error) => {
                    this.setState({
                        isLoading: true,
                        error
                    });
                }
            )
        }, 20000);

    } //componentDidMount

    componentWillUnmount() {
        clearInterval(this.handle);
    }

    render() {
        const { error, isLoading, datafield, datahistory } = this.state;

        if (error) {
            return <div>Error receiving data from market</div>;
        } else if (isLoading) {
            return <div>Loading data from market...</div>
        } else {
            return (
                <div>
                    <ul>
                        
                        { datahistory.map( (h, i) => (
                            <div>
                                <span key={i}>History {i}</span>
                                <span>{JSON.stringify(h[0].runners[0].ex.availableToLay)}</span>
                                <span>{JSON.stringify(h[0].runners[0].ex.availableToBack)}</span>
                            </div>

                            
                        ) )}; 


                    </ul>
                    <GraphingCanvas />
                </div>
            )
        }


    }


}

export { MainWindowRender };

////