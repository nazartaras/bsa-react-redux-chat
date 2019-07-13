import * as React from "react";
import "./message.css"
const likedStyle = {
    background: 'none',
    border: 'none',
    color: 'red',
    outline: 'none',
    marginTop: '1em'
}
const notLikedStyle = {
    background: 'none',
    border: 'none',
    color: 'white',
    outline: 'none',
    marginTop: '1em'
}
const notEditable = {
    padding: '5px'
}
const editable = {
    padding: '5px',
    border: '1px solid black'
}
class Message extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLiked: false,
            likeStyle: {},
            editOn: false,
            editButtonText: "Edit",
            messageTextStyle: notEditable

        }
        this.handleLikeClick = this.handleLikeClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }
    componentWillMount() {
        this.setState({
            likedStyle: notLikedStyle
        })
    }

    handleLikeClick() {
        this.state.isLiked ? this.setState({
            isLiked: false,
            likedStyle: notLikedStyle
        }) : this.setState({
            isLiked: true,
            likedStyle: likedStyle
        })
    }
    handleEditClick() {
        this.state.editOn ? this.setState({
            editOn: !this.state.editOn,
            editButtonText: "Edit",
            messageTextStyle: notEditable
        }) : this.setState({
            editOn: !this.state.editOn,
            editButtonText: "Ok",
            messageTextStyle: editable
        })

    }
    render() {
        return <div key={this.props.keyValue}>
            {(() => {
                if (this.props.bordered) {
                    return <div className="bordered" >
                        <div className="line"></div>
                        <div className="date-wrp">
                            <span className="date">{this.props.messagesSameDate}</span></div></div>
                }
            })()}
            <div className="message">
                {(() => {
                    if (this.props.author !== "me") {
                        return <div className='avatar-wrp'><img className='avatar' src={this.props.imgSrc} alt="author" /></div>
                    }
                })()}
                <div className='message-info'>
                    <div className='message-text' style={this.state.messageTextStyle} contentEditable={this.state.editOn}>{this.props.messageText}</div>
                    {(() => {
                        if (this.props.author !== "me") {
                            return <button className="like-button" style={this.state.likedStyle} onClick={this.handleLikeClick}><i className="fa fa-heart like-icon" /></button>
                        }
                    })()}
                    {(() => {
                        if (this.props.author === "me") {
                            return <span>
                                <button className="edit-button" onClick={this.handleEditClick}>{this.state.editButtonText}</button>
                                <button className="delete-button" onClick={() => this.props.onDelete(this.props.messId)}><i className="fas fa-trash-alt"></i></button>
                            </span>
                        }
                    })()}
                    <span className='message-date'>{this.props.date}</span>
                </div>
            </div>
        </div>
    }
}
export default Message;