import {messageService} from "../../javascript/services/messageService";
import * as React from "react";
import Chat from '../Chat/Chat';
import Loading from '../Loading/Loading';

class Controller extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messages:[],
        }
    }
    async componentDidMount() {
        let messages = await messageService.getMessages('GET');
        this.setState({
            messages:messages
        });
    }
    compare(a1, a2) {
        return a1.length === a2.length && a1.every((v,i)=>v === a2[i])
    }
    render() {
        return this.compare(this.state.messages,[])?<Loading/>:<Chat messagesList={this.state.messages}/>
    }
}
export default Controller;