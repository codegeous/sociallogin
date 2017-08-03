import React, { Component } from 'react';
import $ from 'jquery'

class Jquery extends Component{
    constructor(props){
        super(props)
        this.state = { store : '' }
    }
    
    componentDidMount = () =>{
        let _this = this;
        
        $('button').on ('click', function(){
            //alert("Test Alert Message")
            _this.setState( { store : Math.random() } )
        })
    }
    
    render(){
        return(
            <div>
                <h2>Using jQuery with ReactJs</h2>
                <h2>{this.state.store}</h2>
                <p>
                    <button>Test Button</button>
                </p>
            </div>
        )
    }
}

export default Jquery;