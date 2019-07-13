import * as React from "react";
import Header from "../Header/Header"
import MessagesBox from "../MessagesBox/MessagesBox"
import MessageInput from"../MessageInput/MessageInput"
import './chat.css'

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messages:this.props.messagesList,
        }
        this.handleSendClick = this.handleSendClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }
    countUniqueParticipants(array){
        let userNames = array.map((elem)=>{
            return elem.user;
        })
        let uniqueUserNames = userNames.filter((value,index,self)=>{
            return self.indexOf(value) === index;
        })
        return uniqueUserNames;
    }
    handleSendClick(){
        if(document.getElementById('messages-input').value!==''){
        let today = new Date();
        let formated_today = today.toLocaleString("uk-UA");
        let newMessage = {
            id: this.state.messages[this.state.messages.length-1].id+1,
            user: "me",
            avatar: "",
            created_at: formated_today,
            message: document.getElementById('messages-input').value,
            marked_read: false
        }
        let OldMessagesArr  =this.state.messages;
        OldMessagesArr.push(newMessage);
        this.setState({
            messages: OldMessagesArr
        });
        }
    }

   handleDeleteClick(id){
        let arrAfterDeletion = this.state.messages.filter(obj=> obj.id!==id);
        this.setState({
            messages: arrAfterDeletion
        })
    }

    render() {
        return<div className='chatSpace'>
            <Header participantsNumber={this.countUniqueParticipants(this.state.messages).length} messagesNumber={this.state.messages.length} lastMessage={this.state.messages[this.state.messages.length-1].created_at}/>
            <MessagesBox messagesForMessageBox={this.state.messages} deleteHandler={this.handleDeleteClick}/>
            <MessageInput handleClick = {this.handleSendClick}/>
        </div>
    }
}
export default Chat;