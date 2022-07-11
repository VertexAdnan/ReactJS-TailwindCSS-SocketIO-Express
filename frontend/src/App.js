import './css/tailwind.css'
import socket from './socket'
import React, { useState, useEffect } from 'react'

const Main = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [signed, setSigned] = useState(0);
  const [username, setUsername] = useState('')
  const [msg, setMsg] = useState('');
  const [messageID, setMessageID] = useState();

  window.setInterval(function() {
    var elem = document.getElementById('data');
    elem.scrollTop = elem.scrollHeight;
  }, 5000);

  useEffect(() => {
    socket.on("broadcast", (broadcast) => {
      data.push({ 'key': broadcast.uniqid, 'username': broadcast.username.username, 'message': broadcast.username.message });
      setData([...data]);
      console.log(broadcast)
    })
  })



  const sendMessage = () => {
    let inputVal = document.getElementById('inputMessage');
    socket.emit('sendmessage', {
      username: username,
      message: text
    })

    data.push({ 'uniqid': 123, 'username': username, 'message': text });
    setData([...data]);
    setText('');
    inputVal.value = '';
  }

  const msgHandler = (e) => {
    setText(e.target.value);
  }



  const doLogin = () => {
    if (username.length > 3) {
      setSigned(1)
      setMsg('Successfully signed in!');
    } else {
      setMsg('Username must be longer than 3!')
    }
  }

  const handle = (e) => {
    setUsername(e.target.value);
  }

  if (!signed) {
    return (
      <div className="w-full h-screen bg-gray-600 flex items-center place-content-center">
        <div className="w-1/2 h-1/2 bg-gray-700 rounded-md">
          <div className="h-full text-white font-lg font-semibold shadow-md text-center w-full md:pt-6">
            <h3>Please Enter a Username</h3>
            <h3>{(msg ? msg : '')}</h3>
            <div className="pt-5">
              <input className="w-3/4 rounded-md bg-gray-500" onChange={handle} type="text" placeholder="Vertex" />
            </div>
            <div className="pt-2">
              <button onClick={doLogin} className="bg-gray-500 p-2 rounded-md hover:p-4 transition-all">Enter</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='w-screen h-screen bg-gray-900' >
      <div className="w-full h-full flex items-center place-content-center">
        <div className="w-3/4 h-3/4 bg-gray-700 rounded-md">
          <div id="data" className="grid grid-rows-1 h-full overflow-hidden overflow-y-scroll text-white pl-2">
            {
              data.map((item) => (
                <div key="123"> {(item.username == username ? 'Me' : item.username)} : {item.message}</div>
              ))
            }
          </div>
          <div className="p-1 w-full flex place-content-center">
            <input className="w-full rounded-md" type="text" id="inputMessage" onChange={msgHandler} placeholder="Your Message" />
            <div className="pt-2">
              <button className="bg-gray-500 text-white rounded-md p-2" type="button" onClick={sendMessage}>Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Main