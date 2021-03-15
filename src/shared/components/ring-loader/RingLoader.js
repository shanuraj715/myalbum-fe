import React from 'react'
import { RingLoader as Ring} from 'react-spinners'
import './ringLoader.css'


// const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
// `;

export class RingLoader extends React.Component{
    render(){
        return(
            <div className="ring-loader">
                <div className="ring-loader-image">
                    <Ring color="black" loading={true} size={150} />
                </div>
            </div>
        )
    }
}

export default RingLoader