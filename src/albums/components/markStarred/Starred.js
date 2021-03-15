// import React from 'react'
import './starred.css'



// export class Starred extends React.Component{
//     state = {
//         doingStarring: true,

//     }

//     componentDidMount(){
//         this.doStarringJob()
//     }

//     doStarringJob = () => {
//         setTimeout( () => {
//             fetch('https://jsonplaceholder.typicode.com/todos/1')
//             .then(response => response.json())
//             .then(json => {
//                 console.log(json)
//                 this.setState({ doStarringJob: false }, () => {
                    
//                 })
//             })
//         }, 2000)
        
//         // this.props.starred()
//     }

//     render(){
//         return(
//             <React.Fragment>
                
//             </React.Fragment>
//         )
//     }
// }



const Starred = ( albumid ) => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => {
        console.log(json)
    })
}


export default Starred