import { React, Component, useEffect, useState } from 'react'

function MainWindowRenderF()  {


        


    const [datafield, setDatafield] = useState();
    const [datahistory, setDatahistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect( () => {
        const handle = setInterval(async () => {
            await fetch("http://markets-local/market/pricing/1.178086849?depth=2")
            .then(result => result.json())
            .then(
                (result) => {

                    //TBC
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

        return clearInterval(handle)
    });

    return (
        {isLoading) && 
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
        
        }

    )
        


    


}

export { MainWindowRenderF };

////