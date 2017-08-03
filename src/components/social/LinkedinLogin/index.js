import React, { Component } from 'react';

//Assets
import linkedin from './linkedin.png'

import config from '../config';

class LinkedinLogin extends Component{
    constructor(props) {
        super(props)
    }
    
    componentDidMount(){
        (function() {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "http://platform.linkedin.com/in.js?async=true";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })();   
    }
    
    //Trigger Login for LinkedIn
    linkedinLogin = () => {
        window.IN.init({
            api_key : config.linkedin
        });
        setTimeout(function(){
                this.getUserDetails()
            }.bind(this),1000);   
        console.log( "Loaded" )
    }
    
    getUserDetails = () => {
        window.IN.User.authorize( function(){ 
            window.IN.API.Profile("me")
                .fields(["id", "firstName", "lastName", "pictureUrl", "publicProfileUrl"])
                .result(function(result) {
                    console.log(result);
                    alert("Successfull login from linkedin : "+ result.values[0].firstName + " " + result.values[0].lastName);
                })
                .error(function(err) {
                    console.log('Import error - Error occured while importing data')
                });
        });
    }
    render(){
        return(
            <img src={linkedin} title="linkedin login" alt="linkedin" onClick={ () => this.linkedinLogin() }/>
        )
    }
}

export default LinkedinLogin;