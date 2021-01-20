import { React, Component, useEffect } from 'react'

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
        
        setInterval(async () => {
            await fetch("http://markets-local/market/pricing/1.177671351?depth=2")
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
        
    }

    render() {
        const { error, isLoading, datafield, datahistory } = this.state;

        if (error) {
            return <div>Error receiving data from market</div>;
        } else if (isLoading) {
            return <div>Loading data from market...</div>
        } else {
            return (
                <ul>
                    

                     { datafield[0].runners.map(r => (
                        <li key={r.selectionId}>
                            {r.lastPriceTraded}
                        </li>))
                     }

                    { datahistory.map( (h, i) => (
                         <div>
                            <span key={i}>History {i}</span>
                            <span>{JSON.stringify(h[0].runners[0].ex.availableToLay)}</span>
                            <span>{JSON.stringify(h[0].runners[0].ex.availableToBack)}</span>
                         </div>

                        
                     ) )}; 


                </ul>
            )
        }


    }


}

export { MainWindowRender };

////