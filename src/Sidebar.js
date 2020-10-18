import React, { useEffect, useState } from 'react'
import "./Sidebar.css"

import { ExpandMore, SignalCellularAlt, Add, InfoOutlined, Call, Mic, Headset, Settings } from '@material-ui/icons'
import SidebarChannel from './SidebarChannel';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db, { auth } from './firebase';

function Sidebar() {

    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data(),
            })))
        ))
    }, [])

    const handleAddChannel = () => {
        const channelName = prompt("Enter a new channel name")

        if (channelName) {
            db.collection('channels').add({
                channelname: channelName,
            })
        }
    }

    return (
        <div className="sidebar">

            <div className="sidebar__top">
                <h3>Pishang Ke?</h3>
                <ExpandMore/>
            </div>

            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMore/>
                        <h4>Text Channels</h4>
                    </div>
                    <Add onClick={handleAddChannel} className="sidebar__addChannel"/>
                </div>  
                <div className="sidebar__channelsList">
                        {channels.map(({id, channel}) => (
                            <SidebarChannel key={id} id={id} channelName={channel.channelname}/>
                        ))}
                </div>
            </div>
            
            <div className="sidebar__voice">
                <SignalCellularAlt
                    className="sidebar__voiceIcon"
                    fontSize="large"
                />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlined/>
                    <Call/>
                </div>
            </div>

            <div className="sidebar__profile">
                <Avatar onClick={() => auth.signOut()} src={user.photo}/>
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0,5)}</p>
                </div>

                <div className="sidebar__profileIcons">
                    <Mic/>
                    <Headset/>
                    <Settings/>
                </div>
            </div>
            

        </div>
    )
}

export default Sidebar
