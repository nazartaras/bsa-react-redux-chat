import * as React from "react";
import "./messagebox.css"
import Message from "../Message/Message";

class MessagesBox extends React.Component{
    render(){
        let previousMessageDate;
        let currentMessageDate;
        const messagesForThisDay = this.props.messagesForMessageBox.map((el, index)=> {
            currentMessageDate=el.created_at.split(' ')[0];
            if(currentMessageDate!==previousMessageDate){
                previousMessageDate = currentMessageDate;
               return <Message messId ={el.id} onDelete={this.props.deleteHandler} author={el.user} imgSrc={el.avatar} messageText={el.message} date={el.created_at} messagesSameDate={currentMessageDate} key={index} bordered={true}/>
            }
            return <Message messId ={el.id} onDelete={this.props.deleteHandler} author={el.user} imgSrc={el.avatar} messageText={el.message} date={el.created_at} key={index} bordered={false}/>
        });
        return   <div className='message-box'>
            {
                messagesForThisDay
            }
        </div>
    }
}
export default MessagesBox;